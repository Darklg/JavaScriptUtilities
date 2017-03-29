/*
 * Plugin Name: AJAX Cache
 * Version: 0.3.0
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
    settings.targetlength = 0;

    var currentTime = Math.floor(new Date().getTime() / 1000);

    /* We need some values to continue */
    if (!settings.url || !settings.target) {
        return false;
    }

    /* Target should be a collection */
    if ('tagName' in settings.target) {
        settings.target = new Array(settings.target);
    }
    settings.targetlength = settings.target.length;

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
        settings.callback_beforeajax(settings);
        for (var i = 0; i < settings.targetlength; i++) {
            settings.target[i].setAttribute('data-vanillaajaxcacheloading', '1');
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', settings.url);
        xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                ajax_success(xhr.responseText);
            }
        };
        xhr.send();
    }

    function ajax_success(responseText) {
        for (var i = 0; i < settings.targetlength; i++) {
            settings.target[i].setAttribute('data-vanillaajaxcacheloading', '');
        }
        localStorage.setItem(ckey, responseText);
        localStorage.setItem(ckeytime, currentTime);
        inject_content(ckey);
    }

    function inject_content() {
        var value = localStorage.getItem(ckey),
            item = false;
        for (var i = 0; i < settings.targetlength; i++) {
            item = settings.target[i];
            settings.callback_beforeinsert(item, value);
            item.innerHTML = value;
            settings.callback_afterinsert(item, value);
        }
    }
};
