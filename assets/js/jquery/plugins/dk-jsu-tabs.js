/*
 * Plugin Name: Tabs
 * Version: 1.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Tabs may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Tabs
---------------------------------------------------------- */

/*
jQuery('.tab-triggers').dkJSUTabs({
    targets : jQuery('.tab-targets')
});
*/

if (!jQuery.fn.dkJSUTabs) {
    (function($) {
        var dkJSUTabs = {
            defaultSettings: {
                classCurrent: 'is-current',
                callBackTab: function(i) {}
            },
            settings: {},
            init: function(els, settings) {
                this.els = els;
                var els0 = els.eq(0);
                if (els0.hasClass('has-dk-jsu-tabs')) {
                    return;
                }
                els0.addClass('has-dk-jsu-tabs');
                this.getSettings(settings);
                if (this.settings.targets) {
                    this.setEvents();
                    this.showTab(0);
                }
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            setEvents: function() {
                var self = this,
                    settings = this.settings;

                // Set element index
                self.els.each(function(i) {
                    $(this).attr('data-tabsi', i);
                });

                self.els.on('click', function(e) {
                    var i = parseInt($(this).attr('data-tabsi'), 10);
                    e.preventDefault();
                    self.showTab(i);
                });
            },
            showTab: function(i) {
                var settings = this.settings,
                    classCurrent = settings.classCurrent,
                    targets = settings.targets;
                settings.callBackTab(i);
                if (this.els.eq(i) && targets.eq(i)) {
                    this.els.removeClass(classCurrent);
                    targets.removeClass(classCurrent);
                    this.els.eq(i).addClass(classCurrent);
                    targets.eq(i).addClass(classCurrent);
                }
            }
        };
        $.fn.dkJSUTabs = function(settings) {
            $.extend(true, {}, dkJSUTabs).init(this, settings);
            return this;
        };
    })(jQuery);
}