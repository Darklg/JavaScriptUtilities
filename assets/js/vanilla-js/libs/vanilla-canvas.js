/*
 * Plugin Name: Vanilla-JS Canvas
 * Version: 2.6.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/**
 * @param {Element} canvas The Canvas Element
 * @param {Object} settings The desired setttings
 */
var dkJSUCanvas = function(canvas, settings) {
    var self = this;

    // Set Vars
    self.settings = {};
    self.defaultSettings = {
        callback: function(self) {}
    };

    var __construct = function(canvas, settings) {
        if (!canvas) {
            console.error('The canvas is not defined');
            return false;
        }

        self.canvas = canvas;
        self.canvParent = self.canvas.parentNode;

        self.getSettings(settings);
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
        if (!self.documentIsHidden) {
            try {
                self.context.drawImage(self.video, self.dim.left, self.dim.top, self.dim.width, self.dim.height);
                self.settings.callback(self);
            }
            catch (e) {
                /* Bugfix Firefox : http://stackoverflow.com/a/18580878 */
                if (e.name != "NS_ERROR_NOT_AVAILABLE") {
                    throw e;
                }
            }
        }

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

        var imageLoad = new Image();
        imageLoad.onload = function() {
            // Obtain dimensions
            var dim = self.getCoverDimensions(image);

            // Draw image
            self.context.drawImage(image, dim.left, dim.top, dim.width, dim.height);

            // Callback
            self.settings.callback(self);

        };
        imageLoad.src = image.src;
    };

    /* ----------------------------------------------------------
      Events
    ---------------------------------------------------------- */

    self.setEvents = function() {
        if (self.settings.coverParent) {
            window.addEventListener('resize', self.canvasResize, true);
        }
        self.setEventVisibility();
    };

    /* Canvas resize */
    self.canvasResize = function() {
        self.setCanvasSize();
        self.dim = self.getCoverDimensions(self.video);
    };

    self.setEventVisibility = function() {
        var hidden = "webkitHidden",
            visibilityChange = "webkitvisibilitychange",
            visibilityState = "webkitVisibilityState";

        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
            visibilityState = "visibilityState";
        }
        else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
            visibilityState = "mozVisibilityState";
        }
        else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
            visibilityState = "msVisibilityState";
        }

        /* Check visibility */
        self.documentIsHidden = document[hidden];
        document.addEventListener(visibilityChange, function() {
            self.documentIsHidden = document[hidden];
        }, false);
    };

    /* ----------------------------------------------------------
      Processing image
    ---------------------------------------------------------- */

    /* Adapted from the awesome http://www.html5rocks.com/en/tutorials/canvas/imagefilters/ */

    self.getPixels = function() {
        return self.context.getImageData(0, 0, self.canvas.width, self.canvas.height);
    };

    self.filterImage = function(filter, arg1, arg2, arg3, arg4) {
        var args = [self.getPixels()];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return filter.apply(null, args);
    };

    self.runFilter = function(filter, arg1, arg2, arg3, arg4) {
        var idata = self.filterImage(filter, arg1, arg2, arg3, arg4);
        self.context.putImageData(idata, 0, 0);
        return self;
    };

    /* Wrappers */

    self.applyFilter = function(filter, arg1, arg2, arg3, arg4) {
        if (filter in canvasFilters) {
            self.runFilter(canvasFilters[filter], arg1, arg2, arg3, arg4);
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

    canvasFilters.grayscale = function(pixels) {
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
        if (!adjustment) {
            adjustment = 20;
        }
        for (var i = 0; i < d.length; i += 4) {
            d[i] += adjustment;
            d[i + 1] += adjustment;
            d[i + 2] += adjustment;
        }
        return pixels;
    };

    /* Invert */

    canvasFilters.invert = function(pixels) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i];
            d[i + 1] = 255 - d[i + 1];
            d[i + 2] = 255 - d[i + 2];
        }
        return pixels;
    };

    /**
     * @param {Object} pixels The pixels obtained by the class
     * @param {Object} settings The original pixels to show in the green area
     * @param {Array} rgbValues The greenScreen rgb color (r,g,b)
     * @param {Number} rgbValues The greenScreen rgb color (r,g,b)
     */
    canvasFilters.greenScreen = function(pixels, origPixels, rgbValues, pas) {
        r = parseInt(rgbValues[0] || 255, 10);
        g = parseInt(rgbValues[1] || 255, 10);
        b = parseInt(rgbValues[2] || 255, 10);
        pas = parseInt(pas || 50, 10);
        var d = pixels.data,
            dLength = d.length,
            od = origPixels.data,
            rMin = Math.max(0, r - pas),
            gMin = Math.max(0, g - pas),
            bMin = Math.max(0, b - pas),
            rMax = Math.min(255, r + pas),
            gMax = Math.min(255, g + pas),
            bMax = Math.min(255, b + pas);
        for (var i = 0; i < dLength; i += 4) {
            if (
                d[i] >= rMin && d[i + 1] >= gMin && d[i + 2] >= bMin &&
                d[i] <= rMax && d[i + 1] <= gMax && d[i + 2] <= bMax
            ) {
                d[i] = od[i];
                d[i + 1] = od[i + 1];
                d[i + 2] = od[i + 2];
            }
        }
        return pixels;
    };

    /* ----------------------------------------------------------
      Special effects
    ---------------------------------------------------------- */

    /* Green Screen */
    self.setGreenScreen = function(imgElement, videoElement, rgbValues, pas) {
        self.coverImage(imgElement);
        var origPixels = self.getPixels();
        self.settings.callback = function(self) {
            self.applyFilter('greenScreen', origPixels, rgbValues, pas);
        };
        self.coverVideo(videoElement);
        videoElement.play();
    };

    /* Add pattern */
    self.addPattern = function(imgElement, keepPattern) {
        var pat = false;
        if (keepPattern && self.cachedPattern) {
            pat = self.cachedPattern;
        }
        else {
            pat = self.context.createPattern(imgElement, "repeat");
            self.cachedPattern = pat;
        }
        self.context.rect(0, 0, self.canvas.width, self.canvas.height);
        self.context.fillStyle = pat;
        self.context.fill();
    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    self.setCanvasSize = function(cover) {
        self.cH = self.canvas.clientHeight;
        self.cW = self.canvas.clientWidth;

        if (self.settings.coverParent) {
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

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    self.getSettings = function(settings) {
        if (!settings || typeof settings != 'object') {
            settings = {};
            self.settings = self.defaultSettings;
        }
        self.settings.coverParent = settings.coverParent || false;
        self.settings.callback = ("callback" in settings && typeof settings.callback == 'function') ? settings.callback : function() {};
    };

    __construct(canvas, settings);

};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 40);
        };
})();

