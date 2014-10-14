/*
 * Plugin Name: Vanilla-JS Events
 * Version: 1.9
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
  One event
---------------------------------------------------------- */

window.oneEvent = function(el, eventName, callback) {
    var newCallback = function(e) {
        callback(e);
        window.removeEvent(el, eventName, newCallback);
    };
    window.addEvent(el, eventName, newCallback);
};

if (!Element.prototype.oneEvent) {
    Element.prototype.oneEvent = function(eventName, callback) {
        return window.oneEvent(this, eventName, callback);
    };
}

/* ----------------------------------------------------------
  Trigger event
---------------------------------------------------------- */

window.triggerEvent = function(el, eventName, parameters) {
    var e = false;
    parameters = parameters || {};
    if (document.createEventObject) {
        e = document.createEventObject();
        e.button = 1;
        e.jsuparams = parameters;
        return el.fireEvent("on" + eventName, e);
    }
    else {
        e = document.createEvent("HTMLEvents");
        e.initEvent(eventName, true, false);
        e.jsuparams = parameters;
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

/* Trigger an event after
 * a delay resetted each
 * time the event is called
-------------------------- */

window.eventTriggeredAfterDelay = function(el, opt) {
    if (typeof opt != 'object' || !opt) {
        opt = {};
    }

    if (!opt.originalEvent) {
        opt.originalEvent = 'click';
    }
    if (!opt.newEvent) {
        opt.newEvent = opt.originalEvent + 'end';
    }
    if (!opt.delay) {
        opt.delay = 300;
    }

    var timer = false,
        actionFunction = function() {
            clearTimeout(timer);
            timer = setTimeout(triggerFunction, opt.delay);
        },
        triggerFunction = function() {
            window.triggerEvent(el, opt.newEvent);
        };
    window.addEvent(el, opt.originalEvent, actionFunction);
};

/* Watch for keyboard keys
-------------------------- */

/* http://unixpapa.com/js/key.html */

window.watchKeyBoardKeys = function() {
    window.addEvent(window, 'keypress', function(event) {
        var char = 0;
        if (event.which === null) {
            char = String.fromCharCode(event.keyCode);
        }
        else if (event.which !== 0 && event.charCode !== 0) {
            char = String.fromCharCode(event.which);
        }
        window.triggerEvent(window, 'keypress_' + char);
    });
};