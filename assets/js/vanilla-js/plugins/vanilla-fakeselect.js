/*
 * Plugin Name: Fake Select
 * Version: 0.2.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Classes, Vanilla Elements
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
        els.wrapper = wrapElement(els.select);
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
        self.els.select.addEvent('change', self.setValue);
        self.els.select.addEvent('focus', function() {
            self.els.wrapper.addClass('has-focus');
        });
        self.els.select.addEvent('blur', function() {
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