/*
 * Plugin Name: Slider
 * Version: 1.0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Slider may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
   Slider
---------------------------------------------------------- */

/*
TODO :
- Use existing pagination
*/

/*
new dkJSUSlider({
    'slider' : $('target-slider')
});
*/
var dkJSUSlider = new Class({
    opt: {
        autoSlide: true,
        autoSlideDuration: 5000,
        showNavigation: true,
        showPagination: true,
        createNavigation: true,
        createPagination: true,
        currentSlide: 0,
        transition: function(oldSlide, newSlide, self) {
            newSlide.setStyles({
                'opacity': 0,
                'z-index': 2
            }).set("tween", {
                duration: '300',
                transition: 'linear',
                onComplete: function() {
                    oldSlide.setStyles({
                        'z-index': 0
                    });
                    newSlide.setStyles({
                        'z-index': 1
                    });
                    // Authorizing a new slide
                    self.canSlide = 1;
                }
            }).tween("opacity", [0, 1]);
        }
    },
    autoSlideTimeout: false,
    canSlide: 1,
    defaultPagiStyles: {
        'position': 'absolute',
        'z-index': 3
    },
    navigation: false,
    pagination: false,
    pagers: [],
    initialize: function(opt) {
        // Check if element exists and slider isn't initialized
        if (!opt.slider || opt.slider.hasClass('dk-jsu-slider')) return false;

        opt.slider.addClass('dk-jsu-slider');

        // Set options
        this.setOptions(opt);

        // Set Slides
        this.setSlides();

        // Set Elements
        this.setElements();

        // Set Events
        this.setEvents();

        // Set Slide 0
        this.slides[0].setStyles({
            'z-index': 1
        });
        if (this.opt.showPagination && this.pagers[0]) {
            this.pagers[0].addClass('current');
        }
    },
    setOptions: function(opt) {
        this.opt = Object.merge(this.opt, opt);
        this.slider = opt.slider;
    },
    setSlides: function() {
        this.slides = this.slider.getChildren();
        this.opt.nbSlides = this.slides.length;
    },
    setElements: function() {
        var opt = this.opt;

        // Style slider
        this.slider.setStyles({
            'position': 'relative'
        });

        // Style slides
        this.slides.setStyles({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'height': '100%',
            'width': '100%',
            'z-index': 0
        });

        if (opt.showNavigation && opt.createNavigation) {
            // Set Navigation
            this.navigation = new Element('div.navigation');
            this.navigation.set('html', '<div class="prev">prev</div><div class="next">next</div>');
            this.navigation.setStyles(this.defaultPagiStyles);
            this.slider.adopt(this.navigation);
        }
        if (opt.showPagination && opt.createPagination) {
            // Set Pagination
            this.pagination = new Element('div.pagination');
            for (var i = 0; i < opt.nbSlides; i++) {
                this.pagers[i] = new Element('span').set('html', '&bull;').set('data-i', i);
                this.pagination.adopt(this.pagers[i]);
            }
            this.pagination.setStyles(this.defaultPagiStyles);
            this.slider.adopt(this.pagination);
        }
    },
    setEvents: function() {
        var self = this,
            opt = this.opt;

        if (opt.showNavigation && self.navigation) {
            self.navigation.getElements('.next').addEvent('click', function(e) {
                e.preventDefault();
                self.gotoSlide('next');
            });
            self.navigation.getElements('.prev').addEvent('click', function(e) {
                e.preventDefault();
                self.gotoSlide('prev');
            });
        }

        if (opt.showPagination && self.pagination) {
            self.pagers.each(function(el) {
                el.addEvent('click', function(e) {
                    e.preventDefault();
                    self.gotoSlide(parseInt(this.get('data-i'), 10));
                });
            });
        }

        if (opt.autoSlide) {
            self.autoSlideEvent();

            // autoSlide stops on mouse enter and restarts on leave
            self.slider.addEvents({
                mouseenter: function() {
                    clearTimeout(self.autoSlideTimeout);
                },
                mouseleave: function() {
                    self.autoSlideEvent();
                }
            });
        }
    },
    autoSlideEvent: function() {
        var self = this,
            opt = this.opt;
        self.autoSlideTimeout = setTimeout(function() {
            self.gotoSlide('next');
            self.autoSlideEvent();
        }, opt.autoSlideDuration);
    },
    gotoSlide: function(nb) {
        var opt = this.opt,
            oldNb = this.opt.currentSlide;

        if (this.canSlide !== 1 || nb == oldNb) {
            return 0;
        }

        this.canSlide = 0;

        if (nb === 'prev') {
            nb = opt.currentSlide - 1;
        }

        if (nb === 'next') {
            nb = opt.currentSlide + 1;
        }

        if (nb < 0) {
            nb = opt.nbSlides - 1;
        }

        if (nb >= opt.nbSlides) {
            nb = 0;
        }

        oldSlide = this.slides[oldNb];
        newSlide = this.slides[nb];

        if (typeof this.opt.transition == 'function') {
            this.opt.transition(oldSlide, newSlide, this);
        }
        else {
            // Default transition.
            oldSlide.setStyles({
                'z-index': 0
            });

            newSlide.setStyles({
                'z-index': 1
            });
            this.canSlide = 1;
        }
        opt.currentSlide = nb;
        if (opt.showPagination && this.pagers[nb]) {
            this.pagers.each(function(el) {
                el.removeClass('current');
            });
            this.pagers[nb].addClass('current');
        }
    }
});