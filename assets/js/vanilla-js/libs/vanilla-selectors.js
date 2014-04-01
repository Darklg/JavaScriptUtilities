/*
 * Plugin Name: Vanilla-JS Selectors
 * Version: 1.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  $$_ : Get multiple elements
---------------------------------------------------------- */

var $$_ = function(selector, parent) {
    var idMatch = /^\#([a-z0-9_-]+)$/,
        classMatch = /^\.([a-z0-9_-]+)$/,
        tagMatch = /^([a-z]+)$/;

    parent = parent || document;

    // If selector looks like an ID, uses $_ for performance
    if (selector.match(idMatch)) {
        return [parent.getElementById(selector)];
    }

    // If selector looks like a CSS Class, uses getElementsByClassName for performance if available
    if (selector.match(classMatch) && "getElementsByClassName" in document) {
        return parent.getElementsByClassName(selector);
    }

    // If selector matches a tag elements, uses getElementsByTagName for performance
    if (selector.match(tagMatch)) {
        return parent.getElementsByTagName(selector);
    }

    // If Query Selector exists, use it
    if ("querySelectorAll" in document) {
        return parent.querySelectorAll(selector);
    }

    return [];
};

if (!Element.prototype.find) {
    Element.prototype.find = function(selector) {
        return $$_(selector, this);
    };
}
/* ----------------------------------------------------------
  $_ : Get Element
---------------------------------------------------------- */

var $_ = function(id, parent) {
    parent = parent || document;
    return parent.getElementById(id);
};