/*
 * Plugin Name: Lazy Load
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Lazy Load may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Lazy Load
---------------------------------------------------------- */

/*
 * jQuery('.images').lazyLoad();
 */

(function($) {
    'use strict';
    if ($.fn.lazyLoad) {
        return;
    }
    var lazyLoad = {
        defaultParams: {
            offsetTop: 100,
        },
        params: {},
        init: function(els, params) {
            this.els = els;
            this.getParams(params);
            this.setTop();
            this.parseImages();
            this.setEvents();
        },
        getParams: function(params) {
            this.params = $.extend(true, {}, this.defaultParams, params);
        },
        setEvents: function() {
            var self = this;
            $(window).on('scroll', function() {
                self.parseImages();
            }).on('resize', function() {
                self.setTop();
                self.parseImages();
            }).on('load', function() {
                self.parseImages();
            });
        },
        parseImages: function() {
            var top = this.winHeight + $('body').scrollTop() + this.params.offsetTop,
                self = this;
            self.els.each(function(i) {
                var $t = $(this),
                    src = $t.attr('data-src'),
                    imgtop = parseInt($t.attr('data-ll-top'), 10);
                if (imgtop && src && imgtop < top) {
                    self.els.splice(i, 1);
                    $t.attr('src', src);
                    $t.attr('data-src', '');
                }
            });
        },
        setTop: function() {
            this.winHeight = $(window).height();
            this.els.each(function() {
                var $this = $(this);
                $this.attr('data-ll-top', $this.offset().top);
            });
        }
    };
    $.fn.lazyLoad = function(params) {
        $.extend(true, {}, lazyLoad).init(this, params);
        return this;
    };
})(jQuery);