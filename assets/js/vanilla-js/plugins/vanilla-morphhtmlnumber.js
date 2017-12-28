/*
 * Plugin Name: Morph HTML Number
 * Version: 0.1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Morph HTML Number
---------------------------------------------------------- */

var morphHTMLNumber = function(options) {
    var finalValue, intervalValue, interval, startValue;
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
    options.time = options.time || 1500;
    options.intervalDelay = options.intervalDelay || 25;
    options.isFloat = options.isFloat || false;
    options.nbDecimals = options.nbDecimals || 2;

    // Final value
    if (!options.finalValue) {
        if (options.el.getAttribute("data-finalvalue")) {
            options.finalValue = options.el.getAttribute("data-finalvalue");
        }
        else {
            options.finalValue = options.el.innerHTML;
        }
        if (options.isFloat) {
            options.finalValue = parseFloat(options.finalValue, 10).toFixed(options.nbDecimals);
        }
        else {
            options.finalValue = parseInt(options.finalValue, 10);
        }
    }

    // Get values
    finalValue = options.finalValue;
    intervalValue = finalValue / (options.time / options.intervalDelay);
    startValue = 0;

    // Set content to 0
    options.el.innerHTML = 0;

    // Launch Counter incrementation
    interval = setInterval(function() {
        startValue += intervalValue;
        if (options.isFloat) {
            options.el.innerHTML = startValue.toFixed(options.nbDecimals);
        }
        else {
            options.el.innerHTML = Math.ceil(startValue);

        }
    }, options.intervalDelay);

    setTimeout(function() {
        // Stop counter
        clearInterval(interval);
        // Set content to final value
        options.el.innerHTML = finalValue;
    }, options.time);
};
