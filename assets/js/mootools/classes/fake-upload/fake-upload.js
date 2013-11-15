/*
 * Plugin Name: Fake Upload
 * Version: 1.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Upload may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Upload
---------------------------------------------------------- */

/*
new FakeUpload($(element), {
    inputTxt : 'Browse ...'
});
*/

var FakeUpload = new Class({
    settings: {},
    defaultSettings: {
        inputTxt: 'Browse ...',
        inputClass: 'fake-upload-default-txt'
    },
    defaultStyles: {
        'cursor': 'pointer',
        'position': 'absolute',
        'top': 0,
        'right': 0
    },
    initialize: function(el, settings) {
        var self = this;
        if (!el) {
            return;
        }
        this.el = el;
        this.getSettings(settings);
        if (!el.get('data-fakeupload') || !el.get('type') || el.get('type') != 'file') {
            el.set('data-fakeupload', 1);
            self.setWrapper(el);
            self.setEvents(el);
        }
    },
    // Get settings from user init
    getSettings: function(settings) {
        if (typeof settings != 'object') {
            settings = {};
        }
        this.settings = Object.merge({}, this.defaultSettings, settings);
    },
    // Set wrappers elements
    setWrapper: function() {
        var self = this,
            el = this.el;
        var wrapper = new Element('div.fakeupload-wrapper');
        wrapper.setStyles({
            'cursor': 'pointer',
            'overflow': 'hidden',
            'position': 'relative'
        });
        var cover = new Element('div.fakeupload-cover');
        cover.setStyles(self.defaultStyles);
        this.setDefaultStatus(cover);
        cover.setStyles({
            'left': 0,
            'z-index': 1
        });
        el.set('size', 100);
        el.setStyles(self.defaultStyles);
        el.setStyles({
            'height': 100,
            'z-index': 2,
            'cursor': 'pointer',
            'filter': 'alpha(opacity=01)',
            'opacity': '0.01'
        });
        wrapper.adopt(cover);
        wrapper.wraps(el);
    },
    // Set events for interaction
    setEvents: function() {
        var self = this,
            el = this.el;
        var wrapper = el.getParent();
        // Change the shown file name
        el.addEvent('change', function() {
            var newValue = this.get('value').replace('C:\\fakepath\\', ''),
                cover = this.getPrevious('.fakeupload-cover');
            if (newValue === '') {
                self.setDefaultStatus(cover);
            }
            else {
                cover.set('html', newValue).removeClass(self.inputClass);
            }
        });
        // Move the input element for a good behavior
        wrapper.addEvent('mousemove', function(e) {
            var right = this.getWidth() - (e.page.x - this.getPosition().x) - 10;
            var top = (e.page.y - this.getPosition().y) - 10;
            wrapper.getChildren('input').setStyles({
                'top': top,
                'right': right
            });
        });
        // Reset position on leave
        wrapper.addEvent('mouseleave', function(e) {
            wrapper.getChildren('input').setStyles({
                'top': 0,
                'right': 0
            });
        });
    },
    // Set default status of fake upload
    setDefaultStatus: function(cover) {
        if (!cover.hasClass(this.settings.inputClass)) {
            cover.addClass(this.settings.inputClass);
            cover.set('html', this.settings.inputTxt);
        }
    }
});