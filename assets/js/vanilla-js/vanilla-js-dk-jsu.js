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

function domReady(func) {
    /in/.test(document.readyState) ? setTimeout('domReady(' + func + ')', 9) : func();
}

/* ----------------------------------------------------------
   Classes
   ------------------------------------------------------- */

/* Add a class
   ----------------------- */

function addClass(element, className) {
    if(!hasClass(element, className)) {
        var elementClasses = getClassNames(element);
        elementClasses.push(className);
        element.className = elementClasses.join(' ');
    }
}

/* Test if has a class
   ----------------------- */

function hasClass(element, className) {
    return InArray(className, getClassNames(element));
}

/* Get class names
   ----------------------- */

function getClassNames(element) {
    var classNames = [];
    var elementClassName = element.className;
    if(elementClassName !== '') {
        classNames = elementClassName.split(' ');
    }
    return classNames;
}

/* Remove a class
   ----------------------- */

function removeClass(element, className) {
    var elementClasses = getClassNames(element);
    var newElementClasses = [];
    for(var i in elementClasses) {
        if(elementClasses[i] !== className) {
            newElementClasses.push(elementClasses[i]);
        }
    }
    element.className = newElementClasses.join(' ');
}

/* ----------------------------------------------------------
   Miscellaneous
   ------------------------------------------------------- */

/* In array
   ----------------------- */

function InArray(needle, haystack) {
    var _return = false;
    for(var i in haystack) {
        if(haystack[i] === needle) {
            _return = true;
        }
    }
    return _return;
}

/* Trim
   ----------------------- */

function trim(text) {
    return text.replace(/^\s+|\s+$/g, "");
}