/*
 * Plugin Name: Vanilla Pushstate/AJAX
 * Version: 0.5
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Slider may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla AJAX, Vanilla Arrays, Vanilla Classes
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
        ajaxParam: 'ajax',
        callbackBeforeAJAX: function(newUrl) {},
        callbackAfterAJAX: function(newUrl, content) {},
        callbackAfterLoad: function(newUrl) {},
        filterContent: function(content) {
            return content;
        }
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
            self.goToUrl(document.location.href);
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
        if (!link.href || link.href.slice(-1) == '#' || link.getAttribute('target') == '_blank') {
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
        if (e.metaKey || e.ctrlKey ||  e.altKey || e.shiftKey) {
            return;
        }
        window.eventPreventDefault(e);
        self.goToUrl(this.href, this);
    };
    // Load an URL
    self.goToUrl = function(url, item) {
        item = item ||  false;
        var settings = self.settings;
        if (url == self.currentLocation || document.body.getAttribute('data-loading') == 'loading') {
            return;
        }
        settings.callbackBeforeAJAX(url, item);
        document.body.setAttribute('data-loading', 'loading');

        var data = {};
        data[settings.ajaxParam] = 1;
        new jsuAJAX({
            url: url,
            callback: function(content) {
                settings.callbackAfterAJAX(url, content, item);
                self.loadContent(content, url);
            },
            data: data
        });
    };
    // Change URL
    self.setUrl = function(url) {
        var urlDetails = document.createElement('a');
        urlDetails.href = url;
        if (url == window.location.href) {
            return;
        }
        // Change URL
        if ('pushState' in history) {
            history.pushState({}, document.title, url);
        }
        else {
            document.location.hash = '!' + urlDetails.pathname;
        }
    };
    // Handle the loaded content
    self.loadContent = function(content, url) {
        var settings = self.settings,
            target = self.settings.targetContainer;

        content = self.settings.filterContent(content);
        // Update values
        self.currentLocation = url;
        // Set URL
        self.setUrl(url);
        // Load content into target
        target.innerHTML = content;
        // Add events to new links
        self.setClickables(target);
        // Allow a new page load
        document.body.setAttribute('data-loading', '');
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