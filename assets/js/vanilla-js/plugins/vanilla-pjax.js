/*
 * Plugin Name: Vanilla Pushstate/AJAX
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Slider may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla AJAX
 * Usage status: Work in progress
 */

var vanillaPJAX = function(settings) {
    var self = this;
    self.isLoading = false;
    self.currentLocation = document.location;
    self.defaultSettings = {
        targetContainer: document.body
    };
    self.init = function(settings) {
        self.getSettings(settings);
        // Kill if target container isn't defined
        if (!self.settings.targetContainer) {
            return;
        }
        // Set Events
        self.setEvents();
    };
    self.setEvents = function() {
        // Click event on all A elements
        self.setClickables(document);
        // Handle history back
        window.addEvent(window, 'popstate', function(e) {
            console.log(e);
            self.goToUrl(document.location);
        });
    };
    self.setClickables = function(parent) {
        var links = parent.getElementsByTagName('A');
        for (var link in links) {
            // Intercept click event on each new link
            if (typeof links[link] == 'object' && links[link].getAttribute('data-ajax') !== '1') {
                links[link].setAttribute('data-ajax', '1');
                links[link].addEvent('click', self.clickAction);
            }
        }
    };
    self.clickAction = function(e) {
        window.eventPreventDefault(e);
        self.goToUrl(this.href);
    };
    // Load an URL
    self.goToUrl = function(url) {
        if (url == self.currentLocation) {
            return;
        }
        new jsuAJAX({
            url: url,
            callback: function(content) {
                self.loadContent(content, url);
            },
            data: 'ajax=1'
        });
    };
    // Handle the loaded content
    self.loadContent = function(content, url) {
        var target = self.settings.targetContainer;
        // Update values
        self.currentLocation = url;
        // Change URL
        if ('pushState' in history) {
            history.pushState({}, "", url);
        }
        // Load content into target
        target.innerHTML = content;
        // Add events to new links
        self.setClickables(target);
    };
    self.init(settings);
    return self;
};

/* Get Settings */
vanillaPJAX.prototype.getSettings = function(settings) {
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