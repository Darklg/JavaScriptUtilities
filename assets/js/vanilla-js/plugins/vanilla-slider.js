/*
 * Plugin Name: Slider
 * Version: 0.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Slider may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Elements, Vanilla Classes
 */

/* ----------------------------------------------------------
Slider
---------------------------------------------------------- */

/*
new vanillaSlider({
    slider: document.getElementById('slider')
});
*/

var vanillaSlider = function(settings) {
    var self = this;
    self.defaultSettings = {
        autoSlide: true,
        autoSlideDuration: 7000,
        createPagination: true,
        createNavigation: true,
        displayPagination: true,
        displayNavigation: true,
        nbSlides: 0,
        slides: false,
        slider: false,
        transition: function(oldSlide, newSlide, oldNb, nb, self) {
            newSlide.setStyles({
                'z-index': 2,
            });
            newSlide.addClass('active-slide');
            setTimeout(function() {
                newSlide.setStyles({
                    'z-index': 1,
                });
                if (oldNb !== nb) {
                    oldSlide.setStyles({
                        'z-index': 0
                    });
                    oldSlide.removeClass('active-slide');
                }
                // Authorizing a new slide
                self.canSlide = 1;
            }, 300);
        }
    };
    self.canSlide = 1;
    self.currentSlide = 0;
    self.navigationEl = false;
    self.pagers = false;
    self.paginationEl = false;
    self.autoSlideTimeout = false;
    self.init = function(settings) {
        self.getSettings(settings);
        if (!self.settings.slider) {
            return;
        }
        self.setElements();
        self.setEvents();
        self.goToSlide('init');
    };

    self.setElements = function() {
        var settings = self.settings,
            slider = settings.slider,
            tmpEl = false;

        // Wrap slider
        if (!self.wrapper) {
            self.wrapper = wrapElement(slider);
            self.wrapper
                .addClass('dk-jsu-slider-wrapper')
                .addClass('vanilla-slider');
        }

        // Get slides
        settings.slides = slider.getChildren();
        settings.nbSlides = settings.slides.length;

        // Add class to slider
        slider.addClass('dk-jsu-slider');

        // Set slides
        for (var i = 0; i < settings.nbSlides; i++) {
            settings.slides[i].addClass('dk-jsu-slide');
        }

        // Set Navigation
        if (settings.displayNavigation && settings.createNavigation) {
            self.navigationEl = document.createElement('div').addClass('navigation');
            // Prev
            tmpEl = document.createElement('div');
            tmpEl.setAttribute('data-rel', 'prev');
            tmpEl.addClass('prev').innerHTML = 'prev';
            self.navigationEl.appendChild(tmpEl);
            // Next
            tmpEl = document.createElement('div');
            tmpEl.setAttribute('data-rel', 'next');
            tmpEl.addClass('next').innerHTML = 'next';
            self.navigationEl.appendChild(tmpEl);
            // Set navigation element
            self.wrapper.appendChild(self.navigationEl);
        }

        // Set Pagination
        if (settings.displayPagination && settings.createPagination) {
            self.paginationEl = document.createElement('div').addClass('pagination');
            // Create bullets
            for (var j = 0; j < settings.nbSlides; j++) {
                tmpEl = document.createElement('span');
                tmpEl.setAttribute('data-i', j);
                tmpEl.innerHTML = '&bull;';
                self.paginationEl.appendChild(tmpEl);
            }
            // Set pagination element
            self.wrapper.appendChild(self.paginationEl);
            self.pagers = self.paginationEl.children;
        }

    };
    self.setEvents = function() {
        var settings = self.settings,
            slider = settings.slider,
            tmpEls, tmpEl;

        // Navigation
        if (settings.displayNavigation && self.navigationEl) {
            self.navigationEl.children.eachElement(function(el) {
                el.addEvent('click', function(e) {
                    window.eventPreventDefault(e);
                    self.goToSlide(this.getAttribute('data-rel'));
                });
            });
        }

        // Pagination
        if (settings.displayPagination && self.paginationEl) {
            self.paginationEl.children.eachElement(function(el) {
                el.addEvent('click', function(e) {
                    window.eventPreventDefault(e);
                    var i = parseInt(this.getAttribute('data-i'), 10);
                    self.goToSlide(i);
                });
            });
        }

        // Auto slide
        self.setAutoSlide();
        slider.addEvent('mouseover', self.clearAutoSlide);
        slider.addEvent('mousemove', self.clearAutoSlide);
        slider.addEvent('mouseout', self.setAutoSlide);
    };
    self.clearAutoSlide = function() {
        clearTimeout(self.autoSlideTimeout);
    };
    self.setAutoSlide = function() {
        var settings = self.settings;
        if (settings.autoSlide) {
            self.clearAutoSlide();
            self.autoSlideTimeout = setTimeout(function() {
                self.goToSlide('next');
                self.setAutoSlide();
            }, settings.autoSlideDuration);
        }
    };
    self.goToSlide = function(nb) {
        var settings = self.settings,
            oldNb = self.currentSlide,
            newNb = nb,
            slides = settings.slides;

        if (nb === 'init') {
            nb = 0;
        }

        if (nb === 'prev') {
            nb = self.currentSlide - 1;
        }

        if (nb === 'next') {
            nb = self.currentSlide + 1;
        }

        if (nb < 0) {
            nb = settings.nbSlides - 1;
        }

        if (nb >= settings.nbSlides) {
            nb = 0;
        }

        if (self.canSlide !== 1 || (nb == oldNb && newNb !== 'init') || !slides[nb]) {
            return 0;
        }

        self.canSlide = 0;

        oldSlide = slides[oldNb];
        newSlide = slides[nb];

        if (typeof settings.transition == 'function') {
            settings.transition(oldSlide, newSlide, oldNb, nb, self);
        }
        else {
            // Default transition.
            oldSlide.setStyles({
                'z-index': 0
            });
            newSlide.setStyles({
                'z-index': 1
            });
            self.canSlide = 1;
        }
        if (settings.displayPagination && self.pagers[nb]) {
            self.pagers.eachElement(function(el) {
                el.removeClass('current');
            });
            self.pagers[nb].addClass('current');
        }

        // Current slide = asked slide
        self.currentSlide = nb;
    };
    self.init(settings);
    return self;
};

/* Get Settings */
vanillaSlider.prototype.getSettings = function(settings) {
    this.settings = {};
    // Set default values
    for (var attr in this.defaultSettings) {
        this.settings[attr] = this.defaultSettings[attr];
    }
    // Set new values
    for (var attr2 in settings) {
        this.settings[attr2] = settings[attr2];
    }
};