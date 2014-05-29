/*
 * Plugin Name: Toggle
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Toggle may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Toggle
---------------------------------------------------------- */

/*
 * jQuery('.selector').dkJSUToggle();
 */

if (!jQuery.fn.dkJSUToggle) {
    (function($, window, document) {
        // Main Class
        var dkJSUToggle = {
            init: function(el) {
                this.$body = $('body');
                this.isOpen = false;
                this.el = el;
                this.setToggler();
                this.setEvents();
            },
            setToggler: function() {
                this.elTarget = this.el.parent();
                if (this.el.data('jqtoggle-closest')) {
                    this.elTarget = this.el.closest(this.el.data('jqtoggle-closest'));
                }
                this.toggleClass = 'is-active';
            },
            // Setting events
            setEvents: function() {
                var self = this;
                // Toggle on click
                self.el.on('click', function(e) {
                    e.preventDefault();
                    self.elTarget.toggleClass(self.toggleClass);
                    self.isOpen = self.elTarget.hasClass(self.toggleClass);
                });
                // Close on outside click
                self.$body.on('click', function(e) {
                    if (self.isOpen && !self.el.is(e.target) && self.el.has(e.target).length === 0) {
                        self.elTarget.removeClass(self.toggleClass);
                        self.isOpen = false;
                    }
                });
            }
        };
        // Using the dkJSUToggle class as a jQuery plugin
        $.fn.dkJSUToggle = function() {
            this.each(function() {
                var $this = $(this),
                    dataPlugin = 'plugin_dkjsutoggle';
                // Handling duplicate calls
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, dkJSUToggle).init($this);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}