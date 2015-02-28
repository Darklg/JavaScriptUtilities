/*
 * Plugin Name: Scroller
 * Version: 0.2
 * Plugin URL: https: //github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Scroller may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Scroller
---------------------------------------------------------- */

/*
 * jQuery('.selector').dkJSUScroller();
 */

if (!jQuery.fn.dkJSUScroller) {
    (function($, window, document) {
        "use strict";
        // Main Class
        var dkJSUScroller = {
            defaultSettings: {
                animSpeed: 200,
                listLeft: 0,
                listSelector: '[data-floating="list"]',
                minLeft: 0,
                naviSelector: 'a[rel]',
                scrollAmount: 0,
                wrapperSelector: '[data-floating="wrapper"]',
            },
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                this.setElements();
                this.setEvents();
                this.setValues();
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            // Setting elements
            setElements: function() {
                var self = this,
                    settings = self.settings;
                self.wrapper = self.el.find(settings.wrapperSelector);
                self.list = self.el.find(settings.listSelector);
                self.navi = self.el.find(settings.naviSelector);
            },
            // Setting events
            setEvents: function() {
                var self = this,
                    settings = self.settings,
                    resizeTimeout = false;
                // Change value on resize
                jQuery(window).resize(function() {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(function() {
                        self.setValues();
                    }, 100);
                });
                // Set navigation
                self.navi.on('click', function(e) {
                    e.preventDefault();
                    var newLeft = settings.listLeft;
                    if (jQuery(this).attr('rel') == 'next') {
                        newLeft = newLeft - settings.scrollAmount;
                    }
                    else {
                        newLeft = newLeft + settings.scrollAmount;
                    }
                    self.goToLeft(newLeft);
                });
            },
            setValues: function() {
                var self = this,
                    settings = self.settings,
                    listChildren = self.list.children(),
                    lastChild = listChildren.last(),
                    itemWidth = lastChild.width();
                // List width
                self.listWidth = lastChild.position().left + itemWidth;
                // Min left
                if (self.listWidth > self.wrapper.width()) {
                    settings.minLeft = self.wrapper.width() - self.listWidth;
                }
                // Scroll amount
                if (listChildren.length > 1 && settings.scrollAmount === 0) {
                    settings.scrollAmount = listChildren.eq(1).position().left;
                }
                // Ensure min left
                self.goToLeft(0);
            },
            goToLeft: function(left) {
                var self = this,
                    settings = self.settings;
                left = left ||  0;
                if (left > 0) {
                    left = 0;
                }
                if (left < settings.minLeft) {
                    left = settings.minLeft;
                }
                settings.listLeft = left;
                self.list.animate({
                    'left': left
                }, settings.animSpeed);
            },
        };
        // Using the dkJSUScroller class as a jQuery plugin
        $.fn.dkJSUScroller = function(settings) {
            this.each(function() {
                var $this = $(this),
                    dataPlugin = 'plugin_dkjsuscroller';
                // Handling duplicate calls
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, dkJSUScroller).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}