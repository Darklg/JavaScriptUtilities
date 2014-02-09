/*
 * Plugin Name: Vanilla-JS Elements
 * Version: 1.1
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