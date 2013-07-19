;if (!jQuery.fn.replaceThisStringWithAnID) {
    (function($, window, document) {
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
                var $this = $(this),
                    dataPlugin = 'plugin_replaceThisStringWithAnID'.toLowerCase();
                // Handling duplicate calls
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, replaceThisStringWithAnID).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}
