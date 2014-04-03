/*
 * Plugin Name: Vanilla-JS IE
 * Version: 0.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  HTML5 shim
 ---------------------------------------------------------- */

(function() {
    var tagz = ["article", "aside", "details", "figcaption", "figure", "footer", "header", "hgroup", "nav", "section", "video", "audio", "mark"],
        tagzLen = tagz.length,
        i;
    for (i = 0; i < tagzLen; i++) {
        document.createElement(tagz[i]);
    }
}());

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

/* ----------------------------------------------------------
  Selectors
---------------------------------------------------------- */

/* Compatibility for getElementsByClassName in IE8
---------------------------------------------------------- */

if (!('getElementsByClassName' in document)) {
    var elProtoGetElementsByClassName = function(className) {
        className = className.replace(/([\s\.]?)/g, '');
        return this.querySelectorAll('.' + className);
    };
    Element.prototype.getElementsByClassName = elProtoGetElementsByClassName;
    if(HTMLDocument){
        HTMLDocument.prototype.getElementsByClassName = elProtoGetElementsByClassName;
    }
}