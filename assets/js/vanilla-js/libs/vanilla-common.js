/*
 * Plugin Name: Vanilla-JS Common
 * Version: 1.11
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 * Contributors : bloodyowl
 */

/* ----------------------------------------------------------
  Utilities
---------------------------------------------------------- */

/* Console log fix
-------------------------- */

if (typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

/* ----------------------------------------------------------
  Get values
---------------------------------------------------------- */

/* Get Window dimensions
-------------------------- */

var getWindowInnerHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
};

var getWindowInnerWidth = function() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
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
        bottom = clientRect.height + top,
        width = right - left,
        height = bottom - top;

    return {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: width,
        height: height
    };
};

/* ----------------------------------------------------------
  Functions
---------------------------------------------------------- */

/* Debounce
** Thx to @DavidWalsh
** http://minu.me/chxr
-------------------------- */

var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
        if (immediate && !timeout) {
            func.apply(context, args);
        }
    };
};

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

/* Serialize a form
-------------------------- */

var serializeForm = function(form) {
    if (!form) {
        return {};
    }
    var values = {},
        tags = ['input', 'select', 'textarea'],
        tagsLength = tags.length;

    // Add Elements function
    var loadValues = function(els, values) {
        values = values ? values : {};
        var el = false,
            name,
            tag,
            type,
            value;
        for (el in els) {
            if (typeof els[el] == 'object') {
                type = els[el].getAttribute('type') ? els[el].getAttribute('type').toLowerCase() : '';
                tag = els[el].tagName.toLowerCase();
                name = els[el].getAttribute('name');
                value = els[el].value;
                // Empty value for non checked checkbox & radio
                if ( !! type && (type == 'checkbox' || type == 'radio') && !els[el].checked) {
                    value = '';
                }
                // Break if name is not available
                if (!name) {
                    continue;
                }
                // Break if value exists and is not empty
                if (typeof values[name] !== 'undefined' && values[name] !== '') {
                    continue;
                }
                values[name] = value;
            }
        }
        return values;
    };

    for (var i = 0; i < tagsLength; i++) {
        values = loadValues(form.getElementsByTagName(tags[i]), values);
    }

    return values;
};

/* ----------------------------------------------------------
  Morph CSS
---------------------------------------------------------- */

var morphCSS = function(element, settings) {
    settings = settings || {};

    var time = settings.time || 300,
        values = settings.values || [],
        callback = settings.callback || function() {},
        intervalDelay = 25;

    // Morph an element style from a value to a value
    var setElementMorph = function(elStyle, from, to) {
        var intervalMorph = (to - from) / (time / intervalDelay),
            styleValue = from,
            interval = false;
        elStyle[val] = from;
        // Launch interval
        interval = setInterval(function() {
            styleValue += intervalMorph;
            elStyle[val] = styleValue;
        }, intervalDelay);
        setTimeout(function() {
            // Clear interval after time
            clearInterval(interval);
            // Set final style
            elStyle[val] = to;
            // Launch callback
            callback();
        }, time);
    };

    // For each value
    for (var val in values) {
        if (values.hasOwnProperty(val)) {
            setElementMorph(element.style, values[val][0], values[val][1]);
        }
    }
    return element;
};

/* ----------------------------------------------------------
  Morph HTML Number
---------------------------------------------------------- */

var morphHTMLNumber = function(options) {
    var finalValue, intervalValue, interval;
    if (!options.el) {
        return false;
    }

    // Default options
    options.time = options.time || 3000;
    options.intervalDelay = options.intervalDelay || 25;

    // Get values
    finalValue = options.finalValue || parseInt(options.el.innerHTML, 10);
    intervalValue = finalValue / (options.time / options.intervalDelay);
    startValue = 0;

    // Set content to 0
    options.el.innerHTML = 0;

    // Launch Counter incrementation
    interval = setInterval(function() {
        startValue += intervalValue;
        options.el.innerHTML = Math.ceil(startValue);
    }, options.intervalDelay);

    setTimeout(function() {
        // Stop counter
        clearInterval(interval);
        // Set content to final value
        options.el.innerHTML = finalValue;
    }, options.time);
};

/* ----------------------------------------------------------
  Datas
---------------------------------------------------------- */

var storeData = function(el, name, value) {
    var attr = 'data-' + name;
    if (el) {
        return el.setAttribute(attr, value);
    }
    return false;
};

var retrieveData = function(el, name) {
    var attr = 'data-' + name;
    if (el) {
        return el.getAttribute(attr);
    }
    return false;
};

var removeData = function(el, name) {
    return storeData(el, name, '');
};

/* ----------------------------------------------------------
  Merge objects
---------------------------------------------------------- */

var mergeObjects = function() {
    var objectReturn = {}, o;
    for (var n in arguments) {
        if (arguments.hasOwnProperty(n) && typeof arguments[n] == 'object') {
            for (o in arguments[n]) {
                if (arguments[n].hasOwnProperty(o)) {
                    objectReturn[o] = arguments[n][o];
                }
            }
        }
    }
    return objectReturn;
};

/* ----------------------------------------------------------
  Image scroll events
---------------------------------------------------------- */

var imageScrollEvent = function(el, callBack, limitCalculus) {
    var elDim = 0,
        percentScroll = 0,
        scrollEvent = function() {
            var limitVal = limitCalculus();
            if (limitVal < elDim.top) {
                percentScroll = 0;
            }
            else if (limitVal > elDim.bottom) {
                percentScroll = 100;
            }
            else {
                percentScroll = parseInt(((limitVal - elDim.top) / elDim.height) * 100, 10);
            }
            callBack(percentScroll);
        };
    // Call on load
    callOnImgLoad(el.src, function() {
        elDim = getElementOffset(el);
        window.addEvent(document, 'scroll', function() {
            scrollEvent();
        });
        scrollEvent();
    });
};

// Image disappears on the top of the viewport
var imageDisappear = function(el, callBack) {
    imageScrollEvent(el, callBack, function() {
        return getBodyScrollTop();
    });
};

// Image appears from the bottom of viewport
var imageAppear = function(el, callBack) {
    imageScrollEvent(el, callBack, function() {
        return getBodyScrollTop() + getWindowInnerHeight();
    });
};