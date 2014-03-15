/*
 * Plugin Name: Slider
 * Version: 0.2
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
    var self = this,
        defaultSettings = {
            autoSlide: true,
            autoSlideDuration: 7000,
            nbSlides: 0,
            currentSlide: 0,
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
    self.getSettings = function(settings) {
        self.settings = {};
        // Set default values
        for (var attr in defaultSettings) {
            self.settings[attr] = defaultSettings[attr];
        }
        // Set new values
        for (var attr2 in settings) {
            self.settings[attr2] = settings[attr2];
        }
    };
    self.setElements = function() {
        var settings = self.settings,
            slider = settings.slider,
            wrapper;

        // Wrap slider
        if (!settings.wrapper) {
            self.wrapper = wrapElement(slider);
            self.wrapper.addClass('dk-jsu-slider-wrapper');
        }

        // Get slides
        settings.slides = slider.getChildren();
        settings.nbSlides = settings.slides.length;

        // Add class to slider
        slider.addClass('dk-jsu-slider');
        slider.setStyles({
            'position': 'relative',
            'z-index': 0
        });

        for (var i = 0; i < settings.nbSlides; i++) {
            settings.slides[i].addClass('dk-jsu-slide');
            settings.slides[i].setStyles({
                'position': 'absolute',
                'z-index': 0,
                'left': 0,
                'top': 0
            });
        }
    };
    self.setEvents = function() {
        var settings = self.settings,
            slider = settings.slider;
        slider.addEvent('click', function(e) {
            window.eventPreventDefault(e);
            self.goToSlide('next');
        });
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
            oldNb = settings.currentSlide,
            newNb = nb,
            slides = settings.slides;

        if (nb === 'init') {
            nb = 0;
        }

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

        // Current slide = asked slide
        settings.currentSlide = nb;
    };
    self.init(settings);
    return self;
};