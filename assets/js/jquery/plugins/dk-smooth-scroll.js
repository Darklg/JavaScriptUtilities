/*
 * Plugin Name: Smooth Scroll
 * Version: 1.1.2
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
            opt: {
                duration: 500
            },
            init: function(el, opt) {
                this.el = el;
                this.getOptions(opt);
                this.setEvents();
            },
            getOptions: function(opt) {
                this.opt = $.extend(true, {}, this.opt, opt);
            },
            setEvents: function() {
                var opt = this.opt;
                this.el.on('click', function(e) {
                    var _this = jQuery(this),
                        href = _this.attr('href'),
                        target = jQuery(href);
                    if (target.length > 0) {
                        e.preventDefault();
                        var offsettop = target.offset().top;
                        jQuery('html, body').animate({
                            'scrollTop': offsettop
                        }, opt.duration);
                    }
                });
            }
        };
        $.fn.dkSmoothScroll = function(opt) {
            this.each(function() {
                var $this = jQuery(this),
                    dataPlugin = 'plugin_dkSmoothScroll';
                if (!$this.data(dataPlugin)) {
                    $this.data(dataPlugin, $.extend(true, {}, dkSmoothScroll).init($this, opt));
                }
            });
            return this;
        };
    })(jQuery);
}