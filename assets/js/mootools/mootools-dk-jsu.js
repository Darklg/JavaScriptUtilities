/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Placeholder
   ------------------------------------------------------- */

/*
new FakePlaceholder($$('[placeholder]'));
*/
var FakePlaceholder = new Class({
    initialize: function(elementz) {
        var mthis = this;
        this.elementz = elementz;
        if(!("placeholder" in document.createElement("input"))) {
            elementz.each(function(el) {
                if(!el.get('data-fakeplaceholder') && !el.hasClass('disable-placeholder')) {
                    mthis.setElements(el);
                    mthis.showPlaceholder(el);
                    mthis.setEvents(el);
                }
            });
        }
    },
    setElements: function(el) {
        el.set('data-inputtype', el.get('type'));
        el.set('data-fakeplaceholder', el.get('placeholder'));
        el.set('placeholder', '');
    },
    setEvents: function(el) {
        var mthis = this,
            tel = el;

        // Event on focus
        el.addEvent('focus', function(e) {
            mthis.hidePlaceholder(this);
        });

        // Event on blur
        el.addEvent('blur', function(e) {
            mthis.showPlaceholder(this);
        });

        // Fix on form submit
        if(el.getParent('form')) {
            el.getParent('form').addEvent('submit', function() {
                if(tel.get('value') == tel.get('data-fakeplaceholder')) {
                    tel.set('value', '');
                }
            });
        }
    },
    showPlaceholder: function(el) {
        if(el.get('value') === '') {
            el.addClass('with-placeholder');
            el.set('value', el.get('data-fakeplaceholder'));
        }
    },
    hidePlaceholder: function(el) {
        if(el.get('value') == el.get('data-fakeplaceholder')) {
            el.set('value', '');
            el.removeClass('with-placeholder');
        }
    }
});

/* ----------------------------------------------------------
   Fake Select
   ------------------------------------------------------- */

/*
new FakeSelect($$('select.fake-select'));
*/

var FakeSelect = new Class({
    defaultStyles: {
        'position': 'absolute',
        'top': 0,
        'left': 0
    },
    initialize: function(elementz) {
        var mthis = this;
        this.elementz = elementz;
        elementz.each(function(el) {
            if(!el.get('data-fakeselect')) {
                mthis.setWrapper(el);
                mthis.setEvents(el);
            }
        });
    },
    setWrapper: function(el) {
        var mthis = this;
        var wrapper = new Element('div.fakeselect-wrapper');
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