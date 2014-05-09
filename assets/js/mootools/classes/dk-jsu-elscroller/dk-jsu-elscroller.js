/*
 * Plugin Name: Element Scroller
 * Version: 0.1
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
    var self = this,
        els = el.getChildren(),
        // Get element width
        elWidth = parseInt(el.get('data-elwidth'), 10),
        elHeight = els[0].getHeight(),
        // Get elements per page
        nbEls = els.length,
        elPerPage = parseInt(el.get('data-perpage'), 10),
        // Get margin
        elMargin = parseInt(el.get('data-margin'), 10),
        // Get full element width
        elFWidth = elMargin + elWidth,
        // Get page width
        elPageWidth = elFWidth * elPerPage,
        // Get max page
        elMaxPage = Math.floor((nbEls - 1) / elPerPage),
        // Get max left
        maxLeft = elMaxPage * elPageWidth;

    if (nbEls <= elPerPage) {
        return false;
    }

    // Set datas
    this.currentPage = 0;
    this.curLeft = 0;

    // Functions
    this.goToPage = function(nb) {
        var newLeft = 0;
        if (nb == 'next') {
            nb = self.currentPage + 1;
        }
        if (nb == 'prev') {
            nb = self.currentPage - 1;
        }
        if (nb < 0) {
            nb = elMaxPage;
        }
        if (nb > elMaxPage) {
            nb = 0;
        }
        newLeft = 0 - (nb * elPageWidth);
        el.tween('left', [self.curLeft, newLeft]);

        self.currentPage = nb;
        self.curLeft = newLeft;
    };

    // Create wrapper
    this.wrapper = new Element('div.wrapper');
    this.wrapper.wraps(el);

    // Create Navigation
    this.nav = new Element('div.nav');
    this.nav.setStyles({
        'position': 'absolute'
    });
    this.navPrev = new Element('div.prev');
    this.navPrev.set('html', 'prev');
    this.nav.adopt(this.navPrev);
    this.navNext = new Element('div.next');
    this.navNext.set('html', 'next');
    this.nav.adopt(this.navNext);
    this.wrapper.adopt(this.nav);

    // Set initial style
    this.wrapper.setStyles({
        'position': 'relative',
        'height': elHeight,
        'width': elPageWidth,
        'overflow': 'hidden'
    });
    el.setStyles({
        'width': (elMaxPage + 1) * elPageWidth,
        'position': 'absolute',
        'left': 0,
        'top': 0
    });
    els.setStyles({
        'width': elWidth,
        'margin-right': elMargin,
        'float': 'left'
    });

    // Set tween
    el.set('tween', {
        'duration': 300
    });

    // Create events
    this.navNext.addEvent('click', function(e) {
        e.preventDefault();
        self.goToPage('next');
    });
    this.navPrev.addEvent('click', function(e) {
        e.preventDefault();
        self.goToPage('prev');
    });
};