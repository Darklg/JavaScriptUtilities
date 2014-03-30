/*
 * Plugin Name: Vanilla Pushstate/AJAX
 * Version: 0.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Slider may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla AJAX, Vanilla Arrays
 * Usage status: Work in progress
 */

/*
 * Todo :
 * - Parse content to extract only area
 */

var vanillaPJAX = function(settings) {
    var self = this;
    self.isLoading = false;
    self.currentLocation = document.location;
    self.defaultSettings = {
        targetContainer: document.body,
        callbackBeforeAJAX: function(newUrl) {},
        callbackAfterAJAX: function(newUrl) {},
        callbackAfterLoad: function(newUrl) {}
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
            self.goToUrl(document.location);
        });
    };
    self.setClickables = function(parent) {
        var links = parent.getElementsByTagName('A');
        for (var link in links) {
            // Intercept click event on each new link
            if (typeof links[link] == 'object' && links[link].getAttribute('data-ajax') !== '1' && self.checkClickable(links[link])) {
                links[link].setAttribute('data-ajax', '1');
                links[link].addEvent('click', self.clickAction);
            }
        }
    };
    self.checkClickable = function(link) {
        // Invalid or external link
        if (!link.href || link.href == '#' || link.getAttribute('target') == '_blank') {
            return false;
        }
        // Get details
        var urlExtension = link.pathname.split('.').pop().toLowerCase();
        // Static asset
        if (['jpg', 'png', 'gif', 'css', 'js'].contains(urlExtension)) {
            return false;
        }
        // Not on same domain
        if (document.location.host != link.host) {
            return false;
        }
        return true;
    };
    self.clickAction = function(e) {
        window.eventPreventDefault(e);
        self.goToUrl(this.href);
    };
    // Load an URL
    self.goToUrl = function(url) {
        var settings = self.settings;
        if (url == self.currentLocation || Element.hasClass(document.body, 'ajax-loading')) {
            return;
        }
        settings.callbackBeforeAJAX(url);
        Element.addClass(document.body, 'ajax-loading');
        new jsuAJAX({
            url: url,
            callback: function(content) {
                settings.callbackAfterAJAX(url);
                self.loadContent(content, url);
            },
            data: 'ajax=1'
        });
    };
    // Change URL
    self.setUrl = function(url) {
        var urlDetails = document.createElement('a');
        urlDetails.href = url;
        // Change URL
        if ('pushState' in history) {
            history.pushState({}, "", url);
        }
        else {
            document.location.hash = '!' + urlDetails.pathname;
        }
    };
    // Handle the loaded content
    self.loadContent = function(content, url) {
        var settings = self.settings,
            target = self.settings.targetContainer;
        // Update values
        self.currentLocation = url;
        // Set URL
        self.setUrl(url);
        // Load content into target
        target.innerHTML = content;
        // Add events to new links
        self.setClickables(target);
        // Allow a new page load
        Element.removeClass(document.body, 'ajax-loading');
        // Callback
        settings.callbackAfterLoad(url);
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