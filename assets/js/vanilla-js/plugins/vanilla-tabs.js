/*
 * Plugin Name: Vanilla Tabs
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Tabs may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Elements, Vanilla Classes
 */

var vanillaTabs = function(settings) {
    var self = this,
        triggers = false,
        targets = false;
    self.defaultSettings = {
        classCurrent: 'is-current',
        callBackTab: function(i) {}
    };
    self.init = function(settings) {
        self.getSettings(settings);
        // Check if triggers and targets exists
        if (!self.settings.triggers || !self.settings.targets) {
            return false;
        }
        triggers = self.settings.triggers;
        targets = self.settings.targets;
        // Prevent double launch
        if (!triggers[0] || triggers[0].hasClass('has-vanilla-tabs')) {
            return;
        }
        triggers[0].addClass('has-vanilla-tabs');
        // Set Elements & events
        self.setElements();
        self.setEvents();
        // Go to tab #1
        self.setTab(0);
    };
    self.setElements = function() {
        var i = 0;
        triggers.eachElement(function(el) {
            el.setAttribute('data-i', i++);
        });
    };
    self.setEvents = function() {
        triggers.eachElement(function(el) {
            el.addEvent('click', function(e) {
                window.eventPreventDefault(e);
                // Get trigger number
                var i = parseInt(el.getAttribute('data-i'), 10);
                // Set called tab
                self.setTab(i);
            });
        });
    };
    self.setTab = function(i) {
        var classCurrent = self.settings.classCurrent,
            callBackTab = self.settings.callBackTab;
        if (!triggers[i] || !targets[i]) {
            return;
        }
        // Remove class on all triggers and targets
        triggers.eachElement(function(el) {
            el.removeClass(classCurrent);
        });
        targets.eachElement(function(el) {
            el.removeClass(classCurrent);
        });
        // Add class on current trigger & target
        triggers[i].addClass(classCurrent);
        targets[i].addClass(classCurrent);
        // Launch callback
        if (typeof callBackTab == 'function') {
            callBackTab(i);
        }
    };
    self.init(settings);
    return self;
};

/* Get Settings */
vanillaTabs.prototype.getSettings = function(settings) {
    if (typeof settings != 'object') {
        settings = {};
    }
    this.settings = {};
    // Set default values
    for (var attr in this.defaultSettings) {
        this.settings[attr] = this.defaultSettings[attr];
    }
    // Set new values
    for (var attr2 in settings) {
        this.settings[attr2] = settings[attr2];
    }
};