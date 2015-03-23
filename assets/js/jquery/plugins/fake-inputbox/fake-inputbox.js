/*
 * Plugin Name: Fake Input Box
 * Version: 1.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
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
            defaultSettings: {
                wrapperCSSClass: 'fake-inputbox-wrapper',
                coverCSSClass: 'fake-inputbox-cover'
            },
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                // If double launch : reload wrapper class
                if (el.hasClass('has-fake-inputbox')) {
                    this.wrapper = el.closest('.' + this.settings.wrapperCSSClass);
                    this.setCSSClass();
                    return;
                }
                el.addClass('has-fake-inputbox');
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
                this.wrapper = jQuery('<span class="' + settings.wrapperCSSClass + '"></span>');
                this.wrapper.css({
                    'position': 'relative',
                    'overflow': 'hidden'
                });
                // Set cover
                this.cover = jQuery('<span class="' + settings.coverCSSClass + '"></span>');

                this.el.css({
                    'position': 'absolute',
                    'top': '0',
                    'left': '0'
                });
                this.el.wrap(this.wrapper);
                this.wrapper = this.el.parent();
                this.wrapper.prepend(this.cover);

                // Specific types
                this.wrapper.addClass('fake-inputbox-' + this.elType);

            },
            // Setting events
            setEvents: function() {
                var self = this,
                    settings = this.settings;
                self.setCSSClass();
                
                self.el.on('focus', function() {
                    self.wrapper.addClass('has-focus');
                }).on('blur', function() {
                    self.wrapper.removeClass('has-focus');
                });

                self.el.on('focus', function() {
                    self.wrapper.addClass('has-focus');
                }).on('blur', function() {
                    self.wrapper.removeClass('has-focus');
                });

                self.el.on('mousedown', function() {
                    self.wrapper.addClass('is-active');
                }).on('mouseup', function() {
                    self.wrapper.removeClass('is-active');
                });

                if (this.elType == 'radio') {
                    $('[name="' + this.elName + '"]').on('change', function() {
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
                $.extend(true, {}, fakeInputBox).init($(this), settings);
            });
            return this;
        };
    })(jQuery, window, document);
}
