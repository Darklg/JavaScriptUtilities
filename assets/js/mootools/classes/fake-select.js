/*
 * Plugin Name: Fake Select
 * Version: 1.1
 * JavaScriptUtilities Fake Select may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Select
---------------------------------------------------------- */

/*
new FakeSelect($$('select.fake-select'), {
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
        'dataname': 'data-fakeselect',
        'wrapperClass': 'fakeselect-wrapper',
        'coverClass': 'fakeselect-cover'
    },
    initialize: function(elementz, settings) {
        var self = this;
        this.elementz = elementz;
        this.getSettings(settings);
        elementz.each(function(el) {
            if (!el.get(self.settings.dataname) || el.get('tag').toLowerCase() != 'select') {
                el.set(self.settings.dataname, 1);
                self.setElements(el);
                self.setEvents(el);
            }
        });
    },
    getSettings: function(settings) {
        if (typeof settings != 'object') {
            settings = {};
        }
        this.settings = Object.merge({}, this.defaultSettings, settings);
    },
    setElements: function(el) {
        var self = this,
            settings = this.settings;
        var wrapper = new Element('div.' + settings.wrapperClass);
        wrapper.setStyles({
            'position': 'relative'
        });
        var cover = new Element('div.' + settings.coverClass);
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
        cover.setStyles(self.defaultStyles);
        cover.setStyles({
            'z-index': 1,
            'right': 0
        });
        wrapper.adopt(cover);
        wrapper.wraps(el);
    },
    setEvents: function(el) {
        var self = this;
        self.setValue(el);
        el.addEvent('change', function() {
            self.setValue(el);
        });
    },
    setValue: function(el) {
        el.getPrevious('.' + this.settings.coverClass).set('html', el.options[el.selectedIndex].innerHTML);
    }
});