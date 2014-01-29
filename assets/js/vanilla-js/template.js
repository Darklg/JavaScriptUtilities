;if (!replaceThisStringWithAnID) {
    var replaceThisStringWithAnID = function(settings) {
        var self = this;
        self.defaultSettings = {};
        self.init = function(settings) {
            self.getSettings(settings);
            self.setEvents();
        };
        self.getSettings = function(settings) {
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
        self.setEvents = function() {

        };
        self.init(settings);
    };
}