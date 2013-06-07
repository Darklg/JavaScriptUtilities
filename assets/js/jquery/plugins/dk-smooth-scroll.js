/*
 * Plugin Name: Smooth Scroll
 * Version: 1.3
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
            defaultSettings: {
                duration: 500
            },
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                this.setEvents();
            },
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            setEvents: function() {
                var settings = this.settings;
                this.el.on('click', function(e) {
                    var href = jQuery(this).attr('href'),
                        target = jQuery(href);
                    if (target.length > 0) {
                        e.preventDefault();
                        var offsettop = target.offset().top;
                        jQuery('html, body').animate({
                            'scrollTop': offsettop
                        }, settings.duration);
                    }
                });
            }
        };
        $.fn.dkSmoothScroll = function(settings) {
            this.each(function() {
                var $this = jQuery(this),
                    dataPlugin = 'plugin_dkSmoothScroll'.toLowerCase();
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, dkSmoothScroll).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery);
}