// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.


function viewLocation(locationIndex) {
    //Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationWeatherCache.locationAtIndex[locationIndex]);
    //And load the view location page.
    location.href = 'viewlocation.html';
}

window.onload = function () {
    outputAreaRef = document.getElementById('locList');
    output = '';
    //date = new Date();
    //dateOut = date.forecastDateString;

    //CURRENT LOCATION
    output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation(weatherAppcurrent)\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/loading.png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">Current Location</span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Low &deg;C:</span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">High &deg;C:</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\">Condition: </span>"

    
    var loc;
    var listofLocations=locationWeatherCache
    for (i = 0; i < locationWeatherCache.length(); i++) {
       // data = localStorage.getItem(APP_PREFIX + i);
        loc=locationWeatherCache.locationAtIndex(i);
        
        // Make a call to 
        locationWeatherCache.getWeatherAtIndexForDate(i,date,mainPageWeatherResponse);
        

/*        if (data !== null) {
            dataObj = JSON.parse(data);
            rawName = JSON.stringify(dataObj.nick);
            locName = rawName.split('"').join('');
            //console.log(locationWeatherCache.getWeatherAtIndexForDate(i, 'date', locationWeatherCache.mainPageWeatherResponse));
            //localStorage.addItem(JSON.stringify(dataObj); */

           /* output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation(" + i + ")\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/loading.png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">" + locName + "</span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Low &deg;C:</span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">High &deg;C:</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\">Condition: </span>"*/
        }
    }

    outputAreaRef.innerHTML = output;
}


function mainPageWeatherResponse(response) // the weather obj
{
    // get the index of the location of this weather obj by calling 
    var index=locationWeatherCache.getIndexByLatLng(response.lat,response.lng);
    var loc=locationWeatherCache.locationAtIndex(index);
    //
    // to generate the output
     output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation(" + i + ")\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/loading.png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">" + locName + "</span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Low &deg;C:</span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">High &deg;C:</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\">Condition: </span>"
     outputAreaRef.innerHTML += output;
}



// Get Weather for each location


//Display Current location GPS
addCurrent();

function addCurrent() {
    var currentLat;
    var currentLng;

    navigator.geolocation.getCurrentPosition(
        function (location) {
            currentLat = location.coords.latitude;
            currentLng = location.coords.longitude;
            console.log(location.coords.accuracy);
        });


    // Create the newLoc object 
    var current = {
        lat: currentLat,
        long: currentLng,
        nick: 'current location',
        forecasts: {}
    };

    // Save to cache
    localStorage.setItem('current', JSON.stringify(current));
};






/*//global variables
var nickNameString = ""
var high = []
var low = []
var condition =[]

function nickNameStringUpdate(nickName) {
    for (i = 0, i < locations.length, i++) {
        nickNameString += nickName

    }

}



function conditionSummaryImage()*/