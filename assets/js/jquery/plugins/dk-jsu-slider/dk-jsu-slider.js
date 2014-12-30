/*
 * Plugin Name: Slider
 * Version: 1.2.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Slider may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Slider
---------------------------------------------------------- */

/*
 * jQuery('.selector').dkJSUSlider();
 */

if (!jQuery.fn.dkJSUSlider) {
    (function($, window, document) {
        // Main Class
        var dkJSUSlider = {
            settings: {},
            defaultSettings: {
                autoSlide: true,
                autoSlideForce: false,
                autoSlideDuration: 7000,
                bulletsType: 'default',
                createNavigation: true,
                createPagination: true,
                currentSlide: 0,
                keyboardActions: true,
                loopBeforeFirst: true,
                loopAfterLast: true,
                showNavigation: true,
                showPagination: true,
                transition: function(oldSlide, newSlide, oldNb, nb, self) {
                    newSlide.css({
                        'opacity': 0,
                        'z-index': 2
                    }).animate({
                        'opacity': 1
                    }, 300);
                    setTimeout(function() {
                        oldSlide.css({
                            'z-index': 0
                        });
                        newSlide.css({
                            'z-index': 1
                        });
                        // Authorizing a new slide
                        self.canSlide = 1;
                    }, 300);
                },
                wrapperClassName: ''
            },
            autoSlideTimeout: false,
            canSlide: 1,
            mouseInside: false,
            navigation: false,
            pagination: false,
            pagers: [],
            init: function(el, settings) {
                this.slider = el;
                this.getSettings(settings);
                this.setSlides();
                if (this.settings.nbSlides > 1) {
                    this.setElements();
                    this.setEvents();
                    // Set Slide 0
                    this.slides.eq(0).css({
                        'z-index': 1
                    });
                    if (this.settings.showPagination && this.pagers[0]) {
                        this.pagers[0].addClass('current');
                    }
                    el.trigger('sliderready', 1);
                }
            },
            // Obtaining user settings
            getSettings: function(settings) {
                if (typeof settings != 'object') {
                    settings = {};
                }
                this.settings = $.extend(true, {}, this.defaultSettings, settings);
            },
            // Setting slides
            setSlides: function() {
                this.slides = this.slider.children();
                this.settings.nbSlides = this.slides.length;
                this.slides.each(function() {
                    jQuery(this).addClass('dk-jsu-slide');
                });
            },
            // Creating & setting elements
            setElements: function() {
                var self = this,
                    settings = this.settings;

                // Wrapper
                this.slider.wrap(jQuery('<div class="dk-jsu-slider-wrapper"></div>'));
                this.wrapper = this.slider.parent();
                this.wrapper.addClass(settings.wrapperClassName);

                // Set Navigation
                if (settings.showNavigation && settings.createNavigation) {
                    this.navigation = jQuery('<div class="navigation"><div class="prev">prev</div><div class="next">next</div></div>');
                    this.wrapper.append(this.navigation);
                }

                // Set Pagination
                if (settings.showPagination && settings.createPagination) {
                    var bullet = '';
                    this.pagination = jQuery('<div class="pagination"></div>');

                    for (var i = 0; i < settings.nbSlides; i++) {
                        bullet = '&bull;';
                        if (settings.bulletsType == 'numbers') {
                            bullet = i + 1;
                        }

                        this.pagers[i] = jQuery('<span data-i="' + i + '">' + bullet + '</span>');
                        this.pagination.append(this.pagers[i]);
                    }
                    this.wrapper.append(this.pagination);
                }

            },
            // Setting events
            setEvents: function() {
                var self = this,
                    settings = this.settings;

                self.slider
                    .on('prevslide', function() {
                        self.gotoSlide('prev');
                    })
                    .on('nextslide', function() {
                        self.gotoSlide('next');
                    });

                // Pagination
                if (settings.showPagination && self.pagination) {
                    self.pagination.on('click', '[data-i]', function(e) {
                        if (e) e.preventDefault();
                        self.gotoSlide(parseInt(jQuery(this).attr('data-i'), 10));
                    });
                }

                // Auto slide
                if (settings.autoSlide) {
                    self.autoSlideEvent();

                    if (!settings.autoSlideForce) {
                        // autoSlide stops on mouse enter and restarts on leave
                        self.wrapper.on('mouseenter', function() {
                            self.mouseInside = true;
                            clearTimeout(self.autoSlideTimeout);
                        }).on('mouseleave', function() {
                            self.mouseInside = false;
                            self.autoSlideEvent();
                        });
                    }
                }

                // Navigation
                if (settings.showNavigation && self.navigation) {
                    self.navigation.children().on('click', function(e) {
                        if (e) e.preventDefault();
                        if (jQuery(this).hasClass('prev')) {
                            self.gotoSlide('prev');
                        }
                        if (jQuery(this).hasClass('next')) {
                            self.gotoSlide('next');
                        }
                    });
                }

                // Keyboard navigation
                if (settings.keyboardActions) {
                    jQuery(window).on('keydown', function(e) {
                        if (e.keyCode && document.activeElement) {
                            // If is not focused
                            if (['input', 'textarea'].indexOf(document.activeElement.tagName.toLowerCase()) == -1) {
                                // Setting events
                                if (e.keyCode == 37) {
                                    self.gotoSlide('prev');
                                }
                                if (e.keyCode == 39) {
                                    self.gotoSlide('next');
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
            isPageVisible: function() {
                var isVisible = true;
                if ("visibilityState" in document && document.visibilityState === 'hidden') {
                    isVisible = false;
                }
                return isVisible;
            },
            gotoSlide: function(nb) {
                var self = this,
                    settings = this.settings,
                    oldNb = this.settings.currentSlide,
                    origNb = nb;

                // Pause slider if page is hidden.
                if (!self.isPageVisible()) {
                    return;
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

                if (!settings.loopBeforeFirst && origNb == 'prev' && nb == (settings.nbSlides - 1)) {
                    return 0;
                }

                if (!settings.loopAfterLast && origNb == 'next' && nb === 0) {
                    return 0;
                }

                if (this.canSlide !== 1 || nb == oldNb) {
                    return 0;
                }

                this.canSlide = 0;

                // Clear timeout & relauch autoslide
                if (settings.autoSlide) {
                    self.autoSlideEvent();
                }

                this.settings.currentSlide = nb;
                oldSlide = this.slides.eq(oldNb);
                newSlide = this.slides.eq(nb);

                if (typeof this.settings.transition == 'function') {
                    this.settings.transition(oldSlide, newSlide, oldNb, nb, this);
                }
                else {
                    oldSlide.css({
                        'z-index': 0
                    });

                    newSlide.css({
                        'z-index': 1
                    });
                }

                if (settings.showPagination && this.pagers[nb]) {
                    var pagers = self.pagination.children();
                    pagers.removeClass('current');
                    pagers.eq(nb).addClass('current');
                }

            }
        };
        // Using the dkJSUSlider class as a jQuery plugin
        $.fn.dkJSUSlider = function(settings) {
            this.each(function() {
                var $this = $(this),
                    dataPlugin = 'plugin_dkjsuslider';
                // Handling duplicate calls
                if (!$this.hasClass(dataPlugin)) {
                    $.extend(true, {}, dkJSUSlider).init($this, settings);
                    $this.addClass(dataPlugin);
                }
            });
            return this;
        };
    })(jQuery, window, document);
}