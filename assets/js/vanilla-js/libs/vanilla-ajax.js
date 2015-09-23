/*
 * Plugin Name: AJAX
 * Version: 1.2
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
        ndata = [];

    /* Test url */
    if (!args.url) {
        return false;
    }

    /* Test callback */
    args.callback = args.callback || function(response, status) {};

    /* Test method */
    args.method = args.method || 'GET';
    args.method = args.method.toUpperCase();

    /* Test data */
    args.data = args.data || '';
    if (typeof args.data == 'object') {

        for (var i in args.data) {
            ndata.push(encodeURIComponent(i) + '=' + encodeURIComponent(args.data[i]));
        }
        args.data = ndata.join('&');
    }

    /* Set url */
    if (args.method == 'GET') {
        args.url += '?' + args.data;
    }

    /* Set XHR Object */
    if (window.XMLHttpRequest) {
        xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

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

};
