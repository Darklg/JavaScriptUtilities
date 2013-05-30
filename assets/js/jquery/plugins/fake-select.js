/*
 * Plugin Name: Fake Select
 * Version: 1.0.1
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
                if (el.data('fakeselect') != 1 && el.get(0).tagName.toLowerCase() == 'select') {
                    el.data('fakeselect', 1);
                    this.getOptions(opt);
                    this.setWrapper();
                    this.setEvents();
                }
            },
            getOptions: function(opt) {
                this.opt = $.extend({}, this.defaultOptions, opt);
            },
            setWrapper: function() {
                var mthis = this,
                    opt = this.opt;
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
                var mthis = this;
                this.setValue();
                this.el.on('change', function() {
                    mthis.setValue();
                });
            },
            setValue: function() {
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