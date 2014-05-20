/*
 * Plugin Name: Vanilla-JS Events
 * Version: 1.5
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Domready
---------------------------------------------------------- */

/* From the amazing Dustin Diaz : http://www.dustindiaz.com/smallest-domready-ever */
// "!document.body" check ensures that IE fires domReady correctly
window.domReady = function(func) {
    if (/in/.test(document.readyState) || !document.body) {
        setTimeout(function() {
            window.domReady(func);
        }, 9);
    }
    else {
        func();
    }
};

/* ----------------------------------------------------------
  Add Event
---------------------------------------------------------- */

window.addEvent = function(el, eventName, callback) {
    if (el.addEventListener) {
        el.addEventListener(eventName, callback, false);
    }
    else if (el.attachEvent) {
        el.attachEvent("on" + eventName, function(e) {
            return callback.call(el, e);
        });
    }
};

if (!Element.prototype.addEvent) {
    Element.prototype.addEvent = function(eventName, callback) {
        return window.addEvent(this, eventName, callback);
    };
}

/* ----------------------------------------------------------
  Add events
---------------------------------------------------------- */

window.addEvents = function(el, events) {
    for (var ev in events) {
        if (events.hasOwnProperty(ev)) {
            window.addEvent(el, ev, events[ev]);
        }
    }
};

if (!Element.prototype.addEvents) {
    Element.prototype.addEvents = function(events) {
        return window.addEvents(this, events);
    };
}

/* ----------------------------------------------------------
  Remove Event
---------------------------------------------------------- */

window.removeEvent = function(el, eventName, callback) {
    if (el.removeEventListener) {
        el.removeEventListener(eventName, callback, false);
    }
    else {
        elem.detachEvent('on' + eventName, callback);
    }
};

if (!Element.prototype.removeEvent) {
    Element.prototype.removeEvent = function(eventName, callback) {
        return window.removeEvent(this, eventName, callback);
    };
}

/* ----------------------------------------------------------
  Trigger event
---------------------------------------------------------- */

window.triggerEvent = function(el, eventName) {
    var e = false;
    if (document.createEventObject) {
        e = document.createEventObject();
        e.button = 1;
        return el.fireEvent("on" + eventName, e);
    }
    else {
        e = document.createEvent("HTMLEvents");
        e.initEvent(eventName, true, false);
        return el.dispatchEvent(e);
    }
};

if (!Element.prototype.triggerEvent) {
    Element.prototype.triggerEvent = function(eventName) {
        return window.triggerEvent(this, eventName);
    };
}

/* ----------------------------------------------------------
  Event prevent default
---------------------------------------------------------- */

window.eventPreventDefault = function(event) {
    return (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
};

/* ----------------------------------------------------------
  Custom events
---------------------------------------------------------- */

/* Resize end
-------------------------- */

var triggerWindowResizeEnd = function() {
    var timer = false;
    window.addEvent(window, 'resize', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            window.triggerEvent(window, 'resizeend');
        }, 300);
    });
};

/* Scroll end
-------------------------- */

var triggerWindowScrollEnd = function() {
    var timer = false;
    window.addEvent(window, 'scroll', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            window.triggerEvent(window, 'scrollend');
        }, 300);
    });
};