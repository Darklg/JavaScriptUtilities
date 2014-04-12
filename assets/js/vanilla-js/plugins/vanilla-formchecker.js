/*
 * Plugin Name: Vanilla Form Checker
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Form Checker may be freely distributed under the MIT license.
 * Required: Vanilla Elements, Vanilla Selectors, Vanilla Events, Vanilla Classes
 * Usage status: Work in progress
 */

var vanillaFormChecker = function(settings) {
    var self = this;
    self.fields = [];
    self.defaultSettings = {
        form: false,
        mainTarget: false,
        displayErrors: function(errors) {
            if (self.settings.errorsTarget) {
                self.settings.errorsTarget.innerHTML = errors;
            }
            else {
                console.error("Error(s):\n" + errors);
            }
        }
    };
    self.init = function(settings) {
        // Settings
        self.getSettings(settings);
        settings = self.settings;
        if (!settings.form) {
            console.error('The form isn\'t specified');
            return false;
        }
        // Get all fields
        self.getFields();
        // Set events
        self.setEvents();
    };
    self.getFields = function() {
        // Get fields inside form
        var tmpFields = self.settings.form.getElementsByClassName('vanilla-form');
        Element.eachElement(tmpFields, function(el) {
            self.fields.push(el);
            window.addEvent(el, 'blur', function() {
                var errors = self.checkField(this);
                if (errors !== '') {
                    self.displayErrors(errors);
                    this.focus();
                }
            });
        });
    };
    self.displayErrors = function(errors) {
        var settings = self.settings;
        if (typeof settings.displayErrors == 'function') {
            settings.displayErrors(errors);
        }
        else {
            console.error("Error(s):\n" + errors);
        }
    };
    self.checkField = function(el) {
        var errors = [],

            value = el.value.trim(),
            hasType = ('type' in el),
            emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/,
            // http://stackoverflow.com/a/17773849
            urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/,
            name, theElem;
        // Set correct name
        if (el.getAttribute('placeholder')) {
            name = el.getAttribute('placeholder').trim();
        }
        if (!name) {
            name = el.getAttribute('name').trim();
        }
        theElem = 'The element ' + name + ' ';
        // Check for non empty
        if ((('required' in el && el.required) || el.hasClass('not-empty')) && (value === '' || value === null)) {
            errors.push(theElem + 'should not be empty');
        }
        // Check for mail
        if (((hasType && el.type.toLowerCase() == 'email') || el.hasClass('format-email')) && !value.match(emailRegex)) {
            errors.push(theElem + 'should be an email!');
        }
        // Check for url
        if (((hasType && el.type.toLowerCase() == 'url') || el.hasClass('format-url')) && !value.match(urlRegex)) {
            errors.push(theElem + 'should be an url!');
        }
        return errors.join('\n');
    };
    self.setEvents = function() {
        window.addEvent(self.settings.form, 'submit', function(e) {
            var errors = '';
            // Parse fields for errors
            Element.eachElement(self.fields, function(el) {
                var error = self.checkField(el);
                if (error !== '') {
                    if (errors !== '') {
                        errors += "\n";
                    }
                    errors += error;
                    el.focus();
                }
            });
            // If errors, display messages
            if (errors !== '') {
                window.eventPreventDefault(e);
                self.displayErrors(errors);
            }
        });

    };
    self.init(settings);
    return self;
};

/* Get Settings */
vanillaFormChecker.prototype.getSettings = function(settings) {
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