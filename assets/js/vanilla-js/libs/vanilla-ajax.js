/*
 * Plugin Name: AJAX
 * Version: 1.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/*
new jsuAJAX({
    url: 'index.html',
    method: 'GET',
    callback: function(response, status){alert(response);},
    data: 'ajax=1&test=abc'
});
 */

var jsuAJAX = function(args) {
    var xmlHttpReq = false;

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
        var ndata = '';
        for (var i in args.data) {
            if (ndata !== '') {
                ndata += '&';
            }
            ndata += i + '=' + args.data[i];
        }
        args.data = ndata;
    }

    /* Set XHR Object */
    if (window.XMLHttpRequest) {
        xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (args.method == 'GET') {
        args.url += '?' + args.data;
    }

    /* Open request */
    xmlHttpReq.open(args.method, args.url, true);
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xmlHttpReq.onreadystatechange = function() {
        /* Callback when complete */
        if (this.readyState == 4) {
            args.callback(this.responseText, this.status);
        }
    };

    var dataSend = {};
    if (args.method == 'POST') {
        dataSend = args.data;
    }

    /* Send request */
    xmlHttpReq.send(dataSend);

};