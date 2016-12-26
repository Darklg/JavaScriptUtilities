/*
 * Plugin Name: Panels
 * Version: 0.2.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Panels may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Panels
---------------------------------------------------------- */

/*
 * Allow only one class on the target element
 *
<div>
    <a data-togglebodyclass="mybodyclass" href="#" >link</a>
    <a data-togglebodyclass="mybodyclass2" href="#" >link</a>
    <a data-togglebodyclass="mybodyclass3" href="#" >link</a>
</div>
<script>
jQuery(document).ready(function() {
    jQuery('body').dkJSUPanels();
});
</script>
 */

if (!jQuery.fn.dkJSUPanels) {
    (function($, window, document) {
        "use strict";
        // Main Class
        var dkJSUPanels = {
            defaultSettings: {
                attrSelector: 'data-togglebodyclass',
                attrTarget: 'data-haspanel',
                clearOnResize: true,
                useClassname: true
            },
            init: function(el, settings) {
                this.el = el;
                this.getSettings(settings);
                this.setEvents();
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            setEvents: function() {
                // Open panel on click
                this.el.on('click', '[' + this.settings.attrSelector + ']', jQuery.proxy(this.triggerCallback, this));
                // Close panels on filter click
                this.el.on('click', '.main-banner-filter', jQuery.proxy(this.filterCallback, this));
                jQuery(document).on('keydown', jQuery.proxy(function(e) {
                    if (e.keyCode == 27) {
                        this.clearHeaderPanels();
                    }
                }, this));
                if (this.settings.clearOnResize) {
                    jQuery(window).on('resize', jQuery.proxy(function(e) {
                        this.clearHeaderPanels();
                    }, this));
                }
                jQuery(window).on('click', '.close-header-panels', jQuery.proxy(function(e) {
                    e.preventDefault();
                    this.clearHeaderPanels();
                }, this));
                jQuery(window).on('clearHeaderPanels', jQuery.proxy(function(e) {
                    this.clearHeaderPanels();
                }, this));
            },
            filterCallback: function(e) {
                e.preventDefault();
                this.clearHeaderPanels();
            },
            triggerCallback: function(e) {
                var bodyClass = jQuery(e.currentTarget).attr(this.settings.attrSelector);
                e.preventDefault();
                if (!this.hasPanel(bodyClass)) {
                    this.clearHeaderPanels();
                    this.setPanel(bodyClass);
                }
                else {
                    this.clearHeaderPanels();
                }
            },
            hasPanel: function(panel) {
                if (this.settings.useClassname) {
                    return this.el.hasClass(panel);
                }
                else {
                    return this.el.attr(this.settings.attrTarget) == panel;
                }
            },
            setPanel: function(panel) {
                if (this.settings.useClassname) {
                    this.el.addClass(panel);
                }
                else {
                    this.el.attr(this.settings.attrTarget, panel);
                }
            },
            clearHeaderPanels: function() {
                if (this.settings.useClassname) {
                    var bodyClass = '';
                    jQuery('[' + this.settings.attrSelector + ']').each(jQuery.proxy(function(i, el) {
                        bodyClass += ' ' + jQuery(el).attr(this.settings.attrSelector);
                    }, this));
                    this.el.removeClass(bodyClass);
                }
                else {
                    this.el.attr(this.settings.attrTarget, '');
                }
            },
        };
        // Using the dkJSUPanels class as a jQuery plugin
        $.fn.dkJSUPanels = function(settings) {
            this.each(function() {
                var $this = jQuery(this);
                // Handling duplicate calls
                if (!$this.hasClass('plugin_dkjsupanels')) {
                    $.extend(true, {}, dkJSUPanels).init($this, settings);
                    $this.addClass('plugin_dkjsupanels');
                }
            });
            return this;
        };
    })(jQuery, window, document);
}
