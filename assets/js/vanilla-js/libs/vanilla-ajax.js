/*
 * Plugin Name: AJAX
 * Version: 1.2.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/*
new jsuAJAX({
    url: 'index.html',
    method: 'GET',
    callback: function(response, status){alert(response);},
    data: {
        ajax: 1,
        test: 'abc'
    }
});
*/

var jsuAJAX = function(args) {
    'use strict';
    var xmlHttpReq = false,
        sepUrlData = '?',
        ndata = [];

    /* Test url */
    if (!args.url) {
        return false;
    }

    if (!window.XMLHttpRequest) {
        return false;
    }

    /* Test callback */
    args.callback = args.callback || function(response, status) {};

    /* Test method */
    args.method = args.method || 'GET';
    args.method = args.method.toUpperCase();

    /* Keep empty values in data */
    args.keepEmptyValues = args.keepEmptyValues || false;

    /* Test data */
    args.data = args.data || '';
    if (typeof args.data == 'object') {

        for (var i in args.data) {
            if (args.data[i].length === 0 && !args.keepEmptyValues) {
                continue;
            }
            ndata.push(encodeURIComponent(i) + '=' + encodeURIComponent(args.data[i]));
        }
        args.data = ndata.join('&');
    }

    /* Set URL separator */
    if (args.url.indexOf('?') > -1) {
        sepUrlData = '&';
    }

    /* Set url */
    if (args.method == 'GET' && args.data) {
        args.url += sepUrlData + args.data;
    }

    /* Set XHR Object */
    xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function() {
        /* Callback when complete */
        if (this.readyState == 4 && this.status >= 200 && this.status < 400) {
            args.callback(this.responseText, this.status);
        }
    };

    /* Open request */
    xmlHttpReq.open(args.method, args.url, true);

    var dataSend = {};
    if (args.method == 'POST') {
        dataSend = args.data;
        xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    /* Send request */
    xmlHttpReq.send(dataSend);

    return xmlHttpReq;
};
