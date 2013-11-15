/*
 * Plugin Name: Fake Placeholder
 * Version: 1.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Placeholder may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Placeholder
---------------------------------------------------------- */

/*
$$('[placeholder]').each(function(el) {
    new FakePlaceholder(el);
});
*/

var FakePlaceholder = new Class({
    initialize: function(el) {
        // Duplicate calls
        var controlClass = 'moo_fakeplaceholder';
        if (!el || el.hasClass(controlClass)) {
            return;
        }
        el.addClass(controlClass);
        this.el = el;
        if (!("placeholder" in document.createElement("input"))) {
            if (!this.el.hasClass('disable-placeholder')) {
                this.setElements();
                this.showPlaceholder();
                this.setEvents();
            }
        }
    },
    setElements: function() {
        this.el.set('data-inputtype', this.el.get('type'));
        this.el.set('data-fakeplaceholder', this.el.get('placeholder'));
        this.el.set('placeholder', '');
    },
    setEvents: function(el) {
        var self = this;

        // Event on focus
        this.el.addEvent('focus', function(e) {
            self.hidePlaceholder(this);
        });

        // Event on blur
        this.el.addEvent('blur', function(e) {
            self.showPlaceholder(this);
        });

        // Fix on form submit
        if (this.el.getParent('form')) {
            this.el.getParent('form').addEvent('submit', function() {
                if (self.el.get('value') == self.el.get('data-fakeplaceholder')) {
                    self.hidePlaceholder();
                }
            });
        }
    },
    showPlaceholder: function() {
        if (this.el.get('value') === '') {
            this.el.addClass('with-placeholder');
            this.el.set('value', this.el.get('data-fakeplaceholder'));
        }
    },
    hidePlaceholder: function() {
        if (this.el.get('value') == this.el.get('data-fakeplaceholder')) {
            this.el.set('value', '');
            this.el.removeClass('with-placeholder');
        }
    }
});