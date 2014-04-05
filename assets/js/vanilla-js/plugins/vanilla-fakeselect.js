/*
 * Plugin Name: Fake Select
 * Version: 0.2.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 * Required: Vanilla Classes
 * Required: fake-select.css
 */

var vanillaFakeSelect = function(settings) {
    var self = this;
    self.els = {
        select: false,
        wrapper: false,
        cover: false
    };
    self.defaultSettings = {
        select: false
    };
    self.init = function(settings) {
        self.getSettings(settings);
        if (!self.settings.select || self.settings.select.tagName.toLowerCase() !== 'select') {
            return false;
        }
        // If double init, reload value
        if (self.settings.select.hasClass('has-fakeselect')) {
            self.getExistingElements(self.settings.select);
            self.setValue();
            return false;
        }
        self.els.select = self.settings.select;
        self.els.select.addClass('has-fakeselect');
        self.setElements();
        self.setEvents();
    };
    self.setElements = function() {
        var els = self.els;
        // Wrap select
        els.wrapper = self.wrapElement(els.select);
        els.wrapper
            .addClass('fakeselect-wrapper')
            .addClass('vanilla-fakeselect');
        // Create cover
        els.cover = document.createElement('div');
        els.cover.addClass('fakeselect-cover');
        els.wrapper.appendChild(els.cover);
    };
    self.getExistingElements = function(select) {
        self.els = {
            select: select,
            wrapper: select.parentNode,
        };
        self.els.cover = self.els.wrapper.getElementsByClassName('fakeselect-cover')[0];
    };
    self.setEvents = function() {
        self.setValue();
        // Change select = set cover value
        self.addEvent(self.els.select, 'change', self.setValue);
        self.addEvent(self.els.select, 'focus', function() {
            self.els.wrapper.addClass('has-focus');
        });
        self.addEvent(self.els.select, 'blur', function() {
            self.els.wrapper.removeClass('has-focus');
        });
    };
    self.setValue = function() {
        var cover = self.els.cover,
            coverTxt = self.els.select.options[self.els.select.selectedIndex].text;
        cover.innerHTML = coverTxt;
    };
    self.init(settings);
    return self;
};

vanillaFakeSelect.prototype.getSettings = function(settings) {
    var self = this;
    self.settings = {};
    // Set default values
    for (var attr in self.defaultSettings) {
        if (self.defaultSettings.hasOwnProperty(attr)) {
            self.settings[attr] = self.defaultSettings[attr];
        }
    }
    // Set new values
    for (var attr2 in settings) {
        if (self.settings.hasOwnProperty(attr2)) {
            self.settings[attr2] = settings[attr2];
        }
    }
};

if (!Element.prototype.vanillaFakeSelect) {
    Element.prototype.vanillaFakeSelect = function() {
        return new vanillaFakeSelect({
            select: this
        });
    };
}

/* Events v 1.1.1 */
vanillaFakeSelect.prototype.addEvent = function(el, eventName, callback) {
    if (el.addEventListener) {
        el.addEventListener(eventName, callback, false);
    }
    else if (el.attachEvent) {
        el.attachEvent("on" + eventName, function(e) {
            return callback.call(el, e);
        });
    }
};

/* Elements v 2.1.1 */
vanillaFakeSelect.prototype.wrapElement = function(element, tagName) {
    tagName = tagName || 'div';
    tagName = tagName.toLowerCase();
    var wrapper = document.createElement(tagName);

    if (element.nextSibling) {
        element.parentNode.insertBefore(wrapper, element.nextSibling);
    }
    else {
        element.parentNode.appendChild(wrapper);
    }
    wrapper.appendChild(element);
    return wrapper;
};