/*
 * Plugin Name: Vanilla-JS Classes
 * Version: 1.2.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Get class names
---------------------------------------------------------- */

Element.getClassNames = function(element) {
    var classNames = [],
        elementClassName = element.className;
    if (elementClassName !== '') {
        elementClassName = elementClassName.replace(/\s+/g, ' ');
        classNames = elementClassName.split(' ');
    }
    return classNames;
};

if (!Element.prototype.getClassNames) {
    Element.prototype.getClassNames = function() {
        return Element.getClassNames(this);
    };
}

/* ----------------------------------------------------------
  Test if element has a class
---------------------------------------------------------- */

Element.hasClass = function(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    return Array.contains(className, Element.getClassNames(element));
};

if (!Element.prototype.hasClass) {
    Element.prototype.hasClass = function(className) {
        return Element.hasClass(this, className);
    };
}

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

if (!Element.prototype.addClass) {
    Element.prototype.addClass = function(className) {
        Element.addClass(this, className);
        return this;
    };
}

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
    var i = 0,
        arLength = elementClasses.length;
    for (; i < arLength; i++) {
        if (elementClasses[i] !== className) {
            newElementClasses.push(elementClasses[i]);
        }
    }
    element.className = newElementClasses.join(' ');
};

if (!Element.prototype.removeClass) {
    Element.prototype.removeClass = function(className) {
        Element.removeClass(this, className);
        return this;
    };
}

/* ----------------------------------------------------------
  Toggle a class
---------------------------------------------------------- */

Element.toggleClass = function(element, className, force) {
    var elHasClass = Element.hasClass(element, className);
    if (!elHasClass || force == 'add') {
        Element.addClass(element, className);
    }
    if (elHasClass || force == 'remove') {
        Element.removeClass(element, className);
    }
};

if (!Element.prototype.toggleClass) {
    Element.prototype.toggleClass = function(className, force) {
        Element.toggleClass(this, className, force);
        return this;
    };
}