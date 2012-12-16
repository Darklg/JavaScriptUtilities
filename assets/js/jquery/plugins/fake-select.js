/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Select
   ------------------------------------------------------- */

/*
jQuery('select.fake-select').FakeSelect();
*/

if(!jQuery.fn.FakeSelect) {
    (function($) {
        var FakeSelect = {
            defaultStyles: {
                'position': 'absolute',
                'top': 0,
                'left': 0
            },
            init: function(el) {
                this.el = el;
                if(el.data('fakeselect') != 1 || el.tagName.toLowerCase() != 'select') {
                    el.data('fakeselect', 1);
                    this.setWrapper();
                    this.setEvents();
                }
            },
            setWrapper: function() {
                var mthis = this;
                this.wrapper = $('<div class="fakeselect-wrapper"></div>');
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
                this.el.parent().append(this.cover);
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
        $.fn.FakeSelect = function() {
            this.each(function() {
                $.extend({}, FakeSelect).init($(this));
            });
            return this;
        };
    })(jQuery);
}