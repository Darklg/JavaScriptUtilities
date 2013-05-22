/*
 * Plugin Name: Smooth Scroll
 * Version: 1.1
 * JavaScriptUtilities Smooth Scroll may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Smooth Scroll
---------------------------------------------------------- */

/*
jQuery('[href^=#]').dkSmoothScroll({
    duration: 500
});
*/

if (!jQuery.fn.dkSmoothScroll) {
    (function($) {
        var dkSmoothScroll = {
            params: {
                duration: 500
            },
            init: function(el, params) {
                this.el = el;
                this.setParams(params);
                this.setEvents();
            },
            setParams: function(params) {
                this.params = $.extend({}, this.params, params);
            },
            setEvents: function() {
                var mthis = this;
                this.el.on('click', function(e) {
                    var _this = jQuery(this),
                        params = this.params,
                        href = _this.attr('href'),
                        target = jQuery(href);
                    if (target.length > 0) {
                        e.preventDefault();
                        var offsettop = target.offset().top;
                        jQuery('html, body').animate({
                            'scrollTop': offsettop
                        }, mthis.params.duration);
                    }
                });
            }
        };
        $.fn.dkSmoothScroll = function(params) {
            this.each(function() {
                $.extend({}, dkSmoothScroll).init($(this), params);
            });
            return this;
        };
    })(jQuery);
}