/*
 * Plugin Name: Vanilla-JS Template
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var replaceThisStringWithAnID = function(settings) {
    var self = this;
    self.defaultSettings = {};
    self.init = function(settings) {
        self.getSettings(settings);
        self.setElements();
        self.setEvents();
    };
    self.setElements = function() {

    };
    self.setEvents = function() {

    };
    self.init(settings);
    return self;
};

/* Get Settings */
replaceThisStringWithAnID.prototype.getSettings = function(settings) {
    var nSettings;
    if (typeof settings != 'object') {
        settings = {};
    }
    (function() {
        if ('loadElement' in settings && settings.loadElement.getAttribute('data-settings')) {
            nSettings = JSON.parse(settings.loadElement.getAttribute('data-settings'));
            if (typeof nSettings == 'object') {
                nSettings.slider = settings.loadElement;
                settings = nSettings;
            }
        }
    }());
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