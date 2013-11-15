/*
 * Plugin Name: Lightbox
 * Version: 1.0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Lightbox may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Lightbox
---------------------------------------------------------- */

/*
TODO : class & zindex perso
TODO : small screens
TODO : deduplicate ( if has class dkjsu, return false )
TODO : Stop lightbox launch if already opening
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
        var opt = this.opt;
        this.lightbox = new Element('.lightbox');
        this.lightboxfilter = new Element('.lightbox-filter');
        this.lightbox.adopt(this.lightboxfilter);
        this.lightboxcontent = new Element('.lightbox-content');
        this.lightbox.adopt(this.lightboxcontent);
        this.closeLightbox();
        $(document.body).adopt(this.lightbox);
    },
    setEvents: function() {
        var self = this,
            opt = this.opt;

        // Click on trigger : Open Lightbox
        opt.triggers.addEvent('click', function(e) {
            e.preventDefault();
            self.openLink($(this));
        });
        // Click on filter : close lightbox
        this.lightboxfilter.addEvent('click', function(e) {
            e.preventDefault();
            self.closeLightbox();
        });
        // Click on close button : close lightbox
        this.lightbox.addEvent('click:relay(.btn-close-lightbox)', function(e) {
            e.preventDefault();
            self.closeLightbox();
        });
        $(window).addEvent('keydown', function(e) {
            if (e.key && e.key == 'esc') {
                self.closeLightbox();
            }
        });
    },
    openLink: function(link) {
        var url = document.createElement('a');
        url.href = link.href;
        var urlExtension = url.pathname.split('.').pop().toLowerCase();
        var urlPathname = url.pathname.replace('/', '');
        var url_params = this.getUrlParams(url.search);

        // Detect image
        if (urlExtension == 'jpg') {
            this.openImage(link.href);
            return;
        }

        // Detect Youtube
        if ((url.hostname == 'youtube.com' || url.hostname == 'www.youtube.com') && url_params.v) {
            this.openVideo(url_params.v, 'youtube');
            return;
        }
        // Detect Vimeo
        if ((url.hostname == 'vimeo.com' || url.hostname == 'www.vimeo.com') && this.isNumber(urlPathname)) {
            this.openVideo(urlPathname, 'vimeo');
            return;
        }

        // Detect external URL
        if (url.hostname != window.location.hostname) {
            this.openExternalURL(link.href);
            return;
        }

        this.openRelativeURL(link.href);
    },
    openExternalURL: function(url) {
        this.loadContentInLightbox('<iframe src="' + url + '" />', 'iframe');
        this.openLightbox();
    },
    openRelativeURL: function(url) {
        var self = this;
        // Load content with AJAX
        var req = new Request({
            method: 'get',
            url: url,
            data: {
                'ajax': '1'
            },
            onComplete: function(response) {
                self.loadContentInLightbox(response, 'content');
                self.openLightbox();
            }
        }).send();
    },
    openMessage: function(msg) {
        this.loadContentInLightbox('<p>' + msg + '</p>', 'message');
        this.openLightbox();
    },
    openImage: function(url) {
        var self = this;
        var imageURL = new Image();
        imageURL.src = url;
        var myImages = new Asset.image(url, {
            onLoad: function() {
                // Getting image size
                var imageWidth = imageURL.width,
                    imageHeight = imageURL.height,
                    imageRatio = imageWidth / imageHeight;

                // Getting window size
                var windowWidth = window.getWidth() - 10,
                    windowHeight = window.getHeight() - 10,
                    windowRatio = windowWidth / windowHeight;

                // Setting new image size
                if (windowRatio > imageRatio) {
                    if (imageHeight > windowHeight) {
                        imageHeight = windowHeight;
                        imageWidth = imageRatio * imageHeight;
                    }
                }
                else {
                    if (imageWidth > windowWidth) {
                        imageWidth = windowWidth;
                        imageHeight = imageWidth / imageRatio;
                    }
                }
                // Loading image with CSS style
                self.loadContentInLightbox('<img style="display:block;" width="' + imageWidth + '" height="' + imageHeight + '" src="' + url + '" alt="" />', 'image', {
                    'width': imageWidth,
                    'height': imageHeight,
                    'margin-left': 0 - (imageWidth / 2),
                    'margin-top': 0 - (imageHeight / 2)
                });
                self.openLightbox();
            }
        });

    },
    openVideo: function(video_id, video_type) {
        var content = '';
        switch (video_type) {
            case 'youtube':
                content = '<iframe width="580" height="377" src="http://www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen></iframe>';
                break;
            case 'vimeo':
                content = '<iframe src="http://player.vimeo.com/video/' + video_id + '?autoplay=1" width="580" height="326" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                break;
        }
        this.loadContentInLightbox(content, video_type);
        this.openLightbox();
    },
    loadContentInLightbox: function(content, type, style) {
        style = style || {};
        // Reset lightbox style
        this.lightboxcontent.set('style', '');
        // Load additional style
        this.lightboxcontent.setStyles(style);

        this.lightbox.set('data-lb', type);
        this.lightboxcontent.set('html', content);
    },
    openLightbox: function() {
        this.lightbox.removeClass('lb-is-hidden');
    },
    closeLightbox: function() {
        var lightbox = this.lightbox,
            lbType = lightbox.get('data-lb');
        // If video lightbox, deleting content to stop video
        if (['vimeo', 'youtube'].indexOf(lbType) !== -1) {
            this.loadContentInLightbox('', lbType);
        }
        this.lightbox.addClass('lb-is-hidden');
    },
    getUrlParams: function(params) {
        // src: http://geekswithblogs.net/PhubarBaz/archive/2011/11/21/getting-query-parameters-in-javascript.aspx
        var result = {};
        params = params.slice(1).split("&");
        for (var i = 0; i < params.length; i++) {
            var tmp = params[i].split("=");
            result[tmp[0]] = unescape(tmp[1]);
        }
        return result;
    },
    isNumber: function(n) {
        // src: http://stackoverflow.com/a/1830844 <3
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
});