/*
 * Plugin Name: Lightbox
 * Version: 0.6
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Lightbox may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Selectors, Vanilla Classes, Vanilla AJAX, Vanilla Elements
 */

var vanillaLightbox = function(settings) {
    var self = this;
    self.els = {
        box: false,
        filter: false,
        content: false
    };
    self.defaultSettings = {};
    self.init = function(settings) {
        self.getSettings(settings);
        self.setElements();
        self.setEvents();
    };
    self.setElements = function() {
        var els = self.els;
        // Create box
        els.box = document.createElement("div")
            .addClass('lightbox')
            .addClass('fluid-lightbox')
            .addClass('lb-is-hidden');
        // Create filter
        els.filter = document.createElement("div")
            .addClass('lightbox-filter');
        els.box.appendChild(els.filter);
        // Create content
        els.content = document.createElement("div")
            .addClass('lightbox-content');
        els.box.appendChild(els.content);
        // Inject lightbox
        document.body.appendChild(els.box);
    };
    self.setEvents = function() {
        self.els.filter.addEvent('click', self.close);
        window.addEvent(window, 'keydown', function(e) {
            // Close on echap
            var keyPressed = e.keyCode ? e.keyCode : e.charCode;
            if (keyPressed === 27) {
                self.close();
            }
        });
    };
    self.setCloseBtn = function() {
        // Add a close event to each element in lightbox with a "btn-close" CSS class
        self.els.content.getElementsByClassName('btn-close').eachElement(function(el) {
            if (!el.hasClass('has-close-action')) {
                el.addEvent('click', self.close);
                el.addClass('has-close-action');
            }
        });
    };
    self.setContent = function(content) {
        self.els.content.innerHTML = content;
        self.setCloseBtn();
    };
    self.open = function() {
        self.els.box.removeClass('lb-is-hidden');
    };
    self.openLink = function(link) {
        var url = document.createElement('a');
        url.href = link;
        // Get details
        var urlExtension = url.pathname.split('.').pop().toLowerCase(),
            urlPathname = url.pathname.replace('/', ''),
            url_params = self.getUrlParams(url.search);

        // Detect Image
        if (['jpg', 'png', 'gif', 'bmp'].contains(urlExtension)) {
            self.openImage(link);
            return;
        }
        // Detect Youtube
        if ((url.hostname == 'youtube.com' || url.hostname == 'www.youtube.com') && url_params.v) {
            self.openVideo(url_params.v, 'youtube');
            return;
        }
        // Detect Vimeo
        if ((url.hostname == 'vimeo.com' || url.hostname == 'www.vimeo.com') && self.isNumber(urlPathname)) {
            self.openVideo(urlPathname, 'vimeo');
            return;
        }
        // Detect a local page
        if (document.location.hostname == url.hostname) {
            self.openAJAX(link);
            return;
        }
        // Default : open link in an iframe
        self.openIframe(link);
    };
    self.openAJAX = function(link) {
        new jsuAJAX({
            url: link,
            callback: function(content) {
                self.setContent(content);
                self.open();
            },
            data: 'ajax=1'
        });
    };
    self.openIframe = function(link) {
        var content = '<iframe width="580" height="377" src="' + link + '" frameborder="0"></iframe>';
        self.setContent(content);
        self.open();
    };
    self.openVideo = function(video_id, video_type) {
        var content = '';
        switch (video_type) {
            case 'youtube':
                content = '<iframe width="580" height="377" src="http://www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen></iframe>';
                break;
            case 'vimeo':
                content = '<iframe src="http://player.vimeo.com/video/' + video_id + '?autoplay=1" width="580" height="326" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                break;
        }
        self.setContent(content);
        self.open();
    };
    self.openImage = function(url) {
        var img = new Image();
        img.onload = function() {
            var cStyle = self.els.content.style,
                imgWidth = this.width,
                imgHeight = this.height,
                ratioImage = imgWidth / imgHeight,
                winWidth = getWindowInnerWidth() * 0.9,
                winHeight = getWindowInnerHeight() * 0.9,
                ratioWindow = winHeight / winWidth;

            if (ratioImage > ratioWindow) {
                // Window is larger
                imgHeight = Math.min(winHeight, imgHeight);
                imgWidth = imgHeight * ratioImage;
            }
            else {
                // Image is larger
                imgWidth = Math.min(winWidth, imgWidth);
                imgHeight = imgWidth / ratioImage;
            }

            // Set Lightbox style
            cStyle.height = imgHeight + 'px';
            cStyle.width = imgWidth + 'px';
            cStyle.overflow = 'hidden';

            // Load image into Lightbox
            self.setContent('<img src="' + url + '" alt="" />');

            // Open
            self.open();
        };
        img.src = url;
    };
    self.close = function(e) {
        if (e) {
            window.eventPreventDefault(e);
        }
        self.els.box.addClass('lb-is-hidden');
        // Reset style
        self.els.content.setAttribute('style', '');
        // Empty box
        self.els.content.innerHTML = '';
    };
    /* Utilities */
    self.getUrlParams = function(params) {
        // src: http://geekswithblogs.net/PhubarBaz/archive/2011/11/21/getting-query-parameters-in-javascript.aspx
        var result = {};
        params = params.slice(1).split("&");
        for (var i = 0; i < params.length; i++) {
            var tmp = params[i].split("=");
            result[tmp[0]] = unescape(tmp[1]);
        }
        return result;
    };
    self.isNumber = function(n) {
        // src: http://stackoverflow.com/a/1830844 <3
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    self.init(settings);
    return self;
};

vanillaLightbox.prototype.getSettings = function(settings) {
    var self = this;
    self.settings = {};
    // Set default values
    for (var attr in self.defaultSettings) {
        if (self.defaultSettings.hasOwnProperty(attr)) {
            self.settings[attr] = self.defaultSettings[attr];
        }
    }
    // Set new values
    for (var attr2 in settings) {
        if (self.settings.hasOwnProperty(attr2)) {
            self.settings[attr2] = settings[attr2];
        }
    }
};