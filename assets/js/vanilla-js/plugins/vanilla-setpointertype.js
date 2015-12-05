/*
 * Plugin Name: Vanilla Set Pointer Type
 * Version: 0.1
 * Description: Add a data attribute on body to use on multiple inputs screens (using touch & mouse)
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla Set Pointer Type may be freely distributed under the MIT license.
 */


var dkJSUSetPointerType = function() {
    var pointerType = '';
    function init() {
        setPointer('mouse');
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            setPointer('touch');
        }
        window.addEventListener('touchstart', function() {
            setPointer('touch');
        });
        window.addEventListener('mousemove', function() {
            setPointer('mouse');
        });
    }

    function setPointer(pType) {
        if (pType == pointerType) {
            return;
        }
        document.body.setAttribute('data-pointertype', pType);
        pointerType = pType;
    }
    init();
};
