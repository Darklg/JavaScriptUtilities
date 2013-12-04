/*
 * Plugin Name: Vanilla-JS Cookies
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* Many thanks to http://www.quirksmode.org/js/cookies.html */

/* ----------------------------------------------------------
  Set Cookie
---------------------------------------------------------- */

var setCookie = function(name, value, expiration) {
    var cookie_value = name + '=' + value + ';';

    /* Expiration */
    if (expiration) {
        var date = new Date();
        date.setTime(date.getTime() + (expiration * 24 * 60 * 60 * 1000));
        cookie_value = cookie_value + "expires=" + date.toGMTString() + ';';
    }

    document.cookie = cookie_value + 'path=/';

};

/* ----------------------------------------------------------
  Get Cookie
---------------------------------------------------------- */

var getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

/* ----------------------------------------------------------
  Delete Cookie
---------------------------------------------------------- */

var deleteCookie = function(name) {
    setCookie(name, '', -1);
};