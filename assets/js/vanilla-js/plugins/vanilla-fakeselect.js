/*
 * Plugin Name: Fake Select
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Classes
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
        if (!self.settings.select || self.settings.select.hasClass('has-fakeselect')) {
            return false;
        }
        self.settings.select.addClass('has-fakeselect');
        self.els.select = self.settings.select;
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
    self.setEvents = function() {
        self.setValue();
        // Change select = set cover value
        self.els.select.addEvent('change', self.setValue);
    };
    self.setValue = function() {
        self.els.cover.innerHTML = self.els.select.options[self.els.select.selectedIndex].text;
    };
    self.init(settings);
    return self;
};

vanillaFakeSelect.prototype.getSettings = function(settings) {
    var self = this;
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

if (!Element.prototype.vanillaFakeSelect) {
    Element.prototype.vanillaFakeSelect = function() {
        return new vanillaFakeSelect({
            select: this
        });
    };
}