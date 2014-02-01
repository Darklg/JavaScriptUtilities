/*
 * Plugin Name: Vanilla-JS Common
 * Version: 1.4.4
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 * Contributors : bloodyowl
 */

/* Tests
-------------------------- */

var dkJSUTests = {
    canvas: function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    },
    localStorage: function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        }
        catch (e) {
            return false;
        }
    },
    offline: function() {
        return !!window.applicationCache;
    },
    touch: function() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    },
};

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

/* Get BODY Scroll Top
-------------------------- */

var getBodyScrollTop = function() {
    return document.documentElement.scrollTop || document.body.scrollTop;
};

/* Get Window Inner Height
-------------------------- */

var getWindowInnerHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

/* Get Element Offset
-------------------------- */

var getElementOffset = function(el) {
    var clientRect = el.getBoundingClientRect(),
        top =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0,
        left =
            window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0;

    return {
        left: clientRect.left + left,
        top: clientRect.top + top
    };
};