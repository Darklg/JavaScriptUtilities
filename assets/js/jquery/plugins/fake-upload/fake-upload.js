/*
 * Plugin Name: Fake Upload
 * Version: 1.2.1
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
        'use strict';
        var FakeUpload = {
            defaultSettings: {
                defaultClass: 'fake-upload-default-txt',
                defaultTxt: 'Browse ...',
                fakeButtonClass: 'cssc-button',
                hasFakeButton: 0,
                hasFakeButtonTxt: 'Choose a file',
            },
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                if (el.hasClass('has-fakeupload') || el.attr('type') != 'file') {
                    return;
                }
                this.el.addClass('has-fakeupload');
                this.setWrapper();
                this.setEvents();
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            // Set wrappers elements
            setWrapper: function() {
                var self = this,
                    settings = self.settings;
                this.wrapper = $('<div class="fakeupload-wrapper"></div>');
                this.cover = $('<div class="fakeupload-cover"></div>');
                this.setDefaultStatus();
                this.el.attr('size', 100);
                this.el.wrap(this.wrapper);
                this.wrapper = this.el.parent();
                this.wrapper.append(this.cover);

                /* Fake button */
                if (settings.hasFakeButton) {
                    this.fakeButton = $('<div class="fakeupload-button ' + settings.fakeButtonClass + '"></div>');
                    this.fakeButton.html(settings.hasFakeButtonTxt);
                    this.wrapper.append(this.fakeButton);
                    this.wrapper.addClass('has-fake-button');
                }
            },
            setEvents: function() {
                var self = this,
                    settings = self.settings;
                // Change the shown file name
                this.el.on('change', function() {
                    var newValue = $(this).val().replace('C:\\fakepath\\', '');
                    if (newValue === '') {
                        self.setDefaultStatus();
                    }
                    else {
                        self.cover.html(newValue).removeClass(settings.defaultClass);
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
                this.wrapper.on('mouseleave', function() {
                    $(this).children('input').css({
                        'top': 0,
                        'right': 0
                    });
                });
            },
            setDefaultStatus: function() {
                var self = this,
                    settings = self.settings;
                if (!this.cover.hasClass(settings.defaultClass)) {
                    this.cover.addClass(settings.defaultClass);
                    this.cover.html(settings.defaultTxt);
                }
            }
        };
        $.fn.FakeUpload = function(params) {
            this.each(function() {
                var $this = $(this),
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