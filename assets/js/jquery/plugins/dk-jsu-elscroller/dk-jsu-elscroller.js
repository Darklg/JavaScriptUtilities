/*
 * Plugin Name: Scroller
 * Version: 0.1
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
            defaultSettings: {},
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.listLeft = 0;
                this.getSettings(settings);
                this.setElements();
                this.setValues();
                this.setEvents();
                this.minLeft = 0;
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
                var self = this;
                self.wrapper = self.el.find('[data-floating="wrapper"]');
                self.list = self.el.find('[data-floating="list"]');
                self.navi = self.el.children('a[rel]');
            },
            setValues: function() {
                var self = this,
                    listChildren = self.list.children(),
                    lastChild = listChildren.last(),
                    itemWidth = lastChild.width();
                // List width
                self.listWidth = lastChild.position().left + itemWidth;
                // Min left
                if (self.listWidth > self.wrapper.width()) {
                    self.minLeft = self.wrapper.width() - self.listWidth;
                }
                // Scroll amount
                self.scrollAmount = listChildren.eq(1).position().left;
                // Ensure min left
                self.setListLeft(0);

            },
            // Setting events
            setEvents: function() {
                var self = this;
                // Change value on resize
                jQuery(window).resize(function() {
                    self.setValues();
                });
                // Set navigation
                self.navi.on('click', function(e) {
                    e.preventDefault();
                    var rel = jQuery(this).attr('rel'),
                        newLeft = self.listLeft;
                    if (rel == 'next') {
                        newLeft = newLeft - self.scrollAmount;
                    }
                    else {
                        newLeft = newLeft + self.scrollAmount;
                    }
                    self.goToLeft(newLeft);
                });
            },
            goToLeft: function(left) {
                var self = this;
                left = left ||  0;
                if (left > 0) {
                    left = 0;
                }
                if (left < self.minLeft) {
                    left = self.minLeft;
                }
                this.setListLeft(left);
            },
            setListLeft: function(left) {
                var self = this;
                self.listLeft = left;
                self.list.animate({
                    'left': left
                }, 200);
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