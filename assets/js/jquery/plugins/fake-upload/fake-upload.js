/*
 * Plugin Name: Fake Upload
 * Version: 1.6.0
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

        var _pluginID = 'FakeUpload'.toLowerCase(),
            _dataPlugin = 'plugin_' + _pluginID;

        var FakeUpload = {
            defaultSettings: {
                defaultClass: 'fake-upload-default-txt',
                defaultTxt: 'Browse ...',
                fakeButtonClass: 'cssc-button',
                hasFakeButton: 0,
                hasFakeButtonTxt: 'Choose a file',
                hasImgPreview: 0,
                imgPreviewBg: 0,
                imgPreviewClass: 'cssc-imgpreview',
                imgPreviewEl: 0,
            },
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                if (!el.get(0) || el.hasClass('has-fakeupload') || el.attr('type') != 'file') {
                    return;
                }
                this.el.addClass('has-fakeupload');
                this.advancedupload = this.isAdvancedUpload();
                this.setWrapper();
                this.setEvents();
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);

                try {
                    // Obtain settings from attribute
                    var tmpDataSettings = JSON.parse(this.el.attr('data-fakeupload-settings'));
                    if (typeof tmpDataSettings == 'object') {
                        this.settings = $.extend(true, {}, this.settings, tmpDataSettings);
                    }
                }
                catch (e) {}

            },
            // Set wrappers elements
            setWrapper: function() {
                var self = this,
                    settings = self.settings;
                this.wrapper = $('<div class="fakeupload-wrapper fakeupload-wrapper--jq"></div>');
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

                /* Image preview */
                if (settings.hasImgPreview) {
                    this.el.attr('accept', 'image/*');
                    this.wrapper.addClass('has-fake-image');
                    if (settings.imgPreviewEl) {
                        this.imgPreview = settings.imgPreviewEl;
                    }
                    else {
                        this.wrapper.addClass('has-fake-image--default');
                        this.imgPreview = $('<div class="fakeupload-imgpreview ' + settings.imgPreviewClass + '"></div>');
                        this.wrapper.append(this.imgPreview);
                    }
                }
            },
            setEvents: function() {
                var self = this,
                    settings = self.settings;
                // Change the displayed file name
                this.el.on('change', function() {
                    var $obj = this;
                    var newValue = $($obj).val().replace('C:\\fakepath\\', '');
                    if (typeof $obj.files == 'object' && $obj.files.length > 0) {
                        newValue = Object.keys($obj.files).map(function(obj) {
                            return $obj.files[obj].name;
                        }).join(', ');
                    }
                    if (newValue === '') {
                        self.setDefaultStatus();
                    }
                    else {
                        self.cover.html(newValue).removeClass(settings.defaultClass);
                        $.proxy(self.setImagePreview, self)();
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
            setImagePreview: function() {
                var self = this,
                    settings = self.settings;
                if (!this.settings.hasImgPreview || !self.advancedupload) {
                    return;
                }
                // Empty preview
                self.imgPreview.html('');
                var reader = new FileReader();
                if (!settings.imgPreviewBg) {
                    var imgItem = $('<img src="#" />');
                }

                // Get loaded data and insert thumbnail.
                reader.onload = function(e) {
                    if (!settings.imgPreviewBg) {
                        imgItem.attr('src', e.target.result);
                        self.imgPreview.append(imgItem);
                    }
                    else {
                        self.imgPreview.css('background-image', 'url(' + e.target.result + ')');
                    }
                };

                // Read the image file as a data URL.
                reader.readAsDataURL(self.el.get(0).files[0]);
            },
            setDefaultStatus: function() {
                var self = this,
                    settings = self.settings;
                if (!this.cover.hasClass(settings.defaultClass)) {
                    this.cover.addClass(settings.defaultClass);
                    this.cover.html(settings.defaultTxt);
                }
                if (this.imgPreview) {
                    this.imgPreview.html('').attr('style', '');
                }
            },
            isAdvancedUpload: function() {
                var div = document.createElement('div');
                return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            }
        };
        $.fn.FakeUpload = function(params) {
            this.each(function() {
                var $this = $(this);
                if (!$this.hasClass(_dataPlugin)) {
                    $.extend(true, {}, FakeUpload).init($this, params);
                    $this.addClass(_dataPlugin);
                }
            });
            return this;
        };
    })(jQuery);
}
