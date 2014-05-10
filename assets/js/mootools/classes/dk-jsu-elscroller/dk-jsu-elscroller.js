/*
 * Plugin Name: Element Scroller
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Element Scroller may be freely distributed under the MIT license.
 */
/* ----------------------------------------------------------
  Element scroller
---------------------------------------------------------- */
/*
    new elementScroller($('main-scroller'));
*/

var elementScroller = function(el) {
    this.els = el.getChildren();

    var self = this,
        nbEls = this.els.length,
        // Get element width
        elWidth = parseInt(el.get('data-elwidth'), 10),
        elHeight = parseInt(el.get('data-elheight'), 10),
        // Get margin
        elMargin = parseInt(el.get('data-margin'), 10),
        // Get full element width
        elFWidth = elMargin + elWidth;

    this.init = function() {
        if (el.hasClass('dk-jsu-elscroller')) {
            return false;
        }

        this.getDimensions();

        if (nbEls <= this.elPerPage) {
            return false;
        }

        el.addClass('dk-jsu-elscroller');

        // Set datas
        this.currentPage = 0;
        this.curLeft = 0;

        this.setElements();
        this.setEvents();

        this.goToPage(0);
    };

    this.getDimensions = function() {
        // Get container width
        self.elContWidth = el.hasClass('dk-jsu-elscroller') ? self.wrapper.getWidth() : el.getWidth();
        // Get elements per page
        self.elPerPage = Math.floor(self.elContWidth / elFWidth);
        // Get page width
        self.elPageWidth = elFWidth * self.elPerPage;
        // Get max page
        self.elMaxPage = Math.floor((nbEls - 1) / self.elPerPage);
        // Get max left
        self.maxLeft = self.elMaxPage * self.elPageWidth;
    };

    // Go to page
    this.goToPage = function(nb) {
        self.container.removeClass('is-first');
        self.container.removeClass('is-last');
        var newLeft = 0;
        if (nb == 'next') {
            nb = self.currentPage + 1;
        }
        if (nb == 'prev') {
            nb = self.currentPage - 1;
        }
        if (nb < 0) {
            nb = self.elMaxPage;
        }
        if (nb > self.elMaxPage) {
            nb = 0;
        }
        newLeft = 0 - (nb * self.elPageWidth);
        el.tween('left', [self.curLeft, newLeft]);

        self.currentPage = nb;
        self.curLeft = newLeft;

        if (nb === 0) {
            self.container.addClass('is-first');
        }
        if (nb == self.elMaxPage) {
            self.container.addClass('is-last');
        }
    };

    this.setElements = function() {

        // Create container
        this.container = new Element('div.elscroller');

        // Create wrapper
        this.wrapper = new Element('div.elscroller__wrapper');
        this.wrapper.wraps(el);
        this.container.wraps(this.wrapper);

        // Create Navigation
        this.nav = new Element('div.elscroller__navigation');
        this.navPrev = new Element('div.elscroller__navigation_el.prev');
        this.navNext = new Element('div.elscroller__navigation_el.next');
        this.navPrev.set('html', '&#9664;');
        this.navNext.set('html', '&#9654;');
        this.nav.adopt(this.navPrev);
        this.nav.adopt(this.navNext);
        this.container.adopt(this.nav);

        // Set initial style
        this.wrapper.setStyles({
            'position': 'relative',
            'min-height': elHeight,
            'overflow': 'hidden'
        });
        el.setStyles({
            'width': nbEls * elFWidth,
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'z-index': 1
        });
        this.els.setStyles({
            'width': elWidth,
            'margin-right': elMargin,
            'float': 'left'
        });

        // Set tween
        el.set('tween', {
            'duration': 300
        });
    };

    this.setEvents = function() {
        // Set events
        this.navNext.addEvent('click', function(e) {
            e.preventDefault();
            self.goToPage('next');
        });
        this.navPrev.addEvent('click', function(e) {
            e.preventDefault();
            self.goToPage('prev');
        });
        $(window).addEvent('resize', function(e) {
            self.goToPage(0);
            self.getDimensions();
        });
    };

    this.init();
};