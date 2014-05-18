/*
 * Plugin Name: Responsive Images
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Responsive Images may be freely distributed under the MIT license.
 * Usage status: Work in progress
 */


var vanillaResponsiveImages = function(el, property) {
    var self = this;
    if (!property) {
        property = 'background';
    }
    // Utilities
    var getWindowInnerHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    };
    var getWindowInnerWidth = function() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    };

    var setUrl = function(imgValue) {

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

        // Kill function : image is loaded
        return true;
    };

    // Get window width and height
    var winWidth = getWindowInnerWidth(),
        winHeight = getWindowInnerHeight(),
        srcset = el.getAttribute('data-srcset'),
        values = [],
        tmpSrcset = [],
        i, match, checkDim, val, imgValue = false;

    if (!srcset) {
        return false;
    }

    // Extract srcset values
    tmpSrcset = srcset.split(',');
    for (i in tmpSrcset) {
        if (tmpSrcset[i] === '' || !tmpSrcset.hasOwnProperty(i)) {
            continue;
        }
        match = tmpSrcset[i].match(/([\S]+)\s([0-9]{1,4})([w,h])/);
        if (match) {
            values.push({
                url: match[1],
                dim: parseInt(match[2], 10),
                dir: match[3],
            });
        }
    }

    if (!values) {
        return false;
    }

    // Parse values
    for (i in values) {
        val = values[i];
        checkDim = false;
        // Test window width
        if (val.dir == 'w' && val.dim < winWidth) {
            checkDim = true;
        }

        // Test window height
        if (val.dir == 'h' && val.dim < winHeight) {
            checkDim = true;
        }

        // If test ok, we can load this image
        if (checkDim) {
            imgValue = val.url;
        }
    }

    // load latest ok image
    if (imgValue !== false) {
        setUrl(imgValue);
    }

    return this;
};