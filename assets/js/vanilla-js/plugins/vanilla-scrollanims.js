/*
 * Plugin Name: Vanilla-JS Scroll Animations
 * Version: 0.2
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
            offsetY: -100
        };

        if (typeof opt != 'object') {
            return options;
        }

        if (opt.offsetY && isNumber(opt.offsetY)) {
            options.offsetY = parseInt(opt.offsetY, 10);
        }

        return options;
    };

    this.getItems = function(items) {
        var finalItems = [];
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i]) {
                finalItems.push({
                    el: items[i],
                    isVisible: 0
                });
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

        // Add data active
        setTimeout(function() {
            item.el.setAttribute('data-active', '1');
            item.isActive = 1;
        }, delay);
    };

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

    /* ----------------------------------------------------------
      Launch
    ---------------------------------------------------------- */

    return this.init(items, opt);
};