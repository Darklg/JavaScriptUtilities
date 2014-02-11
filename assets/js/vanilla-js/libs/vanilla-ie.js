/*
 * Plugin Name: Vanilla-JS IE
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  String
---------------------------------------------------------- */

/* Trim
-------------------------- */

String.trim = function(text) {
    return text.replace(/^\s+|\s+$/g, "");
};

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return String.trim(this);
    };
}