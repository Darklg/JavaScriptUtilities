/*
 * Plugin Name: AJAX Cache
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities AJAX Cache be freely distributed under the MIT license.
 */

var vanillaAjaxCache = function(settings) {
    "use strict";
    settings = settings || {};
    settings.duration = settings.duration || 3600;
    settings.target = settings.target || false;
    settings.url = settings.url || false;
    settings.key = settings.key || false;

    var currentTime = Math.floor(new Date().getTime() / 1000);

    /* We need some values to continue */
    if (!settings.url || !settings.target || !settings.key) {
        return false;
    }

    var ckey = 'vanillaajaxcache____' + settings.key,
        ckeytime = ckey + '____time';

    /* Key exists */
    if (!!localStorage.getItem(ckey) && !!localStorage.getItem(ckeytime)) {
        /* Content not expired */
        var loginTime = parseInt(localStorage.getItem(ckeytime),10);
        if (loginTime + settings.duration > currentTime) {
            settings.target.innerHTML = localStorage.getItem(ckey);
            return;
        }
        /* Content expired */
        else {
            localStorage.removeItem(ckey);
            localStorage.removeItem(ckeytime);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', settings.url);
    settings.target.setAttribute('data-vanillaajaxcacheloading', '1');
    xhr.onload = function() {
        if (xhr.status === 200) {
            settings.target.setAttribute('data-vanillaajaxcacheloading', '');
            localStorage.setItem(ckey, xhr.responseText);
            localStorage.setItem(ckeytime, currentTime);
            settings.target.innerHTML = localStorage.getItem(ckey);
        }
    };
    xhr.send();
};
