/*
 * Plugin Name: Vanilla-JS Hybrid Screens
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Detect touch / mouse hybrid screens
---------------------------------------------------------- */

var vanillaDetectHybridScreens = function() {
    'use strict';
    var currentScreenMode = '',
        lastDetection = '';

    window.addEventListener('click', function() {
        lastDetection = 'click';
    }, false);

    window.addEventListener('mousemove', function() {
        if (currentScreenMode == 'mouse') {
            return;
        }
        /* log only after two consecutive mousemove events to avoid touch emulation */
        if (lastDetection == 'mouse') {
            setCurrentScreenMode('mouse');
        }
        lastDetection = 'mouse';
    }, false);
    window.addEventListener('touchstart', function() {
        if (currentScreenMode == 'touch') {
            return;
        }
        setCurrentScreenMode('touch');
        lastDetection = 'touch';
    }, false);

    function setCurrentScreenMode(mode) {
        currentScreenMode = mode;
        document.body.setAttribute('data-inputmode', mode);
    }
};
