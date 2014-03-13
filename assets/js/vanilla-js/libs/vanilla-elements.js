/*
 * Plugin Name: Vanilla-JS Elements
 * Version: 2.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Hide
---------------------------------------------------------- */

Element.hide = function(element) {
    element.style.display = 'none';
};

if (!Element.prototype.hide) {
    Element.prototype.hide = function() {
        return Element.hide(this);
    };
}

/* ----------------------------------------------------------
  Show
---------------------------------------------------------- */

Element.show = function(element) {
    element.style.display = '';
};

if (!Element.prototype.show) {
    Element.prototype.show = function() {
        return Element.show(this);
    };
}

/* ----------------------------------------------------------
  Toggle
---------------------------------------------------------- */

Element.toggleDisplay = function(element) {
    var els = element.style;
    if (els.display === 'none') {
        Element.show(element);
    }
    else {
        Element.hide(element);
    }
};

if (!Element.prototype.toggleDisplay) {
    Element.prototype.toggleDisplay = function() {
        return Element.toggleDisplay(this);
    };
}

/* ----------------------------------------------------------
  Set styles
---------------------------------------------------------- */

var elementSetStyles = function(element, styles) {
    var elStyle = element.style,
        property,
        propertyName,
        setCamelCase = function(str) {
            /* http://stackoverflow.com/a/6661012 */
            return str.replace(/-([a-z])/g, function(g) {
                return g[1].toUpperCase();
            });
        };
    styles = styles || {};

    for (property in styles) {
        propertyName = setCamelCase(property);
        element.style[propertyName] = styles[property];
    }
};

if (!Element.prototype.setStyles) {
    Element.prototype.setStyles = function(styles) {
        return elementSetStyles(this, styles);
    };
}

/* ----------------------------------------------------------
  Get Children
---------------------------------------------------------- */

var getChildren = function(element) {
    var childNodes = element.childNodes,
        children = [];

    var arLength = childNodes.length;
    for (var i = 0; i < arLength; i++) {
        if (childNodes[i].nodeType == 1) {
            children.push(childNodes[i]);
        }
    }

    return children;
};

if (!Element.prototype.getChildren) {
    Element.prototype.getChildren = function() {
        return getChildren(this);
    };
}

/* ----------------------------------------------------------
  Wrap Element
---------------------------------------------------------- */

var wrapElement = function(element, tagName) {
    tagName = tagName || 'div';
    tagName = tagName.toLowerCase();
    var wrapper = document.createElement(tagName);

    if (element.nextSibling) {
        element.parentNode.insertBefore(wrapper, element.nextSibling);
    }
    else {
        element.parentNode.appendChild(wrapper);
    }
    wrapper.appendChild(element);
    return wrapper;
};