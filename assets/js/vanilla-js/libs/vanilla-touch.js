/*
 * Plugin Name: Vanilla-JS Touch
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Trigger "tap" event
---------------------------------------------------------- */

var setTapEvent = function(el) {
    var duration = 300,

        timerStart, timerEnd;
    el.addEvent('touchstart', function(e) {
        timerStart = new Date().getTime();
    });
    el.addEvent('touchend', function(e) {
        timerEnd = new Date().getTime();
        if (timerEnd - timerStart < duration) {
            triggerTap();
        }
    });
    function triggerTap() {
        // Vanilla JS
        if ("triggerEvent" in window) {
            window.triggerEvent(el, 'tap');
        }
        // Mootools
        if ("fireEvent" in el) {
            el.fireEvent('tap');
        }
        // jQuery
        if ("jQuery" in window) {
            jQuery(el).trigger('tap');
        }
    }
};