/*
 * Plugin Name: Vanilla-JS Tip Tap Tip
 * Version: 0.1.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUTipTapTip = function(item, options) {
    'use strict';
    var self = this;
    self.item = false;
    self.taptext = '';
    self.opt = {};

    /* ----------------------------------------------------------
      Init
    ---------------------------------------------------------- */

    self.init = function(item, opt) {
        if (!item) {
            return false;
        }
        self.opt = self.getOptions(opt);
        self.item = item;
        self.taptext = item.getAttribute('data-taptext').split('');
    };

    self.getOptions = function(opt) {
        var baseOptions = {
            delay: 50
        };

        if (typeof opt != 'object') {
            return baseOptions;
        }

        if (opt.delay && isNumber(opt.delay)) {
            baseOptions.delay = parseInt(opt.delay, 10);
        }

        return baseOptions;
    };

    /* ----------------------------------------------------------
      Launch
    ---------------------------------------------------------- */

    self.launch = function() {
        if (!self.item) {
            return false;
        }
        self.interval = setInterval(self.intervalTap, self.opt.delay);
    };

    self.intervalTap = function() {
        self.item.appendChild(document.createTextNode(self.taptext.shift()));
        if (self.taptext.length <= 0) {
            clearInterval(self.interval);
        }
    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    self.init(item, options);
};
