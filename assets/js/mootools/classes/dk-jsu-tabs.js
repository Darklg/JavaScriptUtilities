/*
 * Plugin Name: Tabs
 * Version: 1.0
 * JavaScriptUtilities Tabs may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Tabs
---------------------------------------------------------- */

/*
new dkJSUTabs({
    triggers : $$('.tab-triggers'),
    targets : $$('.tab-targets'),
});
*/

var dkJSUTabs = new Class({
    opt: {},
    params: {
        classCurrent: 'is-current'
    },
    initialize: function(opt) {
        this.setOptions(opt);
        if (this.opt.targets) {
            this.setEvents();
        }
    },
    setOptions: function(opt) {
        if (opt.triggers && opt.targets) {
            this.opt = opt;
        }
    },
    setEvents: function() {
        var mthis = this,
            opt = this.opt;
        opt.triggers.each(function(el, i) {
            el.set('data-tabs-i', i);
            el.addEvent('click', function(e) {
                var i = parseInt(this.get('data-tabs-i'), 10);
                e.preventDefault();
                mthis.showTab(i);
            });
        });
        this.showTab(0);
    },
    showTab: function(i) {
        var opt = this.opt,
            clss = this.params.classCurrent;
        if (opt.triggers[i] && opt.targets[i]) {
            opt.triggers.removeClass(clss);
            opt.triggers[i].addClass(clss);
            opt.targets.removeClass(clss);
            opt.targets[i].addClass(clss);
        }
    }
});