/*
 * Plugin Name: Vanilla-JS Canvas
 * Version: 1.0
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

    // Cover Image
    this.coverImage = function(image) {
        // Set Positions
        var left = 0,
            top = 0,
            width = 10,
            height = 10;

        // Search for a child image
        if (!image) {
            // Test if canvas has a child, with a img tagName.
            if (!canvas.children[0] || canvas.children[0].tagName != 'IMG') {
                return;
            }
            image = canvas.children[0];
        }

        this.image = image;

        // Get Image size
        this.iH = this.image.height;
        this.iW = this.image.width;
        this.iRatio = this.iH / this.iW;

        // Get image position
        if (this.cRatio < this.iRatio) {
            width = this.cW;
            height = width * this.iRatio;
            top = 0 - (height - this.cH) / 2;
        }
        else {
            height = this.cH;
            width = height / this.iRatio;
            left = 0 - (width - this.cW) / 2;
        }

        // Draw image
        this.context.drawImage(this.image, left, top, width, height);

    };
};