/*
 * Plugin Name: Toggle
 * Version: 0.1
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
                this.el = el;
                this.setToggler();
                this.setEvents();
            },
            setToggler: function() {
                this.elTarget = this.el.parent();
                if (this.el.data('dkjsutoggle-closest')) {
                    this.elTarget = this.el.closest(this.el.data('dkjsutoggle-closest'));
                }
                this.toggleClass = 'is-active';
            },
            // Setting events
            setEvents: function() {
                var self = this;
                self.el.on('click', function(e) {
                    e.preventDefault();
                    self.elTarget.toggleClass(self.toggleClass);
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