/*===============================================================================================================
TEAM 117
Assignment 2, ENG1003
Last Edited: 24/05/2016
Written by Michelle Balestrat, 23838213
===============================================================================================================*/

// Skeleton Functions:
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function () {
    function pad(value) {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" +
        pad(this.getMonth() + 1, 2) + '-' +
        pad(this.getDate(), 2);

    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function () {
    return this.simpleDateString() + "T12:00:00";
}


//------------------------------------------------------------------

// Code for LocationWeatherCache class and other shared code.
// Global variable to count the number of removed items and offset the index of locations array.
var spliceCount;
var locationWeatherCache;
//

// Prefix to use for Local Storage.
var APP_PREFIX = "weatherApp";

//------------------------------------------------------------------
// MAIN FUNCTION

function LocationWeatherCache() {
    // Private attributes:

    var locations = [];
    var callbacks = {};
    var APIkey = "760b8e8a0a5f4992d672bcb53a07998e";


    // Public methods:

    // Returns the number of locations stored in the cache.
    //
    this.length = function () {
        return locations.length;
    };

    //------------------------------------------------------------------
    // Returns the location object for a given index. USE ON VIEW LOCATION PAGE & MAIN SCREEN
    // Indexes begin at zero.
    //
    this.locationAtIndex = function (index) {
        return locations[index];
    };

    //------------------------------------------------------------------
    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function (latitude, longitude, nickname) {
        // Create the newLoc object 
        var newLoc = {
            lat: latitude,
            long: longitude,
            nick: nickname,
            forecasts: {}
        };

        // NB: Getting weather is the job of getWeatherAtIndexForDate function
        locations.push(newLoc);

        // Push the new location to the array
        index = locations.length - 1;

        //index = locations.length - (spliceCount - 1);
        saveLocations();
        // Save to cache
        //localStorage.setItem(APP_PREFIX + index, JSON.stringify(locations[index]));

        // Return index of added location
        return index
    };

    //------------------------------------------------------------------
    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function (index) {
        if (index > -1) {
            locations.splice(index, 1);
            spliceCount++;
        }
    };

    //------------------------------------------------------------------
    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function () {
        var locationWeatherPDO = {
            locations: locations,
            callbacks: callbacks
        };

        return locationWeatherPDO;
    };

    //------------------------------------------------------------------
    //Sets private attributes for a class instance. Lets LocalWeather be recreated on app relaunch.
    //this.initialiseFromJSON = function()
    //{
    //    
    //};

    //------------------------------------------------------------------
    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function (locationWeatherPDO) {
        //  locationWeatherCacheObj =locationWeatherPDO;// JSON.parse(locationWeatherPDO);
        locations = locationWeatherPDO.locations;
    };

    //------------------------------------------------------------------
    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function (index, date, callback) {
        //index = Number(index);
        var place = locations[index];
        var key = place.lat + ',' + place.long + ',' + date;

        //Check if weather data point for date is already in forecasts array.
        if (place.forecasts.hasOwnProperty(key)) {
            // If yes, call callback function with weather data.
            return callback(index, place.forecasts[key]);
            //index, 
        }

        if (callbacks[key] == undefined) {
            // If not, call forecast API with JSONP
            callbacks[key] = [callback, index];
            jsonpRequest("https://api.forecast.io/forecast/" + APIkey, key);
        }

        // Store in forecasts array and return to callback function.
        //forecast.push(lookUp);
        //locations[index].forecasts["place.lat, place.lng, date"] = forecast[index];
    };

    //------------------------------------------------------------------
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //

    this.weatherResponse = function (response) {
        //var index = getIndexByLatLng(response.lat,response.lng);
        //locations[index].forecasts[key] = weather;

        var WeatherForecast = response.daily;
        var date = new Date(WeatherForecast.data[0].time * 1000);
        date = date.forecastDateString();

        var callbackIndex = response.latitude + ',' + response.longitude + ',' + date;

        var callback = callbacks[callbackIndex][0];
        index = callbacks[callbackIndex][1];
        //var index = locations.length;

        delete callbacks[callbackIndex];

        locations[index].forecasts[callbackIndex] = WeatherForecast;

        saveLocations(locations);
        document.body.appendChild(script);

        callback(index, WeatherForecast);
    };


    //------------------------------------------------------------------
    // Private methods:

    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    this.getIndexByLatLng = function (lat, lng) {
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].lat === lat && locations[i].long === long) {
                return (i);
            }
        }
        return (-1);
        }
    };

    function jsonpRequest(url, data) {
        // Build URL parameters from data object.
        var params = "";

        // For each key in data object...
        //for (var key in data) {
            //if (data.hasOwnProperty(key)) {
               // if (params.length == 0) {
                    // First parameter starts with '?'
                  //  params += "/";
               // } else {
                    // Subsequent parameter separated by '&'
                   // params += ",";
               // }

                //var encodedKey = encodeURIComponent(key);
                //var encodedValue = encodeURIComponent(data[key]);
                // encodedKey + "=" +

                params += "/" + data;


        params += "/?exclude=[currently,minutely,hourly,alerts,flags]&callback=locationWeatherCache.weatherResponse";

        var script = document.createElement('script');
        script.src = url + params;
        document.body.appendChild(script);
    }

//================================================================
// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations() {
    // Create a single LocationWeatherCache class instance inside global variable 'LocationWeatherCache'.

    var locationWeatherFromStorageJSON = localStorage.getItem(APP_PREFIX);
    locationWeatherCache = new LocationWeatherCache();
    
    if (!(locationWeatherFromStorageJSON === null || locationWeatherFromStorageJSON === "undefined")) 
    {
        locationWeatherPDO = JSON.parse(locationWeatherFromStorageJSON);
        locationWeatherCache.initialiseFromPDO(locationWeatherPDO);
    }

    // Check local storage for existing cache object

    //    if (locationWeatherCache !== null) {
    //        locationWeatherCache.initialiseFromPDO(locationWeatherCache);
    //    }


}
//================================================================
// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations() {
    localStorage.setItem(APP_PREFIX, JSON.stringify(locationWeatherCache));
}

//================================================================
// Call loadLocations function so that stored data is available on all pages.

//saveLocations();
loadLocations();