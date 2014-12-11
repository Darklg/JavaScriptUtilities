/*
 * Plugin Name: Vanilla-JS Accelerometer
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUAccelerometer = function(item, settings) {
    var self = this;
    self.defaultSettings = {
        property: 'transform3d'
    };
    self.properties = {
        x: 0,
        y: 0
    };
    self.init = function(item, settings) {
        if (!item) {
            return;
        }
        self.item = item;
        self.getSettings(settings);
        self.setEvents();
    };
    self.setEvents = function() {
        // Cancel if accelerometer is not supporterd
        if (!window.DeviceOrientationEvent) {
            return;
        }
        window.addEventListener('deviceorientation', function(e) {
            self.properties.x = e.gamma;
            self.properties.y = e.beta;
            self.triggerPropertyChange();
        }, false);
    };
    self.triggerPropertyChange = function() {
        var x = self.properties.x,
            y = self.properties.y;
        switch (self.settings.property) {
            case 'transform3d':
                var t = 'translate(' + (0 - x) + 'px, ' + (0 - y) + 'px)';
                self.item.style.WebkitTransform = t;
                self.item.style.MozTransform = t;
                self.item.style.transform = t;
                break;
            case 'background-position':
                self.item.style.backgroundPosition = (0 - x) + 'px ' + (0 - y) + 'px';
                break;
            default:
        }
    };
    self.init(item, settings);
    return self;
};

/* Get Settings */
dkJSUAccelerometer.prototype.getSettings = function(settings) {
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