/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   $_ : Get Element
   ------------------------------------------------------- */

function $_(id) {
    return document.getElementById(id);
}

/* ----------------------------------------------------------
   Events
   ------------------------------------------------------- */

/* Domready
   ----------------------- */

/* From the amazing Dustin Diaz : http://www.dustindiaz.com/smallest-domready-ever */
// «!document.body» check ensures that IE fires domReady correctly
window.domReady = function(func) {
    if(/in/.test(document.readyState) || !document.body) {
        setTimeout(function() {
            domReady(func);
        }, 9);
    }
    else {
        func();
    }
};

/* ----------------------------------------------------------
   Elements
   ------------------------------------------------------- */

/* Show / Hide / Toggle */

Element.hide = function(element) {
    element.style.display = 'none';
};

Element.show = function(element) {
    element.style.display = '';
};

Element.toggleDisplay = function(element) {
    var els = element.style;
    if (els.display === 'none') {
        Element.show(element);
    }
    else {
        Element.hide(element);
    }
};


/* Classes
   ----------------------- */

/* Get class names */

Element.getClassNames = function(element) {
    var classNames = [];
    var elementClassName = element.className;
    if (elementClassName !== '') {
        classNames = elementClassName.split(' ');
    }
    return classNames;
};

/* Test if has a class */

Element.hasClass = function(element, className) {
    return Array.contains(className, Element.getClassNames(element));
};

/* Add a class */

Element.addClass = function(element, className) {
    if (!Element.hasClass(element, className)) {
        var elementClasses = Element.getClassNames(element);
        elementClasses.push(className);
        element.className = elementClasses.join(' ');
    }
};

/* Remove a class */

Element.removeClass = function(element, className) {
    var elementClasses = Element.getClassNames(element);
    var newElementClasses = [];
    for (var i in elementClasses) {
        if (elementClasses[i] !== className) {
            newElementClasses.push(elementClasses[i]);
        }
    }
    element.className = newElementClasses.join(' ');
};

/* Toggle a class */

Element.toggleClass = function(element, className) {
    if (!Element.hasClass(element, className)) {
        Element.addClass(element, className);
    }
    else {
        Element.removeClass(element, className);
    }
};

/* ----------------------------------------------------------
   Miscellaneous
   ------------------------------------------------------- */

/* In array
   ----------------------- */

Array.contains = function(needle, haystack) {
    var i = 0,
        length = haystack.length;

    for(; i < length; i++) {
        if(haystack[i] === needle) return true;
    }
    return false;
};

/* Trim
   ----------------------- */

String.trim = function(text) {
    return text.replace(/^\s+|\s+$/g, "");
};

/* Console log fix
   ----------------------- */

if (typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function(){};
}