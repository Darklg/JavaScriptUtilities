/*
 * Plugin Name: Vanilla Sticky
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Sticky may be freely distributed under the MIT license.
 * Usage status: Work in progress
 */

var vanillaSticky = function(el, options) {

    var origElTop = el.offsetTop,
        maxScroll = false,
        maxTop = false,
        wrapper = false,
        createParent = false;

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
        launchEvents();
    }

    function launchEvents() {
        // Scroll event
        if (window.addEventListener) {
            window.addEventListener('scroll', listenScroll);
        }
        else if (window.attachEvent) {
            window.attachEvent("onscroll", listenScroll);
        }
    }

    function listenScroll() {
        var scrollTop = getBodyScrollTop();

        // Force element to stay into his container
        if (maxScroll !== false && scrollTop > maxScroll) {
            el.style.top = maxTop + 'px';
            el.style.position = 'absolute';
            return 0;
        }

        // Element is fixed if window scroll is over its offset.
        if (scrollTop > origElTop) {
            el.style.top = 0 + 'px';
            el.style.position = 'fixed';
        }
        else {
            el.style.top = 0 + 'px';
            el.style.position = 'relative';
        }
    }

    function getBodyScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    init();
};