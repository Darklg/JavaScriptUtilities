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

function domReady(func) { 
    if(/in/.test(document.readyState) || !document.body) setTimeout(function(){domReady(func)}, 9)
    else func()
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
    var i = 0,
        length = haystack.length;

    for(;i < length; i++) {
        if(haystack[i] === needle) return true;
    }
    return false;
}

/* Trim
   ----------------------- */

function trim(text) {
    return text.replace(/^\s+|\s+$/g, "");
}