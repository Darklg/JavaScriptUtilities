/*
 * Plugin Name: Vanilla-JS Tests
 * Version: 1.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUTests = {
    // Navigator
    getNavigator: function() {
        var nua = navigator.userAgent,
            navInfos = {
                os: false,
                name: false,
                version: false
            };
        if (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1) {
            navInfos.os = 'android';
            navInfos.name = 'native-android';
        }
    },
    // Capacities
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
    touchendEvent: function() {
        return window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend";
    }
};