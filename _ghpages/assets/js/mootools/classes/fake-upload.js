/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Upload
   ------------------------------------------------------- */

/*
new FakeUpload({
    elementz : $$('input.fake-upload'),
    defaultTxt : 'Browse ...'
});
*/

var FakeUpload = new Class({
    defaultTxt: 'Browse ...',
    defaultClass: 'fake-upload-default-txt',
    defaultStyles: {
        'cursor': 'pointer',
        'position': 'absolute',
        'top': 0,
        'right': 0
    },
    initialize: function(opt) {
        var mthis = this;
        this.getOptions(opt);
        this.elementz.each(function(el) {
            if(!el.get('data-fakeupload') || !el.get('type') || el.get('type') != 'file') {
                el.set('data-fakeupload', 1);
                mthis.setWrapper(el);
                mthis.setEvents(el);
            }
        });
    },
    // Get options from user init
    getOptions: function(opt) {
        this.opt = opt;
        this.elementz = $$();
        if(opt.elementz) {
            this.elementz = opt.elementz;
        }
        if(opt.defaultTxt) {
            this.defaultTxt = opt.defaultTxt;
        }
    },
    // Set wrappers elements
    setWrapper: function(el) {
        var mthis = this,
            opt = this.opt;
        var wrapper = new Element('div.fakeupload-wrapper');
        wrapper.setStyles({
            'cursor': 'pointer',
            'overflow': 'hidden',
            'position': 'relative'
        });
        var cover = new Element('div.fakeupload-cover');
        cover.setStyles(mthis.defaultStyles);
        this.setDefaultStatus(cover);
        cover.setStyles({
            'left': 0,
            'z-index': 1
        });
        el.set('size', 100);
        el.setStyles(mthis.defaultStyles);
        el.setStyles({
            'height': 100,
            'z-index': 2,
            'cursor': 'pointer',
            'filter': 'alpha(opacity=01)',
            'opacity': '0.01'
        });
        wrapper.adopt(cover);
        wrapper.wraps(el);
    },
    // Set events for interaction
    setEvents: function(el) {
        var mthis = this;
        var wrapper = el.getParent();
        // Change the shown file name
        el.addEvent('change', function() {
            var newValue = this.get('value').replace('C:\\fakepath\\', ''),
                cover = this.getPrevious('.fakeupload-cover');
            if(newValue === '') {
                mthis.setDefaultStatus(cover);
            }
            else {
                cover.set('html', newValue).removeClass(mthis.defaultClass);
            }
        });
        // Move the input element for a good behavior
        wrapper.addEvent('mousemove', function(e) {
            var right = this.getWidth() - (e.page.x - this.getPosition().x) - 10;
            var top = (e.page.y - this.getPosition().y) - 10;
            wrapper.getChildren('input').setStyles({
                'top': top,
                'right': right
            });
        });
        // Reset position on leave
        wrapper.addEvent('mouseleave', function(e) {
            wrapper.getChildren('input').setStyles({
                'top': 0,
                'right': 0
            });
        });
    },
    // Set default status of fake upload
    setDefaultStatus: function(el) {
        var mthis = this,
            opt = this.opt;
        if(!el.hasClass(mthis.defaultClass)) {
            el.addClass(mthis.defaultClass);
            el.set('html', opt.defaultTxt);
        }
    }
});