/*
 * Plugin Name: Vanilla Tabs
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Tabs may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Elements
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
        if (!self.settings.triggers || !self.settings.targets) {
            return false;
        }
        triggers = self.settings.triggers;
        targets = self.settings.targets;
        self.setElements();
        self.setEvents();
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
                self.setTab(parseInt(el.getAttribute('data-i'), 10));
            });
        });
    };
    self.setTab = function(i) {
        var settings = self.settings;
        if (!triggers[i] || !targets[i]) {
            return;
        }
        triggers.eachElement(function(el) {
            el.removeClass(settings.classCurrent);
        });
        triggers[i].addClass(settings.classCurrent);
        targets.eachElement(function(el) {
            el.removeClass(settings.classCurrent);
        });
        targets[i].addClass(settings.classCurrent);
        settings.callBackTab(i);
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