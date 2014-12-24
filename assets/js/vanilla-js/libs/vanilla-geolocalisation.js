/*
 * Plugin Name: Vanilla-JS GeoLocalisation
 * Version: 0.2
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var dkJSUGeoLocalisation = function(params) {
    // Initial values
    var self = this,
        canGeoloc = false,
        hasGeoloc = false,
        coords = {
            latitude: 48.8534100,
            longitude: 2.3488000
        },
        geo = false;

    // User parameters
    if (typeof params != 'object') {
        params = {};
    }
    if (!params.hasOwnProperty('callback') || typeof params.callback != 'function') {
        params.callback = function() {};
    }

    function init() {
        hasGeoloc = navigator.hasOwnProperty('geolocation') && navigator.geolocation;
        if (hasGeoloc) {
            geo = navigator.geolocation;
            geo.getCurrentPosition(self.getCurrentPosition);
        }
        return hasGeoloc;
    }

    /* ----------------------------------------------------------
      Main functions
    ---------------------------------------------------------- */

    this.getCurrentPosition = function(position) {
        coords = position.coords;
        params.callback(coords);
    };

    this.getDistanceFromMeTo = function(toLat, toLong) {
        return this.getDistance(coords.latitude, coords.longitude, toLat, toLong);
    };

    this.getDistance = function(fromLat, fromLon, toLat, toLong) {
        /* Thanks to http://stackoverflow.com/q/18883601 */
        // Radius of the earth in km
        var R = 6371,
            dLat = deg2rad(toLat - fromLat),
            dLon = deg2rad(toLong - fromLon),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(fromLat)) * Math.cos(deg2rad(toLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2),
            b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // Distance in km
        return R * b;
    };

    // Get closest item from position
    this.getClosestFromPosition = function(items, position) {
        position = position || self.getPosition();
        var itLen = items.length,
            tmpDist = false,
            tmpPos = false,
            closestDist = 1000000000,
            closest = false;
        for (var i = 0; i < itLen; i++) {
            tmpPos = items[i].position;
            tmpDist = self.getDistance(position.latitude, position.longitude, tmpPos.latitude, tmpPos.longitude);
            if (tmpDist < closestDist) {
                closestDist = tmpDist;
                closest = i;
            }
        }
        return items[closest];
    };

    /* ----------------------------------------------------------
      Getters
    ---------------------------------------------------------- */

    this.getPosition = function() {
        return coords;
    };

    /* ----------------------------------------------------------
      Utilities
    ---------------------------------------------------------- */

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    init();
};