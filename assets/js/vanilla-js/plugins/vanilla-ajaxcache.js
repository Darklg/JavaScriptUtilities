/*
 * Plugin Name: AJAX Cache
 * Version: 0.2.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities AJAX Cache be freely distributed under the MIT license.
 */

var vanillaAjaxCache = function(settings) {
    "use strict";
    settings = settings || {};
    settings.duration = settings.duration || 3600;
    settings.target = settings.target || false;
    settings.url = settings.url || false;
    settings.key = settings.key || settings.url.replace(/([^a-z]+)/g, '');
    settings.callback_beforeajax = settings.callback_beforeajax || function(item, value) {};
    settings.callback_beforeinsert = settings.callback_beforeinsert || function(item, value) {};
    settings.callback_afterinsert = settings.callback_afterinsert || function(item, value) {};

    var currentTime = Math.floor(new Date().getTime() / 1000);

    /* We need some values to continue */
    if (!settings.url || !settings.target) {
        return false;
    }

    var ckey = 'vanillaajaxcache____' + settings.key,
        ckeytime = ckey + '____time';

    /* Key exists */
    if (!!localStorage.getItem(ckey) && !!localStorage.getItem(ckeytime)) {
        /* Content not expired */
        var loginTime = parseInt(localStorage.getItem(ckeytime), 10);
        if (loginTime + settings.duration > currentTime) {
            inject_content(ckey);
            return;
        }
        /* Content expired */
        else {
            inject_content(ckey);
            localStorage.removeItem(ckey);
            localStorage.removeItem(ckeytime);
        }
    }

    make_ajax_request();

    /* ----------------------------------------------------------
      App
    ---------------------------------------------------------- */

    function make_ajax_request() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', settings.url);
        settings.callback_beforeajax(settings);
        settings.target.setAttribute('data-vanillaajaxcacheloading', '1');
        xhr.onload = function() {
            if (xhr.status === 200) {
                settings.target.setAttribute('data-vanillaajaxcacheloading', '');
                localStorage.setItem(ckey, xhr.responseText);
                localStorage.setItem(ckeytime, currentTime);
                inject_content(ckey);
            }
        };
        xhr.send();
    }

    function inject_content() {
        var value = localStorage.getItem(ckey),
            item = settings.target;
        settings.callback_beforeinsert(item, value);
        item.innerHTML = value;
        settings.callback_afterinsert(item, value);
    }
};
