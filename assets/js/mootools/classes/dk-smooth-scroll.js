/*
 * Plugin Name: Smooth Scroll
 * Version: 1.1.1
 * JavaScriptUtilities Smooth Scroll may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Smooth Scroll
---------------------------------------------------------- */

/*
 * Dependencies : MooTools More With Fx.Scroll.
 */

/*
new dkSmoothScroll($$('[href^=#]'), {
    duration: 500
});
*/
var dkSmoothScroll = new Class({
    opt: {},
    defaultOptions: {
        duration: 500
    },
    initialize: function(elements, opt) {
        this.els = elements;
        this.getOptions(opt);
        this.setEvents();
    },
    getOptions: function(opt) {
        if (typeof opt != 'object') {
            opt = {};
        }
        this.opt = Object.merge({}, this.defaultOptions, opt);
    },
    setEvents: function() {
        var opt = this.opt;
        this.els.addEvent('click', function(e) {
            var href = $(this).get('href'),
                target = $$(href);
            if (target[0]) {
                e.preventDefault();
                new Fx.Scroll(window, {
                    duration: opt.duration
                }).toElement(target[0]);
            }
        });
    }
});