/*
 * Plugin Name: Vanilla-JS Canvas
 * Version: 2.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUCanvas = function(canvas, args) {
    var self = this;

    // Set Vars
    self.canvas = canvas;
    self.args = args || {};
    self.canvParent = self.canvas.parentNode;
    self.coverParent = self.args.coverParent || false;

    var __construct = function() {
        self.setCanvasSize();
        self.setEvents();

        // Set canvas
        self.context = self.canvas.getContext("2d");
    };

    /* ----------------------------------------------------------
      Cover Media
    ---------------------------------------------------------- */

    // Cover Video
    self.coverVideo = function(video) {

        self.video = video || self.getChildIf('VIDEO');
        if (!self.video) {
            return;
        }

        // Obtain dimensions
        self.dim = self.getCoverDimensions(self.video);

        self.video.addEventListener('play', function() {
            self.drawVideo();
        });

    };

    self.drawVideo = function() {

        // Draw video
        self.context.drawImage(self.video, self.dim.left, self.dim.top, self.dim.width, self.dim.height);

        // Test if video is paused
        if (self.video.paused || self.video.ended) {
            return false;
        }

        // Launch next frame
        requestAnimFrame(function() {
            self.drawVideo();
        });
    };

    // Cover Image
    self.coverImage = function(image) {

        image = image || self.getChildIf('IMG');
        if (!image) {
            return;
        }

        // Obtain dimensions
        var dim = self.getCoverDimensions(image);

        // Draw image
        self.context.drawImage(image, dim.left, dim.top, dim.width, dim.height);

    };

    /* ----------------------------------------------------------
      Events
    ---------------------------------------------------------- */

    self.setEvents = function() {
        if (self.coverParent) {
            window.addEventListener('resize', function() {
                self.setCanvasSize();
                self.dim = self.getCoverDimensions(self.video);
            }, true);
        }
    };

    /* ----------------------------------------------------------
      Processing image
    ---------------------------------------------------------- */

    /* Adapted from the awesome http://www.html5rocks.com/en/tutorials/canvas/imagefilters/ */

    self.getPixels = function() {
        return self.context.getImageData(0, 0, self.canvas.width, self.canvas.height);
    };

    self.filterImage = function(filter, arg1, arg2, arg3) {
        var args = [self.getPixels()];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return filter.apply(null, args);
    };

    self.runFilter = function(filter, arg1, arg2, arg3) {
        var idata = self.filterImage(filter, arg1, arg2, arg3);
        self.context.putImageData(idata, 0, 0);
        return self;
    };

    /* Wrappers */

    self.applyFilter = function(filter, arg1, arg2, arg3) {
        if (filter in canvasFilters) {
            self.runFilter(canvasFilters[filter], arg1);
        }
        else {
            console.log('This filter is inexistant');
        }
        return self;
    };

    /* Filters
    -------------------------- */

    var canvasFilters = {};

    /* Grayscale */

    canvasFilters.grayscale = function(pixels, args) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            d[i] = d[i + 1] = d[i + 2] = v;
        }
        return pixels;
    };

    /* Brightness */

    canvasFilters.brightness = function(pixels, adjustment) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] += adjustment;
            d[i + 1] += adjustment;
            d[i + 2] += adjustment;
        }
        return pixels;
    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    self.setCanvasSize = function(cover) {
        self.cH = self.canvas.clientHeight;
        self.cW = self.canvas.clientWidth;

        if (self.coverParent) {
            self.cH = self.canvParent.offsetHeight;
            self.cW = self.canvParent.offsetWidth;
        }

        self.cRatio = self.cH / self.cW;
        self.canvas.height = self.cH;
        self.canvas.width = self.cW;
    };

    self.getChildIf = function(tagName) {
        // Test if canvas has a child, with a img tagName.
        if (!canvas.children[0] || canvas.children[0].tagName != tagName) {
            return false;
        }
        return canvas.children[0];
    };

    // Get Cover dimensions for an element
    self.getCoverDimensions = function(image) {
        // Get Image size
        var iReturn = {
                left: 0,
                top: 0,
                width: 10,
                height: 10
            },
            iH = image.height || 9,
            iW = image.width || 16,
            iRatio = iH / iW;

        // Get image position
        if (self.cRatio < iRatio) {
            iReturn.width = self.cW;
            iReturn.height = iReturn.width * iRatio;
            iReturn.top = 0 - (iReturn.height - self.cH) / 2;
        }
        else {
            iReturn.height = self.cH;
            iReturn.width = iReturn.height / iRatio;
            iReturn.left = 0 - (iReturn.width - self.cW) / 2;
        }

        return iReturn;

    };

    __construct();

};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 40);
        };
})();