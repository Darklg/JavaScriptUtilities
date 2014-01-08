/*
 * Plugin Name: AJAX
 * Version: 1.0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/*
new jsuAJAX({
    url: 'index.html',
    method: 'GET',
    callback: function(response){alert('response');},
    data: 'ajax=1&test=abc'
});
 */

var jsuAJAX = function(args) {
    var xmlHttpReq = false,
        self = this;

    /* Tests */
    if (!args.url) {
        return false;
    }
    if (!args.method) {
        args.method = 'GET';
    }
    args.method = args.method.toUpperCase();

    if (!args.callback) {
        args.callback = function() {};
    }
    if (!args.data) {
        args.data = '';
    }
    if (typeof args.data == 'object') {
        var ndata = '';
        for (var i in args.data) {
            if (ndata !== '') {
                ndata += '&';
            }
            ndata += i + '=' + args.data[i];
        }
        args.data = ndata;
    }

    /* XHR Object */
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }

    /* Opening request */
    self.xmlHttpReq.open(args.method, args.url, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    self.xmlHttpReq.onreadystatechange = function() {
        /* Callback when complete */
        if (self.xmlHttpReq.readyState == 4) {
            args.callback(self.xmlHttpReq.responseText);
        }
    };

    /* Sending request */
    self.xmlHttpReq.send(args.data);

};

/*---*/

var jsuAJAX=function(a){var b=this;if(!a.url)return!1;if(a.method||(a.method="GET"),a.method=a.method.toUpperCase(),a.callback||(a.callback=function(){}),a.data||(a.data=""),"object"==typeof a.data){var c="";for(var d in a.data)""!==c&&(c+="&"),c+=d+"="+a.data[d];a.data=c}window.XMLHttpRequest?b.xmlHttpReq=new XMLHttpRequest:window.ActiveXObject&&(b.xmlHttpReq=new ActiveXObject("Microsoft.XMLHTTP")),b.xmlHttpReq.open(a.method,a.url,!0),b.xmlHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),b.xmlHttpReq.onreadystatechange=function(){4==b.xmlHttpReq.readyState&&a.callback(b.xmlHttpReq.responseText)},b.xmlHttpReq.send(a.data)};

/*---*/

/*
 * Plugin Name: Vanilla-JS Arrays
 * Version: 1.0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Array contains
---------------------------------------------------------- */

Array.contains = function(needle, haystack) {
    var i = 0,
        length = haystack.length;

    for (; i < length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
};

if (!Array.prototype.contains) {
    Array.prototype.contains = function(needle) {
        return Array.contains(needle, this);
    };
}

/* ----------------------------------------------------------
  Array each
---------------------------------------------------------- */

Array.each = function(arrayToParse, callback) {
    var i = 0,
        length = arrayToParse.length;
    for (; i < length; i++) {
        callback(arrayToParse[i]);
    }
};

if (!Array.prototype.each) {
    Array.prototype.each = function(callback) {
        Array.each(this, callback);
    };
}

/*---*/

Array.contains=function(a,b){for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return!0;return!1},Array.prototype.contains||(Array.prototype.contains=function(a){return Array.contains(a,this)}),Array.each=function(a,b){for(var c=0,d=a.length;d>c;c++)b(a[c])},Array.prototype.each||(Array.prototype.each=function(a){Array.each(this,a)});

/*---*/

/*
 * Plugin Name: Vanilla-JS Canvas
 * Version: 2.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUCanvas = function(canvas) {
    // Set Vars
    this.canvas = canvas;
    this.cH = this.canvas.clientHeight;
    this.cW = this.canvas.clientWidth;
    this.cRatio = this.cH / this.cW;

    // Set canvas
    this.context = this.canvas.getContext("2d");
    this.canvas.height = this.cH;
    this.canvas.width = this.cW;

    /* ----------------------------------------------------------
      Cover Media
    ---------------------------------------------------------- */

    // Cover Video
    this.coverVideo = function(video) {
        var self = this;

        this.video = video || this.getChildIf('VIDEO');
        if (!this.video) {
            return;
        }

        // Obtain dimensions
        this.dim = this.getCoverDimensions(this.video);

        this.video.addEventListener('play', function() {
            self.drawVideo();
        });

    };

    this.drawVideo = function() {
        var self = this;

        // Draw video
        this.context.drawImage(this.video, this.dim.left, this.dim.top, this.dim.width, this.dim.height);

        // Test if video is paused
        if (this.video.paused || this.video.ended) {
            return false;
        }

        // Launch next frame
        setTimeout(function() {
            self.drawVideo();
        }, 40);
    };

    // Cover Image
    this.coverImage = function(image) {

        image = image || this.getChildIf('IMG');
        if (!image) {
            return;
        }

        // Obtain dimensions
        var dim = this.getCoverDimensions(image);

        // Draw image
        this.context.drawImage(image, dim.left, dim.top, dim.width, dim.height);

    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    this.getChildIf = function(tagName) {
        // Test if canvas has a child, with a img tagName.
        if (!canvas.children[0] || canvas.children[0].tagName != tagName) {
            return false;
        }
        return canvas.children[0];
    };

    // Get Cover dimensions for an element
    this.getCoverDimensions = function(image) {
        // Get Image size
        var iReturn = {
            left: 0,
            top: 0,
            width: 10,
            height: 10
        },
            iH = image.height,
            iW = image.width,
            iRatio = iH / iW;

        // Get image position
        if (this.cRatio < iRatio) {
            iReturn.width = this.cW;
            iReturn.height = iReturn.width * iRatio;
            iReturn.top = 0 - (iReturn.height - this.cH) / 2;
        }
        else {
            iReturn.height = this.cH;
            iReturn.width = iReturn.height / iRatio;
            iReturn.left = 0 - (iReturn.width - this.cW) / 2;
        }

        return iReturn;

    };
};

/*---*/

var dkJSUCanvas=function(a){this.canvas=a,this.cH=this.canvas.clientHeight,this.cW=this.canvas.clientWidth,this.cRatio=this.cH/this.cW,this.context=this.canvas.getContext("2d"),this.canvas.height=this.cH,this.canvas.width=this.cW,this.coverVideo=function(a){var b=this;this.video=a||this.getChildIf("VIDEO"),this.video&&(this.dim=this.getCoverDimensions(this.video),this.video.addEventListener("play",function(){b.drawVideo()}))},this.drawVideo=function(){var a=this;return this.context.drawImage(this.video,this.dim.left,this.dim.top,this.dim.width,this.dim.height),this.video.paused||this.video.ended?!1:(setTimeout(function(){a.drawVideo()},40),void 0)},this.coverImage=function(a){if(a=a||this.getChildIf("IMG")){var b=this.getCoverDimensions(a);this.context.drawImage(a,b.left,b.top,b.width,b.height)}},this.getChildIf=function(b){return a.children[0]&&a.children[0].tagName==b?a.children[0]:!1},this.getCoverDimensions=function(a){var b={left:0,top:0,width:10,height:10},c=a.height,d=a.width,e=c/d;return this.cRatio<e?(b.width=this.cW,b.height=b.width*e,b.top=0-(b.height-this.cH)/2):(b.height=this.cH,b.width=b.height/e,b.left=0-(b.width-this.cW)/2),b}};

/*---*/

/*
 * Plugin Name: Vanilla-JS Classes
 * Version: 1.0.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Get class names
---------------------------------------------------------- */

Element.getClassNames = function(element) {
    var classNames = [],
        elementClassName = element.className;
    if (elementClassName !== '') {
        elementClassName = elementClassName.replace(/\s+/g, ' ');
        classNames = elementClassName.split(' ');
    }
    return classNames;
};

/* ----------------------------------------------------------
  Test if element has a class
---------------------------------------------------------- */

Element.hasClass = function(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    return Array.contains(className, Element.getClassNames(element));
};

/* ----------------------------------------------------------
  Add a class
---------------------------------------------------------- */

Element.addClass = function(element, className) {
    if (element.classList) {
        element.classList.add(className);
        return;
    }
    if (!Element.hasClass(element, className)) {
        var elementClasses = Element.getClassNames(element);
        elementClasses.push(className);
        element.className = elementClasses.join(' ');
    }
};

/* ----------------------------------------------------------
  Remove a class
---------------------------------------------------------- */

Element.removeClass = function(element, className) {
    if (element.classList) {
        element.classList.remove(className);
        return;
    }
    var elementClasses = Element.getClassNames(element);
    var newElementClasses = [];
    var i = 0,
        arLength = elementClasses.length;
    for (; i < arLength; i++) {
        if (elementClasses[i] !== className) {
            newElementClasses.push(elementClasses[i]);
        }
    }
    element.className = newElementClasses.join(' ');
};

/* ----------------------------------------------------------
  Toggle a class
---------------------------------------------------------- */

Element.toggleClass = function(element, className) {
    if (!Element.hasClass(element, className)) {
        Element.addClass(element, className);
    }
    else {
        Element.removeClass(element, className);
    }
};

/*---*/

Element.getClassNames=function(a){var b=[],c=a.className;return""!==c&&(c=c.replace(/\s+/g," "),b=c.split(" ")),b},Element.hasClass=function(a,b){return a.classList?a.classList.contains(b):Array.contains(b,Element.getClassNames(a))},Element.addClass=function(a,b){if(a.classList)return a.classList.add(b),void 0;if(!Element.hasClass(a,b)){var c=Element.getClassNames(a);c.push(b),a.className=c.join(" ")}},Element.removeClass=function(a,b){if(a.classList)return a.classList.remove(b),void 0;for(var c=Element.getClassNames(a),d=[],e=0,f=c.length;f>e;e++)c[e]!==b&&d.push(c[e]);a.className=d.join(" ")},Element.toggleClass=function(a,b){Element.hasClass(a,b)?Element.removeClass(a,b):Element.addClass(a,b)};

/*---*/

/*
 * Plugin Name: Vanilla-JS Common
 * Version: 1.4.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* Tests
-------------------------- */

var dkJSUTests = {
    canvas: function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    },
    localStorage: function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        }
        catch (e) {
            return false;
        }
    },
    offline: function() {
        return !!window.applicationCache;
    },
    touch: function() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    },
};

/* Trim
-------------------------- */

String.trim = function(text) {
    return text.replace(/^\s+|\s+$/g, "");
};

/* Console log fix
-------------------------- */

if (typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

/* Callback on image load
-------------------------- */

var callOnImgLoad = function(url, callback) {
    // Create a new image
    var img = new Image();

    // Trigger callback on load
    img.onload = function() {
        callback();
    };

    // Set image load
    img.src = url;
};

/*---*/

var dkJSUTests={canvas:function(){var a=document.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},localStorage:function(){try{return"localStorage"in window&&null!==window.localStorage}catch(a){return!1}},offline:function(){return!!window.applicationCache},touch:function(){return"ontouchstart"in window||"onmsgesturechange"in window}};if(String.trim=function(a){return a.replace(/^\s+|\s+$/g,"")},"undefined"==typeof console){var console={};console.log=console.error=console.info=console.debug=console.warn=console.trace=console.dir=console.dirxml=console.group=console.groupEnd=console.time=console.timeEnd=console.assert=console.profile=function(){}}var callOnImgLoad=function(a,b){var c=new Image;c.onload=function(){b()},c.src=a};

/*---*/

/*
 * Plugin Name: Vanilla-JS Cookies
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* Many thanks to http://www.quirksmode.org/js/cookies.html */

/* ----------------------------------------------------------
  Set Cookie
---------------------------------------------------------- */

var setCookie = function(name, value, expiration) {
    var cookie_value = name + '=' + value + ';';

    /* Expiration */
    if (expiration) {
        var date = new Date();
        date.setTime(date.getTime() + (expiration * 24 * 60 * 60 * 1000));
        cookie_value = cookie_value + "expires=" + date.toGMTString() + ';';
    }

    document.cookie = cookie_value + 'path=/';

};

/* ----------------------------------------------------------
  Get Cookie
---------------------------------------------------------- */

var getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

/* ----------------------------------------------------------
  Delete Cookie
---------------------------------------------------------- */

var deleteCookie = function(name) {
    setCookie(name, '', -1);
};

/*---*/

var setCookie=function(a,b,c){var d=a+"="+b+";";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d=d+"expires="+e.toGMTString()+";"}document.cookie=d+"path=/"},getCookie=function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(b))return e.substring(b.length,e.length)}return null},deleteCookie=function(a){setCookie(a,"",-1)};

/*---*/

/*
 * Plugin Name: Vanilla-JS Elements
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Hide
---------------------------------------------------------- */

Element.hide = function(element) {
    element.style.display = 'none';
};

/* ----------------------------------------------------------
  Show
---------------------------------------------------------- */

Element.show = function(element) {
    element.style.display = '';
};

/* ----------------------------------------------------------
  Toggle
---------------------------------------------------------- */

Element.toggleDisplay = function(element) {
    var els = element.style;
    if (els.display === 'none') {
        Element.show(element);
    }
    else {
        Element.hide(element);
    }
};

/*---*/

Element.hide=function(a){a.style.display="none"},Element.show=function(a){a.style.display=""},Element.toggleDisplay=function(a){var b=a.style;"none"===b.display?Element.show(a):Element.hide(a)};

/*---*/

/*
 * Plugin Name: Vanilla-JS Events
 * Version: 1.0
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  Domready
---------------------------------------------------------- */

/* From the amazing Dustin Diaz : http://www.dustindiaz.com/smallest-domready-ever */
// "!document.body" check ensures that IE fires domReady correctly
window.domReady = function(func) {
    if (/in/.test(document.readyState) || !document.body) {
        setTimeout(function() {
            window.domReady(func);
        }, 9);
    }
    else {
        func();
    }
};

/* ----------------------------------------------------------
  Add Event
---------------------------------------------------------- */

window.addEvent = function(el, eventName, callback) {
    if (el.addEventListener) {
        el.addEventListener(eventName, callback, false);
    }
    else if (el.attachEvent) {
        el.attachEvent("on" + eventName, function(e) {
            return callback.call(el, e);
        });
    }
};

/*---*/

window.domReady=function(a){/in/.test(document.readyState)||!document.body?setTimeout(function(){window.domReady(a)},9):a()},window.addEvent=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(b){return c.call(a,b)})};

/*---*/

/*
 * Plugin Name: Vanilla-JS Selectors
 * Version: 1.0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

/* ----------------------------------------------------------
  $$_ : Get multiple elements
---------------------------------------------------------- */

var $$_ = function(selector) {
    var idMatch = /^\#([a-z0-9_-]+)$/,
        classMatch = /^\.([a-z0-9_-]+)$/,
        tagMatch = /^([a-z]+)$/;

    // If selector looks like an ID, uses $_ for performance
    if (selector.match(idMatch)) {
        return [document.getElementById(selector)];
    }

    // If selector looks like a CSS Class, uses $_ for performance
    if (selector.match(classMatch)) {
        return document.getElementsByClassName(selector);
    }

    // If selector matches a tag elements, uses getElementsByTagName for performance
    if (selector.match(tagMatch)) {
        return document.getElementsByTagName(selector);
    }

    // If Query Selector exists, use it
    if ("querySelectorAll" in document) {
        return document.querySelectorAll(selector);
    }

    return [];
};

/* ----------------------------------------------------------
  $_ : Get Element
---------------------------------------------------------- */

var $_ = function(id) {
    return document.getElementById(id);
};

/*---*/

var $$_=function(a){var b=/^\#([a-z0-9_-]+)$/,c=/^\.([a-z0-9_-]+)$/,d=/^([a-z]+)$/;return a.match(b)?[document.getElementById(a)]:a.match(c)?document.getElementsByClassName(a):a.match(d)?document.getElementsByTagName(a):"querySelectorAll"in document?document.querySelectorAll(a):[]},$_=function(a){return document.getElementById(a)};