/*
 * Plugin Name: Vanilla-JS Selectors
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  $$_ : Get multiple elements
---------------------------------------------------------- */

var $$_ = function(selector) {
    var elements = [],
        tagMatch = /^([a-z]+)$/,
        idMatch = /^\#([a-z0-9_-]+)$/,
        classMatch = /^\.([a-z0-9_-]+)$/;

    // If selector looks like an ID, uses $_ for performance
    if (selector.match(idMatch)) {
        return [document.getElementById(selector)];
    }

    // If selector looks like a CSS Class, uses $_ for performance
    if (selector.match(classMatch)) {
        return document.getElementsByClassName(selector);
    }

    // If selector matches a tag elements, uses getElementsByTagName for performance
    if (selector.match(tagMatch)) {
        return document.getElementsByTagName(selector);
    }

    // If Query Selector exists, use it
    if ("querySelectorAll" in document) {
        return document.querySelectorAll(selector);
    }
};

/* ----------------------------------------------------------
  $_ : Get Element
---------------------------------------------------------- */

var $_ = function(id) {
    return document.getElementById(id);
};