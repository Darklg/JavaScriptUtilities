/*
 * Plugin Name: Vanilla-JS Arrays
 * Version: 1.0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Array contains
---------------------------------------------------------- */

Array.contains = function(needle, haystack) {
    var i = 0,
        length = haystack.length;

    for (; i < length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
};

if (!Array.prototype.contains) {
    Array.prototype.contains = function(needle) {
        return Array.contains(needle, this);
    };
}

/* ----------------------------------------------------------
  Array each
---------------------------------------------------------- */

Array.each = function(arrayToParse, callback) {
    var i = 0,
        length = arrayToParse.length;
    for (; i < length; i++) {
        callback(arrayToParse[i]);
    }
};

if (!Array.prototype.each) {
    Array.prototype.each = function(callback) {
        Array.each(this, callback);
    };
}