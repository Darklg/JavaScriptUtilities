/*
 * Plugin Name: Fake Select
 * Version: 1.1
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Select
---------------------------------------------------------- */

/*
jQuery('select.fake-select').FakeSelect(options);
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
            init: function(el, opt) {
                this.el = el;
                if (el.get(0).tagName.toLowerCase() == 'select') {
                    this.getOptions(opt);
                    this.setWrapper();
                    this.setEvents();
                }
            },
            getOptions: function(opt) {
                this.opt = $.extend(true, {}, this.defaultOptions, opt);
            },
            setWrapper: function() {
                var opt = this.opt;
                this.wrapper = $('<div class="fakeselect-wrapper ' + opt.CSSClasses + '"></div>');
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
                this.el.on('keyup change', function() {
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
        $.fn.FakeSelect = function(opt) {
            this.each(function() {
                var $this = jQuery(this),
                    dataPlugin = 'plugin_FakeSelect'.toLowerCase();
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, FakeSelect).init($this, opt);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery);
}
