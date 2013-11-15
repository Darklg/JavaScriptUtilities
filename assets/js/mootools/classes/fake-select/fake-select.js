/*
 * Plugin Name: Fake Select
 * Version: 1.4.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Select
---------------------------------------------------------- */

/*
new FakeSelect(el, {
    'wrapperClass': 'fakeselect-wrapper',
    'coverClass': 'fakeselect-cover'
});
*/

var FakeSelect = new Class({
    defaultStyles: {
        'position': 'absolute',
        'top': 0,
        'left': 0
    },
    settings: {},
    defaultSettings: {
        'wrapperClass': 'fakeselect-wrapper',
        'coverClass': 'fakeselect-cover'
    },
    wrapper: false,
    cover: false,
    initialize: function(el, settings) {
        var controlClass = 'moo_fakeselect'.toLowerCase();
        if (!el || !el.get('tag') || el.get('tag').toLowerCase() != 'select') {
            return;
        }
        this.el = el;
        if (!el.hasClass(controlClass)) {
            el.addClass(controlClass);
            this.getSettings(settings);
            this.setElements();
            this.setEvents();
        }
        else {
            this.wrapper = el.getParent();
            this.cover = el.getSiblings()[0];
            this.setValue();
        }
    },
    getSettings: function(settings) {
        if (typeof settings != 'object') {
            settings = {};
        }
        this.settings = Object.merge({}, this.defaultSettings, settings);
    },
    setElements: function() {
        var self = this,
            el = this.el,
            settings = this.settings;
        this.wrapper = new Element('div.' + settings.wrapperClass);
        this.wrapper.setStyles({
            'position': 'relative'
        });
        this.cover = new Element('div.' + settings.coverClass);
        el.setStyles(self.defaultStyles);
        el.setStyles({
            'opacity': '0.01',
            'filter': 'alpha(opacity=1)',
            'z-index': 2,
            '-webkit-appearance': 'menulist-button',
            'padding': 0,
            'margin': 0,
            'width': '100%'
        });
        this.cover.setStyles(self.defaultStyles);
        this.cover.setStyles({
            'z-index': 1,
            'right': 0
        });
        this.wrapper.adopt(this.cover);
        this.wrapper.wraps(el);
    },
    setEvents: function() {
        var self = this,
            el = this.el;
        self.setValue(el);
        el.addEvents({
            'change': function() {
                self.setValue(el);
            },
            'focus': function() {
                self.wrapper.addClass('has-focus');
            },
            'blur': function() {
                self.wrapper.removeClass('has-focus');
            }
        });
    },
    setValue: function() {
        var el = this.el,
            elDisplay = el.style.display;
        this.wrapper.setStyles({
            'display': elDisplay
        });
        this.cover.set('html', el.options[el.selectedIndex].innerHTML);
    }
});