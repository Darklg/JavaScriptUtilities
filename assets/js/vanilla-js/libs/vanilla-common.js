/*
 * Plugin Name: Vanilla-JS Common
 * Version: 1.5.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 * Contributors : bloodyowl
 */

/* ----------------------------------------------------------
  Utilities
---------------------------------------------------------- */

/* Trim
-------------------------- */

String.trim = function(text) {
    return text.replace(/^\s+|\s+$/g, "");
};

/* Console log fix
-------------------------- */

if (typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

/* ----------------------------------------------------------
  Get values
---------------------------------------------------------- */

/* Get Window Inner Height
-------------------------- */

var getWindowInnerHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
};

/* Get BODY Scroll
-------------------------- */

var getBodyScrollTop = function() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

var getBodyScrollLeft = function() {
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

/* Get Element Offset
-------------------------- */

var getElementOffset = function(el) {
    var clientRect = el.getBoundingClientRect(),
        top = clientRect.top + getBodyScrollTop(),
        left = clientRect.left + getBodyScrollLeft(),
        right = clientRect.width + left,
        bottom = clientRect.height + top;

    return {
        top: top,
        right: right,
        bottom: bottom,
        left: left
    };
};

/* ----------------------------------------------------------
  Functions
---------------------------------------------------------- */

/* Callback on image load
-------------------------- */

var callOnImgLoad = function(url, callback) {
    // Create a new image
    var img = new Image();

    // Trigger callback on load
    img.onload = function() {
        callback();
    };

    // Set image load
    img.src = url;
};

/* Get Element Visibility
-------------------------- */

var getElementVisibility = function(el, offset) {
    offset = offset || 0;
    var elRect = el.getBoundingClientRect(),
        elOff = getElementOffset(el),
        winHeight = getWindowInnerHeight(),
        winTopLimit = getBodyScrollTop(),
        winBottomLimit = winHeight + winTopLimit,
        visibility = {
            full: false,
            visible: false
        };

    // Element is visible (with an offset)
    if (elOff.top < winBottomLimit - offset) {
        visibility.visible = true;
    }

    // Element fully visible
    if (winHeight >= elRect.height && elOff.top > winTopLimit && elOff.bottom < winBottomLimit) {
        visibility.full = true;
    }

    return visibility;
};