/*
 * Plugin Name: Lightbox
 * Version: 1.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Lightbox may be freely distributed under the MIT license.
 */
/* ----------------------------------------------------------
   Lightbox
---------------------------------------------------------- */
/*
TODO : class & zindex perso
TODO : Stop lightbox launch if already opening
*/
/*
new dkJSULightbox({
    'triggers' : $$('.lightbox-me')
});
*/
var dkJSULightbox = new Class({
    defaultSettings: {
        triggers: false,
        removeScrollIframe: false,
        htmlCloseButton: '<div class="main-close-lightbox btn-close-lightbox">&times;</div>',
        callback: function() {}
    },
    initialize: function(settings) {
        if (window.hasDkJSULightbox) {
            return false;
        }
        window.hasDkJSULightbox = true;
        this.getSettings(settings);
        if (!settings.triggers) {
            return;
        }
        this.createLightBox();
        this.setEvents();
    },
    // Obtaining user settings
    getSettings: function(settings) {
        if (typeof settings != 'object') {
            settings = {};
        }
        this.settings = Object.merge({}, this.defaultSettings, settings);
    },
    createLightBox: function() {
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
            settings = this.settings;
        // Click on trigger : Open Lightbox
        settings.triggers.addEvent('click', function(e) {
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
        // Click on prev next
        this.lightbox.addEvent('click:relay(.btn-go-lightbox)', function(e) {
            e.preventDefault();
            if ($(this).hasClass('prev')) {
                self.goToImage('prev');
            }
            else {
                self.goToImage('next');
            }
        });
        $(window).addEvent('keydown', function(e) {
            if (!e.key) {
                return;
            }
            switch (e.key) {
                case 'esc':
                    self.closeLightbox();
                    break;
                case 'right':
                    self.goToImage('next');
                    break;
                case 'left':
                    self.goToImage('prev');
                    break;
                default:
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
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].indexOf(urlExtension) >= 0) {
            this.openImage(link.href, link);
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
        this.loadContentInLightbox(this.settings.htmlCloseButton + '<iframe ' + (this.settings.removeScrollIframe ? 'scrolling="no"' : '') + ' src="' + url + '" />', 'iframe');
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
                self.loadContentInLightbox(self.settings.htmlCloseButton + response, 'content');
                self.openLightbox();
            }
        }).send();
    },
    openMessage: function(msg) {
        this.loadContentInLightbox(this.settings.htmlCloseButton + '<p>' + msg + '</p>', 'message');
        this.openLightbox();
    },
    openImage: function(url, link) {
        var self = this;
        // Get images selector
        self.imagesGallery = '';
        self.currentImage = '';

        // Check for lightbox name
        if ($(link).get('data-lightboxname') && !self.imagesGallery) {
            var lbname = '[data-lightboxname="' + $(link).get('data-lightboxname') + '"]';
            self.imagesGallery = $$(lbname);
            self.imagesGallery.each(function(el, i) {
                if (el.href == url) {
                    self.currentImage = i;
                }
            });
        }

        // Load image
        var imageURL = new Image();
        imageURL.src = url;
        new Asset.image(url, {
            onLoad: function() {
                // Getting image size
                var imageWidth = imageURL.width,
                    imageHeight = imageURL.height,
                    imageRatio = imageWidth / imageHeight,
                    content = self.settings.htmlCloseButton;

                if (self.imagesGallery.length > 1) {
                    content += '<div class="prev btn-go-lightbox"></div><div class="next btn-go-lightbox"></div>';
                }

                // Loading image with CSS style
                self.loadContentInLightbox(content + '<img width="' + imageWidth + '" height="' + imageHeight + '" src="' + url + '" alt="" />', 'image', {
                    'text-align': 'center',
                    'width': imageWidth,
                    'height': imageHeight
                });
                self.openLightbox();
            }
        });
    },
    goToImage: function(nb) {
        var self = this;
        if (!self.imagesGallery) {
            return false;
        }
        var nbImages = self.imagesGallery.length;

        if (nb == 'next') {
            nb = self.currentImage + 1;
        }

        if (nb == 'prev') {
            nb = self.currentImage - 1;
        }

        if (nb < 0) {
            nb = nbImages - 1;
        }

        if (nb >= nbImages) {
            nb = 0;
        }

        self.openLink(self.imagesGallery[nb]);

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
        if (typeof this.settings.callback == 'function') {
            this.settings.callback();
        }
    },
    closeLightbox: function() {
        var lightbox = this.lightbox,
            lbType = lightbox.get('data-lb');
        // If video lightbox, deleting content to stop video
        if (['vimeo', 'youtube'].indexOf(lbType) !== -1) {
            this.loadContentInLightbox('', lbType);
        }
        this.lightbox.addClass('lb-is-hidden');
        this.imagesGallery = '';
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