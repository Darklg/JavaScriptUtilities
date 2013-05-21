/*
 * Plugin Name: Fake Placeholder
 * Version: 1.0
 * JavaScriptUtilities Fake Placeholder may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Fake Placeholder
---------------------------------------------------------- */

/*
jQuery('[placeholder]').FakePlaceholder();
*/

if(!jQuery.fn.FakePlaceholder) {
    (function($) {
        var FakePlaceholder = {
            init: function(el) {
                this.el = el;
                if(!("placeholder" in document.createElement("input"))) {
                    if(!el.get('data-fakeplaceholder') && !el.hasClass('disable-placeholder')) {
                        this.setElements();
                        this.showPlaceholder();
                        this.setEvents();
                    }
                }
            },
            setElements: function() {
                this.el.attr('data-inputtype', this.el.attr('type'));
                this.el.attr('data-fakeplaceholder', this.el.attr('placeholder'));
                this.el.attr('placeholder', '');
            },
            setEvents: function() {
                var mthis = this;

                // Event on focus
                this.el.on('focus', function() {
                    mthis.hidePlaceholder();
                });
                // Event on blur
                this.el.on('blur', function() {
                    mthis.showPlaceholder();
                });

                if(this.el.parents('form:first')) {
                    this.el.parents('form:first').on('submit', function(event) {
                        if(mthis.el.val() == mthis.el.attr('data-fakeplaceholder')) {
                            mthis.hidePlaceholder();
                        }
                    });
                }
            },
            showPlaceholder: function() {
                if(this.el.val() === '') {
                    this.el.addClass('with-placeholder');
                    this.el.attr('value', this.el.attr('data-fakeplaceholder'));
                }
            },
            hidePlaceholder: function() {
                if(this.el.val() == this.el.attr('data-fakeplaceholder')) {
                    this.el.attr('value', '');
                    this.el.removeClass('with-placeholder');
                }
            }
        };
        $.fn.FakePlaceholder = function() {
            this.each(function() {
                $.extend({}, FakePlaceholder).init($(this));
            });
            return this;
        };
    })(jQuery);
}