/*
 * Plugin Name: Vanilla-JS Classes
 * Version: 1.0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Get class names
---------------------------------------------------------- */

Element.getClassNames = function(element) {
    var classNames = [];
    var elementClassName = element.className;
    if (elementClassName !== '') {
        classNames = elementClassName.split(' ');
    }
    return classNames;
};

/* ----------------------------------------------------------
  Test if element has a class
---------------------------------------------------------- */

Element.hasClass = function(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    return Array.contains(className, Element.getClassNames(element));
};

/* ----------------------------------------------------------
  Add a class
---------------------------------------------------------- */

Element.addClass = function(element, className) {
    if (element.classList) {
        element.classList.add(className);
        return;
    }
    if (!Element.hasClass(element, className)) {
        var elementClasses = Element.getClassNames(element);
        elementClasses.push(className);
        element.className = elementClasses.join(' ');
    }
};

/* ----------------------------------------------------------
  Remove a class
---------------------------------------------------------- */

Element.removeClass = function(element, className) {
    if (element.classList) {
        element.classList.remove(className);
        return;
    }
    var elementClasses = Element.getClassNames(element);
    var newElementClasses = [];
    for (var i in elementClasses) {
        if (elementClasses[i] !== className && typeof elementClasses[i] == 'string') {
            newElementClasses.push(elementClasses[i]);
        }
    }
    element.className = newElementClasses.join(' ');
};

/* ----------------------------------------------------------
  Toggle a class
---------------------------------------------------------- */

Element.toggleClass = function(element, className) {
    if (!Element.hasClass(element, className)) {
        Element.addClass(element, className);
    }
    else {
        Element.removeClass(element, className);
    }
};