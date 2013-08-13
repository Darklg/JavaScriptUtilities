/*
 * Plugin Name: Tabs
 * Version: 1.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Tabs may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Tabs
---------------------------------------------------------- */

/*
new dkJSUTabs({
    triggers: $$('.tab-triggers'),
    targets: $$('.tab-targets'),
});
*/

var dkJSUTabs = new Class({
    settings: {},
    defaultSettings: {
        triggers: $$(''),
        targets: $$(''),
        classCurrent: 'is-current',
        callBackTab: function(i) {}
    },
    initialize: function(settings) {
        this.getSettings(settings);
        if (this.settings.targets.length > 0) {
            this.setEvents();
        }
    },
    // Obtaining user settings
    getSettings: function(settings) {
        if (typeof settings != 'object') {
            settings = {};
        }
        this.settings = Object.merge({}, this.defaultSettings, settings);
    },
    setEvents: function() {
        var self = this,
            settings = this.settings;
        settings.triggers.each(function(el, i) {
            el.set('data-tabs-i', i);
            el.addEvent('click', function(e) {
                var i = parseInt(this.get('data-tabs-i'), 10);
                e.preventDefault();
                self.showTab(i);
            });
        });
        this.showTab(0);
    },
    showTab: function(i) {
        var settings = this.settings,
            classCurrent = this.settings.classCurrent,
            triggers = settings.triggers,
            targets = settings.targets;
        if (triggers[i] && settings.targets[i]) {
            settings.callBackTab(i);
            triggers.removeClass(classCurrent);
            triggers[i].addClass(classCurrent);
            targets.removeClass(classCurrent);
            targets[i].addClass(classCurrent);
        }
    }
});
