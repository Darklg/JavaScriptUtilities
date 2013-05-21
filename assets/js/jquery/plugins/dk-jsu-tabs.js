/*
 * Plugin Name: Tabs
 * Version: 1.0
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
            params: {
                classCurrent: 'is-current'
            },
            init: function(els, params) {
                this.els = els;
                this.setParams(params);
                if (this.params.targets) {
                    this.setEvents();
                    this.showTab(0);
                }
            },
            setParams: function(params) {
                this.params = $.extend({}, this.params, params);
            },
            setEvents: function() {
                var _this = this;
                _this.els.on('click', function(e) {
                    e.preventDefault();
                    _this.showTab($(this).index());
                });
            },
            showTab: function(i) {
                var params = this.params,
                    clss = params.classCurrent,
                    targets = params.targets;
                this.els.removeClass(clss);
                targets.removeClass(clss);
                this.els.eq(i).addClass(clss);
                targets.eq(i).addClass(clss);
            }
        };
        $.fn.dkJSUTabs = function(params) {
            $.extend({}, dkJSUTabs).init(this, params);
            return this;
        };
    })(jQuery);
}