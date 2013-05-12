/*
 * JavaScriptUtilities
 * (c) 2012 Kevin Rocher
 * JavaScriptUtilities may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Lightbox
---------------------------------------------------------- */

/*
TODO : buttons close
TODO : class & zindex perso
TODO : small screens
TODO : Press echap : close lightbox

TODO : deduplicate ( if has class dkjsu, return false )
 */

/*
new dkJSULightbox({
    'triggers' : $$('.lightbox-me')
});
*/

var dkJSULightbox = new Class({
    initialize: function(opt) {
        this.opt = opt;
        if (!opt.triggers) {
            return;
        }
        this.createLightBox();
        this.setEvents();
    },
    createLightBox: function() {
        var mthis = this,
            opt = this.opt;
        this.lightbox = new Element('.lightbox');
        this.lightboxfilter = new Element('.lightbox-filter');
        this.lightbox.adopt(this.lightboxfilter);
        this.lightboxcontent = new Element('.lightbox-content');
        this.lightbox.adopt(this.lightboxcontent);
        this.closeLightbox();
        $(document.body).adopt(this.lightbox);
    },
    setEvents: function() {
        var mthis = this,
            opt = this.opt;

        // Click on trigger : Open Lightbox
        opt.triggers.addEvent('click', function(e) {
            e.preventDefault();
            mthis.openLink($(this));
        });
        // Click on filter : close lightbox
        this.lightboxfilter.addEvent('click', function(e) {
            mthis.closeLightbox();
        });
    },
    openLink: function(link) {
        var url = document.createElement('a');
        url.href = link.href;
        var urlExtension = url.pathname.split('.').pop().toLowerCase();

        // Detect image
        if (urlExtension == 'jpg') {
            this.openImage(link.href);
            return;
        }

        // Detect external URL
        if(url.hostname != window.location.hostname){
            this.openExternalURL(link.href);
            return;
        }

        this.openRelativeURL(link.href);
    },
    openExternalURL: function(url){
        this.loadContentInLightbox('<iframe src="'+url+'" />', 'iframe');
        this.openLightbox();
    },
    openRelativeURL: function(url) {
        var mthis = this;
        // Load content with AJAX
        var req = new Request({
            method: 'get',
            url: url,
            data: {
                'ajax': '1'
            },
            onComplete: function(response) {
                mthis.loadContentInLightbox(response, 'content');
                mthis.openLightbox();
            }
        }).send();
    },
    openMessage: function(msg) {
        this.loadContentInLightbox('<p>' + msg + '</p>', 'message');
        this.openLightbox();
    },
    openImage: function(url) {
        this.loadContentInLightbox('<img src="' + url + '" alt="" />', 'image');
        this.openLightbox();
    },
    loadContentInLightbox: function(content, type) {
        this.lightbox.set('data-lb', type);
        this.lightboxcontent.set('html', content);
    },
    openLightbox: function() {
        this.lightbox.removeClass('lb-is-hidden');
    },
    closeLightbox: function() {
        this.lightbox.addClass('lb-is-hidden');
    }
});