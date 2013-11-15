/*
 * Plugin Name: Fake Input Box
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Input Box may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Input Box
---------------------------------------------------------- */

/*
new FakeInputBox(el);
*/

if (!FakeInputBox) {
    // Main class
    var FakeInputBox = new Class({
        settings: {},
        defaultSettings: {},
        initialize: function(el, settings) {
            // Handling duplicate calls
            var controlClass = 'moo_FakeInputBox'.toLowerCase();
            if (!el || el.hasClass(controlClass)) {
                return;
            }
            el.addClass(controlClass);
            this.el = el;
            // Launching functions
            this.getSettings(settings);
            this.setElements();
            this.setEvents();
        },
        // Obtaining user settings
        getSettings: function(settings) {
            if (typeof settings != 'object') {
                settings = {};
            }
            this.settings = Object.merge({}, this.defaultSettings, settings);
        },
        // Creating & setting elements
        setElements: function() {
            var self = this,
                settings = this.settings;

            // Getting element type
            this.elType = this.el.get('type');
            this.elName = this.el.get('name');

            // Set wrapper
            this.wrapper = new Element('span.fake-inputbox-wrapper');
            this.wrapper.setStyles({
                'position': 'relative',
                'overflow': 'hidden'
            });
            // Set cover
            this.cover = new Element('span.fake-inputbox-cover');
            this.el.setStyles({
                'position': 'absolute',
                'top': '0',
                'left': '0'
            });

            this.wrapper.wraps(this.el);
            this.wrapper.adopt(this.cover);

            // Specific types
            if (this.elType == 'radio') {
                this.wrapper.addClass('fake-inputbox-radio');
            }
        },
        // Setting events
        setEvents: function() {
            var self = this,
                settings = this.settings;

            self.setCSSClass();
            if (this.elType == 'radio') {
                $$('[name="' + this.elName + '"]').addEvent('change', function() {
                    self.setCSSClass();
                });
            }
            else {
                this.el.addEvent('change', function() {
                    self.setCSSClass();
                });
            }
        },
        setCSSClass: function() {
            if (this.el.checked) {
                this.wrapper.addClass('is-checked');
            }
            else {
                this.wrapper.removeClass('is-checked');
            }
        }
    });
}