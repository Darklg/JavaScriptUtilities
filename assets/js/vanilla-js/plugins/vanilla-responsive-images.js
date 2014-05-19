/*
 * Plugin Name: Responsive Images
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Responsive Images may be freely distributed under the MIT license.
 * Usage status: Work in progress
 */

var vanillaResponsiveImages = function(el, property) {
    var self = this,
        values = false,
        srcset = false,
        timer = false;

    self.init = function() {
        if (!property) {
            property = 'background';
        }
        // Get srcset
        srcset = el.getAttribute('data-srcset');
        if (!srcset) {
            return false;
        }
        // Get image values
        values = self.extractValues(srcset);
        if (!values) {
            return false;
        }

        // Launch responsive image
        self.setResponsiveImage();

        // Launch responsive image on resize end
        if ('addEventListener' in window) {
            window.addEventListener('resize', self.timerResponsiveImage);
            window.addEventListener('orientationchange', self.timerResponsiveImage);
        }
    };

    self.setResponsiveImage = function() {
        // Extract from srcset values
        var imgValue = self.getFinalImageFromValues(values);

        // load latest ok image
        if (imgValue !== false) {
            self.setUrl(imgValue);
        }
    };

    self.timerResponsiveImage = function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            self.setResponsiveImage();
        }, 1000);
    };

    self.extractValues = function(srcset) {
        var values = [],
            match = false,
            regexp = /([\S]+)\s([0-9]{1,4})([w,h])/,
            tmpSrcset = srcset.split(',');
        for (var i in tmpSrcset) {
            if (tmpSrcset[i] === '' || !tmpSrcset.hasOwnProperty(i)) {
                continue;
            }
            match = tmpSrcset[i].match(regexp);
            if (match) {
                values.push({
                    url: match[1],
                    dim: parseInt(match[2], 10),
                    dir: match[3],
                });
            }
        }
        return values;
    };

    self.getFinalImageFromValues = function(values) {
        var checkDim = false,
            imgValue = false,
            winWidth = getWindowInnerWidth(),
            winHeight = getWindowInnerHeight(),
            i = false;
        // Parse values
        for (i in values) {
            // Test window width
            if (values[i].dir == 'w' && values[i].dim < winWidth) {
                checkDim = true;
            }

            // Test window height
            if (values[i].dir == 'h' && values[i].dim < winHeight) {
                checkDim = true;
            }

            // If test ok, we can load this image
            if (checkDim) {
                imgValue = values[i].url;
            }
            checkDim = false;

        }
        return imgValue;
    };

    self.setUrl = function(imgValue) {
        var img = document.createElement('img'),
            origImgValue = imgValue;

        img.onload = function() {
            // Set src
            if (property == 'src') {
                el.src = imgValue;
                return true;
            }
            // Set CSS property
            if (property == 'background' || property == 'backgroundImage') {
                imgValue = 'url(' + imgValue + ')';
            }
            el.style[property] = imgValue;
        };
        img.src = origImgValue;

        // Kill function : image is loaded
        return true;
    };

    // Utilities
    var getWindowInnerHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    };
    var getWindowInnerWidth = function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    };

    self.init();

    return self;
};