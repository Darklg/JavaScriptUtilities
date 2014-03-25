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
    self.settings = {};
    // Set default values
    for (var attr in self.defaultSettings) {
        self.settings[attr] = self.defaultSettings[attr];
    }
    // Set new values
    for (var attr2 in settings) {
        self.settings[attr2] = settings[attr2];
    }
};