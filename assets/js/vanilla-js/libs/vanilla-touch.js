/*
 * Plugin Name: Vanilla-JS Touch
 * Version: 0.2.1
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

/* ----------------------------------------------------------
  Trigger "swipe" event
---------------------------------------------------------- */

/*
 * TODO : Trigger touchend when direction changes
 */

var setSwipeEvent = function(el, options) {
    var self = this,
        deltaHe = 0,
        deltaWi = 0,
        timeStart = 0,
        timeEnd = 0,
        pos = {
            xStart: 0,
            xEnd: 0,
            yStart: 0,
            yEnd: 0
        };

    if ("hasswipeevent" in el || el.hasswipeevent === 1) {
        return;
    }
    el.hasswipeevent = 1;

    // Default values
    options = (options && typeof options == 'object') || {};
    options.maxDelay = (options.maxDelay && typeof options == 'number') || 1000;
    options.minRange = (options.minRange && typeof options == 'number') || 75;

    el.addEvent('touchstart', function(e) {
        if (e.touches && e.touches[0].pageX) {
            timeStart = new Date().getTime();
            pos.xStart = e.touches[0].pageX;
            pos.yStart = e.touches[0].pageY;
        }
    });
    el.addEvent('touchend', function(e) {
        if (e.changedTouches && e.changedTouches[0].pageX) {
            timeEnd = new Date().getTime();
            pos.xEnd = e.changedTouches[0].pageX;
            pos.yEnd = e.changedTouches[0].pageY;
            calculateEvent();
        }
    });

    function calculateEvent() {

        var eventTriggered = false,
            delay = timeEnd - timeStart;

        // Compute deltas
        deltaWi = Math.abs(pos.xStart - pos.xEnd);
        deltaHe = Math.abs(pos.yStart - pos.yEnd);

        // Horizontal event
        if (deltaWi > deltaHe && deltaWi > options.minRange && delay < options.maxDelay) {
            // To Right
            if (pos.xStart < pos.xEnd) {
                eventTriggered = 'swipetoright';
            }
            // To left
            else {
                eventTriggered = 'swipetoleft';
            }
        }

        // Vertical event
        if (deltaHe > deltaWi && deltaHe > options.minRange && delay < options.maxDelay) {
            // To Bottom
            if (pos.yStart < pos.yEnd) {
                eventTriggered = 'swipetobottom';
            }
            // To top
            else {
                eventTriggered = 'swipetotop';
            }
        }

        // Trigger event
        if (eventTriggered !== false) {
            triggerEvent(eventTriggered);
        }

        // Reset values
        timeStart = 0;
        timeEnd = 0;
        deltaHe = 0;
        deltaWi = 0;
        pos = {
            xStart: 0,
            xEnd: 0,
            yStart: 0,
            yEnd: 0
        };
    }

    function triggerEvent(eventTriggered) {
        // Vanilla JS
        if ("triggerEvent" in window) {
            window.triggerEvent(el, eventTriggered);
        }
        // Mootools
        if ("fireEvent" in el) {
            el.fireEvent(eventTriggered);
        }
        // jQuery
        if ("jQuery" in window) {
            jQuery(el).trigger(eventTriggered);
        }
    }
};