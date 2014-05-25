/*
 * Plugin Name: Vanilla Sticky
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Sticky may be freely distributed under the MIT license.
 * Usage status: Work in progress
 */

/*
 * Kill element margins & padding
 */

var vanillaSticky = function(el, options) {

    var origElTop = el.offsetTop,
        maxScroll = false,
        maxTop = false,
        wrapper = false,
        createParent = false;

    if (!("addEventListener" in window)) {
        return;
    }

    function init() {
        // Set initial style
        el.style.position = 'relative';

        if (options.stickyParent) {
            options.stickyParent.style.position = 'relative';
            maxTop = options.stickyParent.clientHeight - el.clientHeight;
            maxScroll = options.stickyParent.offsetTop + maxTop;
        }

        // Create parent node to avoid layout change
        wrapper = document.createElement('div');
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.style.minHeight = wrapper.clientHeight + 'px';

        // Launch events
        events();
    }

    function events() {
        // Scroll event
        if (window.addEventListener) {
            window.addEventListener('scroll', listenScroll);
        }
        else if (window.attachEvent) {
            window.attachEvent("onscroll", listenScroll);
        }
    }

    function listenScroll() {
        // Fix element if over body scrolltop
        if (maxScroll !== false && document.body.scrollTop > maxScroll) {
            el.style.top = maxTop + 'px';
            el.style.position = 'absolute';
        }
        else if (document.body.scrollTop > origElTop) {
            el.style.top = 0 + 'px';
            el.style.position = 'fixed';
        }
        else {
            el.style.top = 0 + 'px';
            el.style.position = 'relative';
        }
    }

    init();
};