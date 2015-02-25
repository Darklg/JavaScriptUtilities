 /*
  * Plugin Name: Persist Hover
  * Version: 0.1
  * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
  * JavaScriptUtilities Persist Hover may be freely distributed under the MIT license.
  */

/* ----------------------------------------------------------
  Persist Hover
---------------------------------------------------------- */

/*
 * jQuery('.selector').persistHover();
 */

if (!jQuery.fn.persistHover) {
    (function($, window, document) {
        // Main Class
        var persistHover = {
            defaultSettings: {
                classhaspersist: 'has-persist-hover',
                delaypersist: 300,
                delaypersistleave: 1500,
            },
            mouseentertimer: false,
            mouseleavetimer: false,
            settings: {},
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                this.setEvents();
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            // Setting events
            setEvents: function() {
                var self = this,
                    settings = self.settings,
                    el = self.el;
                this.el.on('mouseenter', function() {
                    clearTimeout(self.mouseleavetimer);
                    clearTimeout(self.mouseentertimer);
                    self.mouseentertimer = setTimeout(function() {
                        clearTimeout(self.mouseentertimer);
                        self.el.addClass(settings.classhaspersist);
                    }, settings.delaypersist);
                });
                this.el.on('mouseleave', function() {
                    clearTimeout(self.mouseentertimer);
                    clearTimeout(self.mouseleavetimer);
                    self.mouseleavetimer = setTimeout(function() {
                        clearTimeout(self.mouseleavetimer);
                        self.el.removeClass(settings.classhaspersist);
                    }, settings.delaypersistleave);
                });
            }

        };
        // Using the persistHover class as a jQuery plugin
        $.fn.persistHover = function(settings) {
            this.each(function() {
                var $this = $(this),
                    dataPlugin = 'plugin_persisthover';
                // Handling duplicate calls
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, persistHover).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}