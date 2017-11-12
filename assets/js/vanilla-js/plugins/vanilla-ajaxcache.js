/*
 * Plugin Name: AJAX Cache
 * Version: 0.5.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities AJAX Cache be freely distributed under the MIT license.
 */

var vanillaAjaxCache = function(settings) {
    "use strict";
    settings = settings || {};
    settings.duration = settings.duration || 3600;
    settings.method = settings.method || 'GET';
    settings.target = settings.target || false;
    settings.cachebuster = settings.cachebuster || false;
    settings.url = settings.url || false;
    settings.key = settings.key || settings.url.replace(/([^a-z]+)/g, '');
    settings.callback_beforeajax = settings.callback_beforeajax || function(item, value) {};
    settings.callback_beforeinsert = settings.callback_beforeinsert || function(item, value) {};
    settings.callback_afterinsert = settings.callback_afterinsert || function(item, value) {};
    settings.callback_afterajaxfail = settings.callback_afterajaxfail || function(xhr) {};
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
        if (settings.cachebuster) {
            settings.url = set_url_cachebuster(settings.url);
        }
        xhr.open(settings.method, settings.url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onerror = function(e) {
            settings.callback_afterajaxfail(e.target.status);
        };
        xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                ajax_success(xhr.responseText);
            }
            if (xhr.status >= 500) {
                settings.callback_afterajaxfail(xhr.status);
            }
        };

        xhr.send();
    }

    function set_url_cachebuster(settingsUrl) {
        var parser = document.createElement('a'),
            cachebuster = (new Date()).getTime();
        parser.href = settingsUrl;
        parser.search += (parser.search.substr(0, 1) == '?' ? '&' : '?') + 'vanillaajaxcachebuster=' + cachebuster;
        return parser.href;
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
