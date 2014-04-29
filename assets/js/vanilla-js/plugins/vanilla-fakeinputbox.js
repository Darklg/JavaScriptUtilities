/*
 * Plugin Name: Fake Input Box
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Input Box may be freely distributed under the MIT license.
 * Required: Vanilla Classes, Vanilla Events, Vanilla Elements
 * Required: fake-inputbox.css
 */

var vanillaFakeInputBox = function(settings) {
    var self = this,
        el = false;
    self.els = {
        el: false,
        wrapper: false
    };
    self.defaultSettings = {
        el: false
    };
    self.init = function(settings) {
        self.getSettings(settings);
        if (!self.settings.el || self.settings.el.tagName.toLowerCase() !== 'input') {
            return false;
        }
        if (self.settings.el.hasClass('has-fakeinputbox')) {
            window.triggerEvent(self.settings.el, 'refresh');
            return false;
        }
        self.els.el = self.settings.el;
        Element.addClass(self.els.el, 'has-fakeinputbox');
        self.setElements();
        self.setEvents();
    };
    self.setElements = function() {
        self.elType = self.els.el.type;
        // Set Wrapper
        self.els.wrapper = wrapElement(self.els.el);
        self.els.wrapper.addClass('fake-inputbox-wrapper');
        // Set Cover
        self.els.cover = document.createElement('div');
        self.els.cover.addClass('fake-inputbox-cover');
        self.els.wrapper.appendChild(self.els.cover);
        // Specific types
        if (self.elType == 'radio') {
            self.els.wrapper.addClass('fake-inputbox-radio');
        }
    };
    self.setEvents = function() {
        self.setCSSClass();
        window.addEvent(self.els.el, 'refresh', self.setCSSClass);
        window.addEvent(self.els.el, 'change', self.setCSSRefresh);
        window.addEvent(self.els.el, 'click', self.setCSSRefresh);
    };
    self.setCSSRefresh = function() {
        self.setCSSClass();
        if (self.elType == 'radio') {
            var radios = document.querySelectorAll('input[type=radio]');
            radios.eachElement(function(el){
                window.triggerEvent(el, 'refresh');
            });
        }
    };
    self.setCSSClass = function() {
        if (self.els.el.checked) {
            self.els.wrapper.addClass('is-checked');
        }
        else {
            self.els.wrapper.removeClass('is-checked');
        }
    };
    self.init(settings);
    return self;
};

/* Get Settings */
vanillaFakeInputBox.prototype.getSettings = function(settings) {
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

if (!Element.prototype.vanillaFakeInputBox) {
    Element.prototype.vanillaFakeInputBox = function() {
        return new vanillaFakeInputBox({
            el: this
        });
    };
}