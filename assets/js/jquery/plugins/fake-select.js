/*
 * Plugin Name: Fake Select
 * Version: 1.1.1
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
            defaultOptions: {
                'CSSClasses': ''
            },
            defaultStyles: {
                'position': 'absolute',
                'top': 0,
                'left': 0
            },
            init: function(el, settings) {
                this.el = el;
                if (el.get(0).tagName.toLowerCase() == 'select') {
                    this.getSettings(settings);
                    this.setWrapper();
                    this.setEvents();
                }
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
                this.cover.html(this.el.children(':selected').text());
            }
        };
        $.fn.FakeSelect = function(settings) {
            this.each(function() {
                var $this = jQuery(this),
                    dataPlugin = 'plugin_FakeSelect'.toLowerCase();
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, FakeSelect).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery);
}