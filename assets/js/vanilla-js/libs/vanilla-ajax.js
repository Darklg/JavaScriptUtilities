/*
 * Plugin Name: AJAX
 * Version: 1.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/*
new jsuAJAX({
    callback: function(response, status){alert(response);},
    callbackError: function(response, status){alert(response);},
    data: {
        ajax: 1,
        test: 'abc'
    },
    dataType: 'json',
    headers: [['name','value']],
    keepEmptyValues: true,
    method: 'GET',
    url: 'index.html'
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

    /* Headers */
    args.headers = args.headers || [];
    args.contentType = args.contentType || 'application/x-www-form-urlencoded';
    args.dataType = args.dataType || 'default';

    /* Test callback */
    args.callback = args.callback || function(response, status) {};
    args.callbackError = args.callbackError || function(response, status) {};

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

    function getResponseData(resp, type) {
        resp = resp || '';
        type = type || 'default';
        switch (type) {
            case 'json':
                return JSON.parse(resp);
            default:
                return resp;
        }
    }

    /* Set XHR Object */
    xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function() {
        /* Callback when complete */
        if (this.readyState != 4) {
            return false;
        }

        if (this.status >= 200 && this.status < 400) {
            args.callback(getResponseData(this.responseText, args.dataType), this.status);
        }

        if (this.status >= 400) {
            args.callbackError(this.responseText, this.status);
        }
    };

    /* Open request */
    xmlHttpReq.open(args.method, args.url, true);

    var dataSend = {};
    if (args.method == 'POST') {
        dataSend = args.data;
        xmlHttpReq.setRequestHeader('Content-Type', args.contentType);
    }

    for (var ii = 0, len = args.headers.length; ii < len; ii++) {
        xmlHttpReq.setRequestHeader(args.headers[ii][0], args.headers[ii][1]);
    }

    /* Send request */
    xmlHttpReq.send(dataSend);

    return xmlHttpReq;
};
