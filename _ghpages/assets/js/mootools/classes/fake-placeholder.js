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
                    mthis.hidePlaceholder(tel);
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