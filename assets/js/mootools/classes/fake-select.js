/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Select
   ------------------------------------------------------- */

/*
new FakeSelect($$('select.fake-select'), options);
*/

var FakeSelect = new Class({
    defaultStyles: {
        'position': 'absolute',
        'top': 0,
        'left': 0
    },
    defaultOptions: {
        'CSSClasses': ''
    },
    initialize: function(elementz, opt) {
        var mthis = this;
        this.elementz = elementz;
        this.getOptions(opt);
        elementz.each(function(el) {
            if (!el.get('data-fakeselect') || el.get('tag').toLowerCase() != 'select') {
                el.set('data-fakeselect', 1);
                mthis.setWrapper(el);
                mthis.setEvents(el);
            }
        });
    },
    getOptions: function(opt) {
        this.opt = Object.merge({}, this.defaultOptions, opt);
    },
    setWrapper: function(el) {
        var mthis = this,
            opt = this.opt;
        var wrapper = new Element('div.fakeselect-wrapper');
        wrapper.addClass(opt.CSSClasses);
        wrapper.setStyles({
            'position': 'relative'
        });
        var cover = new Element('div.fakeselect-cover');
        el.setStyles(mthis.defaultStyles);
        el.setStyles({
            'opacity': '0.01',
            'filter': 'alpha(opacity=1)',
            'z-index': 2,
            '-webkit-appearance': 'menulist-button',
            'padding': 0,
            'margin': 0,
            'width': '100%'
        });
        cover.setStyles(mthis.defaultStyles);
        cover.setStyles({
            'z-index': 1,
            'right': 0
        });
        wrapper.adopt(cover);
        wrapper.wraps(el);
    },
    setEvents: function(el) {
        var mthis = this;
        mthis.setValue(el);
        el.addEvent('change', function() {
            mthis.setValue(el);
        });
    },
    setValue: function(el) {
        el.getPrevious('.fakeselect-cover').set('html', el.options[el.selectedIndex].innerHTML);
    }
});