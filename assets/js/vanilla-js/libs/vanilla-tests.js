/*
 * Plugin Name: Vanilla-JS Tests
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

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