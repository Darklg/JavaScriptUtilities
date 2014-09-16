/*
 * Plugin Name: Fake Upload
 * Version: 1.1
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
            opt: {
                hasFakeButton: 0,
                hasFakeButtonTxt: 'Choose a file',
            },
            defaultTxt: 'Browse ...',
            defaultClass: 'fake-upload-default-txt',
            init: function(el, params) {
                this.el = el;
                this.getParams(params);
                if (this.el.hasClass('has-fakeupload')) {
                    return;
                }
                this.el.addClass('has-fakeupload');
                if (this.el.attr('type') == 'file') {
                    this.setWrapper();
                    this.setEvents();
                }
            },
            // Get options from user init
            getParams: function(params) {
                this.params = params;
                if (typeof params != 'object') {
                    return;
                }
                if (params.defaultTxt) {
                    this.defaultTxt = params.defaultTxt;
                }
                if (params.hasFakeButton) {
                    this.opt.hasFakeButton = params.hasFakeButton;
                }
                if (params.hasFakeButtonTxt) {
                    this.opt.hasFakeButtonTxt = params.hasFakeButtonTxt;
                }
            },
            // Set wrappers elements
            setWrapper: function() {
                this.wrapper = $('<div class="fakeupload-wrapper"></div>');
                this.cover = $('<div class="fakeupload-cover"></div>');
                this.setDefaultStatus();
                this.el.attr('size', 100);
                this.el.wrap(this.wrapper);
                this.wrapper = this.el.parent();
                this.wrapper.append(this.cover);

                /* Fake button */
                if (this.opt.hasFakeButton) {
                    this.fakeButton = jQuery('<div class="fakeupload-button cssc-button"></div>');
                    this.fakeButton.html(this.opt.hasFakeButtonTxt);
                    this.wrapper.append(this.fakeButton);
                    this.wrapper.addClass('has-fake-button');
                }
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