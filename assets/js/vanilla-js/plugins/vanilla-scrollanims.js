/*
 * Plugin Name: Vanilla-JS Scroll Animations
 * Version: 0.5
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/*
 * var scrollItems = document.querySelectorAll('img[height]');
 * var scrollAnim = new dkJSUScrollAnims(scrollItems, {});
 */

var dkJSUScrollAnims = function(items, opt) {
    'use strict';

    var self = this;

    if (!document.addEventListener || !items || !window.hasOwnProperty('innerHeight')) {
        return false;
    }

    this.isParsing = false;
    this.opt = {};
    this.items = [];

    /* ----------------------------------------------------------
      Init plugin
    ---------------------------------------------------------- */

    this.init = function(items, opt) {

        // Get options
        this.opt = this.getOptions(opt);

        // Build list
        this.items = this.getItems(items);

        // Set item positions
        this.resetItemPositions();

        // Init events
        this.setEvents();

        return this;
    };

    /* ----------------------------------------------------------
      Set items & options
    ---------------------------------------------------------- */

    this.getOptions = function(opt) {
        var options = {
            offsetY: -100,
            attributeName: 'active'
        };

        if (typeof opt != 'object') {
            return options;
        }

        if (opt.offsetY && isNumber(opt.offsetY)) {
            options.offsetY = parseInt(opt.offsetY, 10);
        }

        if (opt.attributeName) {
            options.attributeName = opt.attributeName;
        }

        return options;
    };

    this.getItems = function(items) {
        var finalItems = [],
            tmpItem,
            ii,
            sublen;

        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i]) {
                tmpItem = {
                    el: items[i],
                    isVisible: 0
                };

                if (items[i].getAttribute('data-usechildren') && items[i].getAttribute('data-usechildren') == '1' && items[i].hasChildNodes()) {
                    tmpItem.children = items[i].children;
                    // Use a special selector for children if specified
                    if (items[i].getAttribute('data-childselector')) {
                        tmpItem.children = items[i].querySelectorAll(items[i].getAttribute('data-childselector'));
                    }
                }

                finalItems.push(tmpItem);
            }
        }
        return finalItems;
    };

    this.getPositionForItem = function(item) {
        return item.getBoundingClientRect();
    };

    /* ----------------------------------------------------------
      Events
    ---------------------------------------------------------- */

    /* Set all events */
    this.setEvents = function() {
        self.scrollEvent();
        document.addEventListener('scroll', self.scrollEvent);
        window.addEventListener('resize', self.resizeEvent);
        window.addEventListener('load', self.resizeEvent);
    };

    this.deleteEvents = function() {
        document.removeEventListener('scroll', self.scrollEvent);
        window.removeEventListener('resize', self.resizeEvent);
        window.removeEventListener('load', self.resizeEvent);
    };

    this.scrollEvent = function() {
        // Get top border
        var border = window.innerHeight + window.pageYOffset + self.opt.offsetY;

        // Set active items
        self.setActiveItems(border);
    };

    this.resizeEvent = function() {
        // Parse inactive items and change their top position
        self.resetItemPositions();

        // Launch scroll event
        self.scrollEvent();
    };

    /* ----------------------------------------------------------
      Actions on items
    ---------------------------------------------------------- */

    this.triggerItem = function(item) {

        // Get animation delay on item
        var delay = 0;
        if (item.el.getAttribute('data-delay') && isNumber(item.el.getAttribute('data-delay'))) {
            delay = parseInt(item.el.getAttribute('data-delay'), 10);
        }

        if (item.children) {
            // Activate each children with a delay
            for (var i = 0, len = item.children.length; i < len; i++) {
                self.activateElement(item.children[i], i * delay);
            }
        }
        else {
            self.activateElement(item.el, delay);
        }

    };

    // Set Activate item
    this.activateElement = function(el, delay) {
        setTimeout(function() {
            el.setAttribute('data-' + self.opt.attributeName, '1');
            triggerEvent(el, 'activescrollanim');
        }, delay);
    }

    /* Set active items */
    this.setActiveItems = function(border) {
        if (self.isParsing) {
            return false;
        }
        self.isParsing = true;

        var hasVisible = false;

        for (var i = 0, len = self.items.length; i < len; i++) {
            if (self.items[i].isVisible === 0) {
                hasVisible = true;
                // Item active
                if (self.items[i].top < border) {
                    // Trigger item actions
                    self.triggerItem(self.items[i]);
                    // Remove from list
                    self.items[i].isVisible = 1;
                }
            }
        }

        if (!hasVisible) {
            self.deleteEvents();
        }

        self.isParsing = false;

    };

    /* Reset item positions */
    this.resetItemPositions = function() {
        var tmpPos,
            tmpOff;
        for (var i = 0, len = self.items.length; i < len; i++) {
            tmpPos = self.getPositionForItem(self.items[i].el);
            self.items[i].top = tmpPos.top + window.pageYOffset;
            tmpOff = self.items[i].el.getAttribute('data-offset');
            if (isNumber(tmpOff)) {
                self.items[i].top -= parseInt(tmpOff, 10);
            }
        }
    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function triggerEvent(el, eventName, parameters) {
        var e = false;
        parameters = parameters || {};
        if (document.createEventObject) {
            e = document.createEventObject();
            e.button = 1;
            e.jsuparams = parameters;
            return el.fireEvent("on" + eventName, e);
        }
        else {
            e = document.createEvent("HTMLEvents");
            e.initEvent(eventName, true, false);
            e.jsuparams = parameters;
            return el.dispatchEvent(e);
        }
    };

    /* ----------------------------------------------------------
      Launch
    ---------------------------------------------------------- */

    return this.init(items, opt);
};