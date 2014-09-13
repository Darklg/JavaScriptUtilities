/*
 * Plugin Name: Vanilla-JS getUserMedia
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */
var dkJSUGetUserMedia = function(target, params) {
    var userMediaParams = {},
        successCallback = function(target, localMediaStream) {
            target.src = window.URL.createObjectURL(localMediaStream);
            target.play();
        },
        failureCallback = function(target) {
            target.src = '';
        },
        completeCallback = function(localMediaStream) {
            successCallback(target, localMediaStream);
        },
        errorCallback = function(err) {
            if (err) {
                console.log("Error : " + err);
            }
            failureCallback(target);
        };

    /* Try to get getUserMedia */
    if (!navigator.hasOwnProperty('getUserMedia')) {
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    /* Try to get params */
    if (typeof params != 'object') {
        params = {};
    }
    if (!params.type || typeof params.type != 'object') {
        params.type = ['video'];
    }

    /* Set stream params */
    /* - Media type */
    for (var id in params.type) {
        userMediaParams[params.type[id]] = true;
    }
    /* - Callbacks */
    if (params.hasOwnProperty('successCallback') && typeof params.successCallback == 'function') {
        successCallback = params.successCallback;
    }
    if (params.hasOwnProperty('errorCallback') && typeof params.errorCallback == 'function') {
        errorCallback = params.errorCallback;
    }

    /* If we can't reach it, stop the function */
    if (!navigator.getUserMedia) {
        failureCallback(target);
        return false;
    }

    /* Launch call */

    navigator.getUserMedia(userMediaParams, completeCallback, errorCallback);

    return true;
};