if (!replaceThisStringWithAnID) {
    // Main class
    var replaceThisStringWithAnID = new Class({
        settings: {},
        defaultSettings: {},
        initialize: function(el, settings) {
            // Handling duplicate calls
            var controlClass = 'moo_replaceThisStringWithAnID'.toLowerCase();
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
        },
        // Setting events
        setEvents: function() {
            var self = this,
                settings = this.settings;
        }
    });
}