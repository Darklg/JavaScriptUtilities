/*
 * Plugin Name: Vanilla-JS Touch
 * Version: 0.2
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
 * TODO : Time frame ( 300ms ?)
 * TODO : Minimum delta ( 100px ?)
 * TODO : Trigger touchend when direction changes
 */

var setSwipeEvent = function(el) {
    var deltaHe = 0,
        deltaWi = 0,
        pos = {
            xStart: 0,
            xEnd: 0,
            yStart: 0,
            yEnd: 0
        };

    document.body.addEvent('touchstart', function(e) {
        if (e.touches && e.touches[0].pageX) {
            pos.xStart = e.touches[0].pageX;
            pos.yStart = e.touches[0].pageY;
        }
    });
    document.body.addEvent('touchend', function(e) {
        if (e.changedTouches && e.changedTouches[0].pageX) {
            pos.xEnd = e.changedTouches[0].pageX;
            pos.yEnd = e.changedTouches[0].pageY;
            calculateEvent();
        }
    });

    function calculateEvent() {

        var eventTriggered = false;

        // Compute deltas
        deltaWi = Math.abs(pos.xStart - pos.xEnd);
        deltaHe = Math.abs(pos.yStart - pos.yEnd);

        // Horizontal event
        if (deltaHe < deltaWi) {
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
        else {
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
