/*
 * Plugin Name: Vanilla-JS Touch
 * Version: 0.6.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Trigger "tap" event
---------------------------------------------------------- */

var setTapEvent = function(el) {
    var duration = 300,
        distance = 5,
        posStart = [0, 0],
        posEnd = [1, 1],
        timerStart, timerEnd;

    el.hasTap = false;

    function startWatchTap(e) {
        if (e.clientX) {
            posStart = [e.clientX, e.clientY];
        }
        timerStart = new Date().getTime();
    }

    function endWatchTap(e) {
        if (e.clientX) {
            posEnd = [e.clientX, e.clientY];
        }

        // Check duration between start & end
        timerEnd = new Date().getTime();
        if (timerEnd - timerStart >= duration) {
            return;
        }

        for (var i = 0; i <= 1; i++) {
            if (posStart[i] > posEnd[i] + distance || posStart[i] < posEnd[i] - distance) {
                return;
            }
        }

        // Disable tap monitoring for 1000ms after a tap event
        // To prevent double tap
        if (el.hasTap) {
            return;
        }
        el.hasTap = true;
        setTimeout(function() {
            el.hasTap = false;
        }, 1000);

        triggerTap();
    }

    function triggerTap() {
        // Vanilla JS
        if ("triggerEvent" in window) {
            window.triggerEvent(el, 'tap');
        }
        // Mootools
        if ("MooTools" in window) {
            el.fireEvent('tap');
        }
        // jQuery
        if ("jQuery" in window) {
            jQuery(el).trigger('tap');
        }
    }

    if (window.navigator.msPointerEnabled) {
        el.style.touchAction = "none";
        el.style.msTouchAction = "none";
        el.addEventListener('MSPointerDown', startWatchTap);
        el.addEventListener('MSPointerUp', endWatchTap);
    }
    else {
        el.addEventListener('touchstart', startWatchTap);
        el.addEventListener('touchend', endWatchTap);
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
    options = (options && typeof options == 'object') ? options : {};
    options.maxDelay = (options.maxDelay && typeof options.maxDelay == 'number') ? options.maxDelay : 1000;
    options.minRange = (options.minRange && typeof options.minRange == 'number') ? options.minRange : 75;

    options.evtSwipeToRight = (options.evtSwipeToRight && typeof options.evtSwipeToRight == 'string') ? options.evtSwipeToRight : 'swipetoright';
    options.evtSwipeToLeft = (options.evtSwipeToLeft && typeof options.evtSwipeToLeft == 'string') ? options.evtSwipeToLeft : 'swipetoleft';
    options.evtSwipeToBottom = (options.evtSwipeToBottom && typeof options.evtSwipeToBottom == 'string') ? options.evtSwipeToBottom : 'swipetobottom';
    options.evtSwipeToTop = (options.evtSwipeToTop && typeof options.evtSwipeToTop == 'string') ? options.evtSwipeToTop : 'swipetotop';

    if (window.navigator.msPointerEnabled) {
        // Disable touch actions on element
        el.style.touchAction = "none";
        el.style.msTouchAction = "none";
        el.addEventListener('MSPointerDown', checkTouchStart);
        el.addEventListener('MSPointerUp', checkTouchEnd);
    }
    else {
        el.addEventListener('touchstart', checkTouchStart);
        el.addEventListener('touchend', checkTouchEnd);
    }

    function checkTouchStart(e) {
        timeStart = new Date().getTime();
        if (e.touches && e.touches[0].pageX) {
            pos.xStart = e.touches[0].pageX;
            pos.yStart = e.touches[0].pageY;
        }
        else if (e.pageX && e.pageY) {
            pos.xStart = e.pageX;
            pos.yStart = e.pageY;
        }
    }

    function checkTouchEnd(e) {
        timeEnd = new Date().getTime();
        if (e.changedTouches && e.changedTouches[0].pageX) {
            pos.xEnd = e.changedTouches[0].pageX;
            pos.yEnd = e.changedTouches[0].pageY;
        }
        else if (e.pageX && e.pageY) {
            pos.xEnd = e.pageX;
            pos.yEnd = e.pageY;
        }
        else {
            return;
        }
        calculateEvent(e);

    }

    function calculateEvent(e) {

        var eventTriggered = false,
            delay = timeEnd - timeStart;

        // Compute deltas
        deltaWi = Math.abs(pos.xStart - pos.xEnd);
        deltaHe = Math.abs(pos.yStart - pos.yEnd);

        // Horizontal event
        if (deltaWi > deltaHe && deltaWi > options.minRange && delay < options.maxDelay) {
            // To Right
            if (pos.xStart < pos.xEnd) {
                eventTriggered = options.evtSwipeToRight;
            }
            // To left
            else {
                eventTriggered = options.evtSwipeToLeft;
            }
        }

        // Vertical event
        if (deltaHe > deltaWi && deltaHe > options.minRange && delay < options.maxDelay) {
            // To Bottom
            if (pos.yStart < pos.yEnd) {
                eventTriggered = options.evtSwipeToBottom;
            }
            // To top
            else {
                eventTriggered = options.evtSwipeToTop;
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
        if ("MooTools" in window) {
            el.fireEvent(eventTriggered);
        }
        // jQuery
        if ("jQuery" in window) {
            jQuery(el).trigger(eventTriggered);
        }
    }
};
