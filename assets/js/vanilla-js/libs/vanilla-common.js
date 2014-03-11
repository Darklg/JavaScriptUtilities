/*
 * Plugin Name: Vanilla-JS Common
 * Version: 1.6
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

/* Get Window Inner Height
-------------------------- */

var getWindowInnerHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
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
        bottom = clientRect.height + top;

    return {
        top: top,
        right: right,
        bottom: bottom,
        left: left
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