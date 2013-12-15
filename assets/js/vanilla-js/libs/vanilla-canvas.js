/*
 * Plugin Name: Vanilla-JS Canvas
 * Version: 2.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUCanvas = function(canvas) {
    // Set Vars
    this.canvas = canvas;
    this.cH = this.canvas.clientHeight;
    this.cW = this.canvas.clientWidth;
    this.cRatio = this.cH / this.cW;

    // Set canvas
    this.context = this.canvas.getContext("2d");
    this.canvas.height = this.cH;
    this.canvas.width = this.cW;

    /* ----------------------------------------------------------
      Cover Media
    ---------------------------------------------------------- */

    // Cover Video
    this.coverVideo = function(video) {
        var self = this;

        this.video = video || this.getChildIf('VIDEO');
        if (!this.video) {
            return;
        }

        // Obtain dimensions
        this.dim = this.getCoverDimensions(this.video);

        this.video.addEventListener('play', function() {
            self.drawVideo();
        });

    };

    this.drawVideo = function() {
        var self = this;

        // Draw video
        this.context.drawImage(this.video, this.dim.left, this.dim.top, this.dim.width, this.dim.height);

        // Test if video is paused
        if (this.video.paused || this.video.ended) {
            return false;
        }

        // Launch next frame
        setTimeout(function() {
            self.drawVideo();
        }, 40);
    };

    // Cover Image
    this.coverImage = function(image) {

        image = image || this.getChildIf('IMG');
        if (!image) {
            return;
        }

        // Obtain dimensions
        var dim = this.getCoverDimensions(image);

        // Draw image
        this.context.drawImage(image, dim.left, dim.top, dim.width, dim.height);

    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    this.getChildIf = function(tagName) {
        // Test if canvas has a child, with a img tagName.
        if (!canvas.children[0] || canvas.children[0].tagName != tagName) {
            return false;
        }
        return canvas.children[0];
    };

    // Get Cover dimensions for an element
    this.getCoverDimensions = function(image) {
        // Get Image size
        var iReturn = {
            left: 0,
            top: 0,
            width: 10,
            height: 10
        },
            iH = image.height,
            iW = image.width,
            iRatio = iH / iW;

        // Get image position
        if (this.cRatio < iRatio) {
            iReturn.width = this.cW;
            iReturn.height = iReturn.width * iRatio;
            iReturn.top = 0 - (iReturn.height - this.cH) / 2;
        }
        else {
            iReturn.height = this.cH;
            iReturn.width = iReturn.height / iRatio;
            iReturn.left = 0 - (iReturn.width - this.cW) / 2;
        }

        return iReturn;

    };
};