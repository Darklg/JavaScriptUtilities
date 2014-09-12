/*
 * Plugin Name: Vanilla-JS getUserMedia
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUGetUserMedia = function(target, params) {

    var userMediaParams = {};

    /* Try to get getUserMedia */
    if (!navigator.hasOwnProperty('getUserMedia')) {
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    /* If we can't reach it, stop the function */
    if (!navigator.getUserMedia) {
        return false;
    }

    /* Try to get params */
    if (typeof params != 'object') {
        params = {};
    }
    if (!params.type || typeof params.type != 'object') {
        params.type = ['video'];
    }

    /* Set stream params */

    for (var id in params.type) {
        userMediaParams[params.type[id]] = true;
    }

    /* Define callbacks */

    var successCallback = function(localMediaStream) {
        target.src = window.URL.createObjectURL(localMediaStream);
        target.play();
    };
    var errorCallback = function(err) {
        console.log("The following error occured: " + err);
    };

    /* Launch call */

    navigator.getUserMedia(userMediaParams, successCallback, errorCallback);

    return true;
};