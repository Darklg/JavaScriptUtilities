/*
 * Plugin Name: Tabs
 * Version: 1.0.2.1
 * JavaScriptUtilities Tabs may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Tabs
---------------------------------------------------------- */

/*
jQuery('.tab-triggers').dkJSUTabs({
    targets : jQuery('.tab-targets')
});
*/

if (!jQuery.fn.dkJSUTabs) {
    (function($) {
        var dkJSUTabs = {
            defaultOpt: {
                classCurrent: 'is-current'
            },
            opt: {},
            init: function(els, opt) {
                this.els = els;
                var els0 = els.eq(0);
                if (els0.hasClass('has-dk-jsu-tabs')) {
                    return;
                }
                els0.addClass('has-dk-jsu-tabs');
                this.getOptions(opt);
                if (this.opt.targets) {
                    this.setEvents();
                    this.showTab(0);
                }
            },
            getOptions: function(opt) {
                this.opt = $.extend(true, {}, this.defaultOpt, opt);
            },
            setEvents: function() {
                var self = this;
                self.els.on('click', function(e) {
                    e.preventDefault();
                    self.showTab($(this).index());
                });
            },
            showTab: function(i) {
                var opt = this.opt,
                    clss = opt.classCurrent,
                    targets = opt.targets;
                this.els.removeClass(clss);
                targets.removeClass(clss);
                this.els.eq(i).addClass(clss);
                targets.eq(i).addClass(clss);
            }
        };
        $.fn.dkJSUTabs = function(opt) {
            $.extend(true, {}, dkJSUTabs).init(this, opt);
            return this;
        };
    })(jQuery);
}