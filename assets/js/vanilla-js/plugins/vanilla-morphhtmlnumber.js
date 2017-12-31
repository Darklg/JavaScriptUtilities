/*
 * Plugin Name: Morph HTML Number
 * Version: 0.2.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Morph HTML Number
---------------------------------------------------------- */

var morphHTMLNumber = function(options) {
    'use strict';
    var intervalValue, interval, startValue;
    if (!options) {
        return false;
    }
    if (options.innerHTML) {
        options = {
            el: options
        };
    }
    if (!options.el) {
        return false;
    }

    // Default options
    var defaultOptions = {};

    /* Animation time */
    defaultOptions.time = 1500;
    if (options.el.getAttribute("data-morphtime")) {
        defaultOptions.time = options.el.getAttribute("data-morphtime");
    }
    options.time = options.time || defaultOptions.time;

    /* Interval between frames */
    defaultOptions.intervalDelay = 25;
    if (options.el.getAttribute("data-morphintervaldelay")) {
        defaultOptions.intervalDelay = options.el.getAttribute("data-morphintervaldelay");
    }
    options.intervalDelay = options.intervalDelay || defaultOptions.intervalDelay;

    /* Float number */
    defaultOptions.isFloat = false;
    if (options.el.getAttribute("data-morphisfloat")) {
        defaultOptions.isFloat = !!options.el.getAttribute("data-morphisfloat");
    }
    options.isFloat = options.isFloat || defaultOptions.isFloat;

    /* Number of decimals if float */
    defaultOptions.nbDecimals = 2;
    if (options.el.getAttribute("data-morphnbdecimals")) {
        defaultOptions.nbDecimals = options.el.getAttribute("data-morphnbdecimals");
    }
    options.nbDecimals = options.nbDecimals || defaultOptions.nbDecimals;

    // Final value
    if (!options.finalValue) {
        if (options.el.getAttribute("data-finalvalue")) {
            options.finalValue = options.el.getAttribute("data-finalvalue");
        }
        else {
            options.finalValue = options.el.innerHTML;
        }
    }
    if (options.isFloat) {
        options.finalValue = parseFloat(options.finalValue, 10).toFixed(options.nbDecimals);
    }
    else {
        options.finalValue = parseInt(options.finalValue, 10);
    }

    // Get values
    intervalValue = options.finalValue / (options.time / options.intervalDelay);
    startValue = 0;

    // Set content to 0
    options.el.innerHTML = 0;

    // Launch Counter incrementation
    interval = setInterval(function set_frame_value() {
        startValue += intervalValue;
        if (options.isFloat) {
            options.el.innerHTML = startValue.toFixed(options.nbDecimals);
        }
        else {
            options.el.innerHTML = Math.ceil(startValue);

        }
    }, options.intervalDelay);

    setTimeout(function set_final_value() {
        // Stop counter
        clearInterval(interval);
        // Set content to final value
        options.el.innerHTML = options.finalValue;
    }, options.time);
};
