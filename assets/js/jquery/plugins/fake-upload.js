/*
 * Plugin Name: Fake Upload
 * Version: 1.0.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Upload may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Upload
---------------------------------------------------------- */

/*
jQuery('input.fake-upload').FakeUpload({
    defaultTxt : 'Browse ...'
});
*/

if (!jQuery.fn.FakeUpload) {
    (function($) {
        var FakeUpload = {
            defaultTxt: 'Browse ...',
            defaultClass: 'fake-upload-default-txt',
            defaultStyles: {
                'cursor': 'pointer',
                'position': 'absolute',
                'top': 0,
                'right': 0
            },
            init: function(el, params) {
                this.el = el;
                this.getParams(params);
                if (this.el.attr('type') == 'file') {
                    this.setWrapper();
                    this.setEvents();
                }
            },
            // Get options from user init
            getParams: function(params) {
                this.params = params;
                if (params.defaultTxt) {
                    this.defaultTxt = params.defaultTxt;
                }
            },
            // Set wrappers elements
            setWrapper: function() {
                this.wrapper = $('<div class="fakeupload-wrapper"></div>');
                this.wrapper.css({
                    'cursor': 'pointer',
                    'overflow': 'hidden',
                    'position': 'relative'
                });
                this.cover = $('<div class="fakeupload-cover"></div>');
                this.cover.css(this.defaultStyles);
                this.setDefaultStatus();
                this.cover.css({
                    'left': 0,
                    'z-index': 1
                });
                this.el.attr('size', 100);
                this.el.css(this.defaultStyles);
                this.el.css({
                    'height': 100,
                    'z-index': 2,
                    'cursor': 'pointer',
                    'filter': 'alpha(opacity=01)',
                    'opacity': '0.01'
                });
                this.el.wrap(this.wrapper);
                this.wrapper = this.el.parent();
                this.wrapper.append(this.cover);
            },
            setEvents: function() {
                var self = this;
                // Change the shown file name
                this.el.on('change', function() {
                    var newValue = $(this).val().replace('C:\\fakepath\\', '');
                    if (newValue === '') {
                        self.setDefaultStatus();
                    }
                    else {
                        self.cover.html(newValue).removeClass(self.defaultClass);
                    }
                });
                // Move the input element for a good behavior
                this.wrapper.on('mousemove', function(e) {
                    var right = $(this).width() - Math.round(e.pageX - $(this).offset().left) - 10,
                        top = Math.round(e.pageY - $(this).offset().top) - 30;
                    $(this).children('input').css({
                        'top': top,
                        'right': right
                    });
                });
                // Reset position on leave
                this.wrapper.on('mouseleave', function(e) {
                    $(this).children('input').css({
                        'top': 0,
                        'right': 0
                    });
                });
            },
            setDefaultStatus: function() {
                if (!this.cover.hasClass(this.defaultClass)) {
                    this.cover.addClass(this.defaultClass);
                    this.cover.html(this.defaultTxt);
                }
            }
        };
        $.fn.FakeUpload = function(params) {
            this.each(function() {
                var $this = jQuery(this),
                    dataPlugin = 'plugin_FakeUpload'.toLowerCase();
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, FakeUpload).init($this, params);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery);
}