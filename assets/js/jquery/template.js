;if (!jQuery.fn.replaceThisStringWithAnID) {
    (function($, window, document) {
        "use strict";

        var _pluginID = 'replaceThisStringWithAnID'.toLowerCase(),
            _dataPlugin = 'plugin_' + _pluginID;

        // Main Class
        var replaceThisStringWithAnID = {
            defaultSettings: {},
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                this.setElements();
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
                    var tmpDataSettings = JSON.parse(this.el.attr('data-' + _pluginID + '-settings'));
                    if (typeof tmpDataSettings == 'object') {
                        this.settings = $.extend(true, {}, this.settings, tmpDataSettings);
                    }
                }
                catch (e) {}
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
        };
        // Using the replaceThisStringWithAnID class as a jQuery plugin
        $.fn.replaceThisStringWithAnID = function(settings) {
            this.each(function() {
                var $this = $(this);
                // Handling duplicate calls
                if (!$this.hasClass(_dataPlugin)) {
                    $.extend(true, {}, replaceThisStringWithAnID).init($this, settings);
                    $this.addClass(_dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}
