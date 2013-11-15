/*
 * Plugin Name: Fake Select
 * Version: 1.3.1
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
        var FakeSelect = {
            dataPlugin: 'plugin_fakeselect',
            defaultSettings: {
                'CSSClasses': ''
            },
            defaultStyles: {
                'position': 'absolute',
                'top': 0,
                'left': 0
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
                this.wrapper.css({
                    'position': 'relative'
                });
                this.el.css(this.defaultStyles).css({
                    'opacity': '0.01',
                    'filter': 'alpha(opacity=1)',
                    'z-index': 2,
                    '-webkit-appearance': 'menulist-button',
                    'padding': 0,
                    'margin': 0,
                    'width': '100%'
                });
                this.cover = $('<div class="fakeselect-cover"></div>');
                this.cover.css(this.defaultStyles);
                this.cover.css({
                    'z-index': 1,
                    'right': 0
                });
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