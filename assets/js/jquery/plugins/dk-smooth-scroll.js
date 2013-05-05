/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Smooth Scroll
   ------------------------------------------------------- */

/*
jQuery('[href^=#]').dkSmoothScroll();
*/

if (!jQuery.fn.dkSmoothScroll) {
    (function($) {
        var dkSmoothScroll = {
            init : function(el){
                this.el = el;
                this.el.on('click', function(e){
                    var _this = jQuery(this),
                        href = _this.attr('href'),
                        target = jQuery(href);
                    if(target.length > 0){
                        e.preventDefault();
                        var offsettop = target.offset().top;
                        jQuery('html, body').animate({
                            'scrollTop': offsettop
                        }, 500);
                    }
                });
            }
        };
        $.fn.dkSmoothScroll = function() {
            this.each(function() {
                $.extend({},dkSmoothScroll).init($(this));
            });
            return this;
        };
    })(jQuery);
}