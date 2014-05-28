/*
 * Plugin Name: Vanilla Sticky
 * Version: 0.4
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Sticky may be freely distributed under the MIT license.
 * Usage status: Work in progress
 */

var vanillaSticky = function(el, options) {

    var origElTop = false,
        maxScroll = false,
        maxTop = false,
        wrapper = false;

    if (!options) {
        options = {};
    }

    function init() {

        // Set initial style
        el.style.position = 'relative';
        el.style.margin = '0';

        if (options.stickyParent) {
            options.stickyParent.style.position = 'relative';
        }

        // Create parent node to avoid layout change
        wrapper = document.createElement('div');
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        // Launch events
        launchEvents();
    }

    function calcScroll() {

        // Get element offset
        var refnode = el;
        origElTop = refnode.offsetTop;
        while (origElTop === 0) {
            refnode = refnode.parentNode;
            if (!refnode) {
                break;
            }
            origElTop = refnode.parentNode.offsetTop;
        }
        // Get parent scroll dimensions
        if (options.stickyParent) {
            maxTop = options.stickyParent.clientHeight - el.clientHeight;
            maxScroll = options.stickyParent.offsetTop + maxTop;
        }
        wrapper.style.minHeight = wrapper.clientHeight + 'px';
    }

    function launchEvents() {

        // Resize event
        calcScroll();
        // Scroll event
        listenScroll();

        if (window.addEventListener) {
            window.addEventListener('scroll', listenScroll);
            window.addEventListener('resize', calcScroll);
        }
        else if (window.attachEvent) {
            window.attachEvent("onscroll", listenScroll);
            window.attachEvent("onresize", calcScroll);
        }
    }

    function listenScroll() {
        var scrollTop = getBodyScrollTop(),
            topFixed = 0;
        if (options.offset) {
            topFixed += options.offset;
            scrollTop += options.offset;
        }

        // Force element to stay into his container
        if (maxScroll !== false && scrollTop > maxScroll) {
            el.style.top = maxTop + 'px';
            el.style.position = 'absolute';
            return 0;
        }

        // Force element top to 0
        el.style.top = 0 + 'px';

        // Element is fixed if window scroll is over its offset.
        if (scrollTop > origElTop) {
            el.style.position = 'fixed';
            el.style.top = topFixed + 'px';
        }
        else {
            el.style.position = 'relative';
        }
    }

    function getBodyScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    init();
};