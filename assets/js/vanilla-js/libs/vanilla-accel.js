/*
 * Plugin Name: Vanilla-JS Accelerometer
 * Version: 0.4
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUAccelerometer = function(item, settings) {
    var self = this,
        isTouchScreen = ("ontouchstart" in window || navigator.msMaxTouchPoints);

    self.defaultSettings = {
        property: 'transform3d',
        useMouseIfNotTouchscreen: true,
        startAtInitialPosition: true,
        moveRadius: 20
    };
    self.properties = {
        offsetX: false,
        offsetY: false,
        startX: -180,
        endX: 180,
        startY: -180,
        endY: 180,
        x: false,
        y: false
    };

    // Init class
    self.init = function(item, settings) {
        if (!item) {
            return;
        }
        self.item = item;
        self.getSettings(settings);
        self.setEvents();
    };

    // Load initial events
    self.setEvents = function() {

        // If accelerometer is supported
        if (window.DeviceOrientationEvent && (isTouchScreen && self.defaultSettings.useMouseIfNotTouchscreen)) {
            window.addEventListener('deviceorientation', function(e) {

                // Load initial values to use as an offset
                if (self.properties.offsetX === false) {
                    self.properties.offsetX = e.gamma;
                    self.properties.offsetY = e.beta;
                }

                self.properties.x = e.gamma;
                self.properties.y = e.beta;
                self.triggerPropertyChange();
            }, false);
        }
        else {
            window.addEventListener('mousemove', function(e) {
                var w = (window.innerWidth / 2);
                var h = (window.innerHeight / 2);

                // Max-min values
                self.properties.startX = -w;
                self.properties.endX = w;
                self.properties.startY = -h;
                self.properties.endY = h;

                // Distance from the center of the screen
                self.properties.x = e.x - w;
                self.properties.y = e.y - h;
                self.triggerPropertyChange();
            });
        }
    };

    // Load values
    self.loadValues = function(x, y) {
        // Load initial values to use as an offset
        if (self.properties.offsetX === false) {
            self.properties.offsetX = x;
            self.properties.offsetY = y;
        }
        self.properties.x = x;
        self.properties.y = y;
    };

    // Change property on target
    self.triggerPropertyChange = function() {
        var prop = self.properties,
            x = prop.x,
            y = prop.y;

        if (window.DeviceOrientationEvent && self.settings.startAtInitialPosition) {
            x -= prop.offsetX;
            y -= prop.offsetY;
        }

        if (self.settings.moveRadius) {
            x = x / (prop.endX / self.settings.moveRadius);
            y = y / (prop.endY / self.settings.moveRadius);
        }

        switch (self.settings.property) {
            case 'transform3d':
            case 'translate3d':
                var t = 'translate3d(' + (0 - x) + 'px, ' + (0 - y) + 'px,0)';
                self.item.style.WebkitTransform = t;
                self.item.style.MozTransform = t;
                self.item.style.transform = t;
                break;
            case 'background-position':
                self.item.style.backgroundPosition = (0 - x) + 'px ' + (0 - y) + 'px';
                break;
            case 'pos':
                self.item.style.left = (0 - x) + 'px';
                self.item.style.top = (0 - y) + 'px';
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
