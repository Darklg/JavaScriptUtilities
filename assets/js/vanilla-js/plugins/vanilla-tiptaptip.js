/*
 * Plugin Name: Vanilla-JS Tip Tap Tip
 * Version: 0.1
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
        var options = {
            delay: 50
        };

        if (typeof opt != 'object') {
            return options;
        }

        if (opt.delay && isNumber(opt.delay)) {
            options.delay = parseInt(opt.delay, 10);
        }

        return options;
    };

    /* ----------------------------------------------------------
      Launch
    ---------------------------------------------------------- */

    self.launch = function() {
        if (!self.item) {
            return false;
        }
        var interval = setInterval(function() {
            self.item.appendChild(document.createTextNode(self.taptext.shift()));
            if (self.taptext.length <= 0) {
                clearInterval(interval);
            }
        }, self.opt.delay);
    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    self.init(item, options);
};