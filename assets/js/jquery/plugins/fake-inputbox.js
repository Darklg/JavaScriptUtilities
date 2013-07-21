/*
 * Plugin Name: Fake Input Box
 * Version: 1.0
 * JavaScriptUtilities Fake Input Box may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Input Box
---------------------------------------------------------- */

/*
jQuery('.fakeinputbox-me').fakeInputBox();
*/

if (!jQuery.fn.fakeInputBox) {
    (function($, window, document) {
        // Main Class
        var fakeInputBox = {
            defaultSettings: {},
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                this.setElements();
                this.setEvents();
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            // Creating & setting elements
            setElements: function() {
                var self = this,
                    settings = this.settings;

                // Getting element type
                this.elType = this.el.attr('type');
                this.elName = this.el.attr('name');

                // Set wrapper
                this.wrapper = jQuery('<span class="fake-inputbox-wrapper"></span>');
                this.wrapper.css({
                    'position': 'relative',
                    'overflow': 'hidden'
                });
                this.el.css({
                    'position': 'absolute',
                    'top': '0',
                    'left': '0'
                });
                this.el.wrap(this.wrapper);
                this.wrapper = this.el.parent();
            },
            // Setting events
            setEvents: function() {
                var self = this,
                    settings = this.settings;
                self.setCSSClass();

                if (this.elType == 'radio') {
                    $('[name=' + this.elName + ']').on('change', function() {
                        self.setCSSClass();
                    });
                }
                else {
                    this.el.on('change', function() {
                        self.setCSSClass();
                    });
                }
            },
            setCSSClass: function() {
                if (this.el.is(":checked")) {
                    this.wrapper.addClass('is-checked');
                }
                else {
                    this.wrapper.removeClass('is-checked');
                }
            }
        };
        // Using the fakeInputBox class as a jQuery plugin
        $.fn.fakeInputBox = function(settings) {
            this.each(function() {
                var $this = $(this),
                    dataPlugin = 'plugin_fakeInputBox'.toLowerCase();
                // Handling duplicate calls
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, fakeInputBox).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}