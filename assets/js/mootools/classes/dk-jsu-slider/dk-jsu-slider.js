/*
 * Plugin Name: Slider
 * Version: 1.3.7
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
new dkJSUSlider($('target-slider'), {
    autoSlideDuration: 5000
});
*/
var dkJSUSlider = new Class({
    settings: {},
    defaultSettings: {
        autoSlide: true,
        autoSlideDuration: 2000,
        showNavigation: true,
        showPagination: true,
        createNavigation: true,
        createPagination: true,
        currentSlide: 0,
        keyboardActions: true,
        transition: function(oldSlide, newSlide, nb, self) {
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
    mouseInside: false,
    navigation: false,
    pagination: false,
    pagers: [],
    initialize: function(el, settings) {
        // Check if element exists and slider isn't initialized
        if (!el || el.hasClass('dk-jsu-slider')) return false;

        el.addClass('dk-jsu-slider');

        this.slider = el;

        // get settings
        this.getSettings(settings);

        // Set Slides
        this.setSlides();

        if (this.settings.nbSlides > 1) {

            // Set Elements
            this.setElements();

            // Set Events
            this.setEvents();

            // Set Slide 0
            this.slides[0].setStyles({
                'z-index': 1
            });
            if (this.settings.showPagination && this.pagers[0]) {
                this.pagers[0].addClass('current');
            }
        }
    },
    // Obtaining user settings
    getSettings: function(settings) {
        if (typeof settings != 'object') {
            settings = {};
        }
        this.settings = Object.merge({}, this.defaultSettings, settings);
    },
    setSlides: function() {
        this.slides = this.slider.getChildren();
        this.settings.nbSlides = this.slides.length;
        this.slides.each(function(el) {
            el.addClass('dk-jsu-slide');
        });
    },
    setElements: function() {
        var settings = this.settings;

        this.wrapper = new Element('div.dk-jsu-slider-wrapper');
        this.wrapper.wraps(this.slider);

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

        if (settings.showNavigation && settings.createNavigation) {
            // Set Navigation
            this.navigation = new Element('div.navigation');
            this.navigation.set('html', '<div class="prev">prev</div><div class="next">next</div>');
            this.navigation.getChildren().setStyles(this.defaultPagiStyles);
            this.wrapper.adopt(this.navigation);
        }
        if (settings.showPagination && settings.createPagination) {
            // Set Pagination
            this.pagination = new Element('div.pagination');
            for (var i = 0; i < settings.nbSlides; i++) {
                this.pagers[i] = new Element('span').set('html', '&bull;').set('data-i', i);
                this.pagination.adopt(this.pagers[i]);
            }
            this.pagination.setStyles(this.defaultPagiStyles);
            this.wrapper.adopt(this.pagination);
        }
    },
    setEvents: function() {
        var self = this,
            settings = this.settings;

        if (settings.showNavigation && self.navigation) {
            self.navigation.getElements('.next').addEvent('click', function(e) {
                if (e) e.preventDefault();
                self.gotoSlide('next');
            });
            self.navigation.getElements('.prev').addEvent('click', function(e) {
                if (e) e.preventDefault();
                self.gotoSlide('prev');
            });
        }

        if (settings.showPagination && self.pagination) {
            self.pagers.each(function(el) {
                el.addEvent('click', function(e) {
                    if (e) e.preventDefault();
                    self.gotoSlide(parseInt(this.get('data-i'), 10));
                });
            });
        }

        if (settings.autoSlide) {
            self.autoSlideEvent();
            // autoSlide stops on mouse enter and restarts on leave
            self.wrapper.addEvents({
                mouseenter: function() {
                    self.mouseInside = true;
                    clearTimeout(self.autoSlideTimeout);
                },
                mouseleave: function() {
                    self.mouseInside = false;
                    self.autoSlideEvent();
                }
            });
        }

        self.slider.addEvents({
            prevslide: function() {
                self.gotoSlide('prev');
            },
            nextslide: function() {
                self.gotoSlide('next');
            }
        });

        if (settings.keyboardActions) {
            $(window).addEvents({
                keydown: function(e) {
                    if (e.key && document.activeElement) {
                        // If is not focused
                        if (['input', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase()) == -1) {
                            // Setting events
                            if (e.key == 'left') {
                                self.gotoSlide('prev');
                            }
                            if (e.key == 'right') {
                                self.gotoSlide('next');
                            }
                        }
                    }
                }
            });
        }
    },
    autoSlideEvent: function() {
        var self = this,
            settings = this.settings;
        if (self.mouseInside) {
            return;
        }
        clearTimeout(self.autoSlideTimeout);
        self.autoSlideTimeout = setTimeout(function() {
            self.gotoSlide('next');
        }, settings.autoSlideDuration);
    },
    gotoSlide: function(nb) {
        var settings = this.settings,
            oldNb = this.settings.currentSlide;

        // Clearing timeout
        if (settings.autoSlide) {
            this.autoSlideEvent();
        }

        if (this.canSlide !== 1 || nb == oldNb) {
            return 0;
        }

        this.canSlide = 0;

        if (nb === 'prev') {
            nb = settings.currentSlide - 1;
        }

        if (nb === 'next') {
            nb = settings.currentSlide + 1;
        }

        if (nb < 0) {
            nb = settings.nbSlides - 1;
        }

        if (nb >= settings.nbSlides) {
            nb = 0;
        }

        oldSlide = this.slides[oldNb];
        newSlide = this.slides[nb];

        if (typeof this.settings.transition == 'function') {
            this.settings.transition(oldSlide, newSlide, nb, this);
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
        settings.currentSlide = nb;
        if (settings.showPagination && this.pagers[nb]) {
            this.pagers.each(function(el) {
                el.removeClass('current');
            });
            this.pagers[nb].addClass('current');
        }
    }
});