/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Smooth Scroll
   ------------------------------------------------------- */

/* 
 * Dependencies : MooTools More With Fx.Scroll.
 */

/*
new dkSmoothScroll($$('[href^=#]'));
*/

var dkSmoothScroll = new Class({
    initialize : function(elements){
        this.els = elements;
        this.setEvents();
    },
    setEvents : function(){
        var mthis = this;
        this.els.addEvent('click', function(e){
            var href = $(this).get('href'),
                target = $$(href);
            if(target[0]){
                e.preventDefault();
                new Fx.Scroll(window, {
                    duration: 500
                }).toElement(target[0]);
            }
        });
    }
});