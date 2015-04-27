/*
 * Plugin Name: Fake Select
 * Version: 1.5.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Select
---------------------------------------------------------- */

/*
jQuery('select.fake-select').FakeSelect(settings);
*/

if (!jQuery.fn.FakeSelect) {
    (function($) {
        'use strict';
        var FakeSelect = {
            dataPlugin: 'plugin_fakeselect',
            defaultSettings: {
                'CSSClasses': ''
            },
            init: function(el, opt) {
                this.el = el;
                if (el && el.get(0) && el.get(0).tagName.toLowerCase() !== 'select') {
                    return 0;
                }
                if (!el.hasClass(this.dataPlugin)) {
                    el.addClass(this.dataPlugin);
                    this.getSettings(opt);
                    this.setWrapper();
                    this.setEvents();
                }
                else {
                    this.cover = this.el.siblings('.fakeselect-cover');
                    this.wrapper = this.el.parent();
                }
                this.setValue();
            },
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            setWrapper: function() {
                var settings = this.settings;
                this.wrapper = $('<div class="fakeselect-wrapper ' + settings.CSSClasses + '"></div>');
                this.cover = $('<div class="fakeselect-cover"></div>');
                this.el.wrap(this.wrapper);
                this.wrapper = this.el.parent();
                this.wrapper.append(this.cover);
            },
            setEvents: function() {
                var self = this;
                this.setValue();
                this.el.on('change keyup keypress', function() {
                    self.setValue();
                });
                this.el.on('focus', function() {
                    self.wrapper.addClass('has-focus');
                }).on('blur', function() {
                    self.wrapper.removeClass('has-focus');
                });
            },
            setValue: function() {
                if (this.el.val() && this.el.val() !== '') {
                    this.wrapper.addClass('has-value');
                }
                this.wrapper.css('display', this.el.css('display'));
                this.cover.html(this.el.children(':selected').text());
            }
        };
        $.fn.FakeSelect = function(opt) {
            this.each(function() {
                $.extend(true, {}, FakeSelect).init($(this), opt);
            });
            return this;
        };
    })(jQuery);
}