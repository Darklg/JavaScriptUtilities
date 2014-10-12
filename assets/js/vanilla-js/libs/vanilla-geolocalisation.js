/*
 * Plugin Name: Vanilla-JS GeoLocalisation
 * Version: 0.1
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

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    init();
};