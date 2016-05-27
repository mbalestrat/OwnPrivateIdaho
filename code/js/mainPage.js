// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

// Get the current date
var currentDate = new Date();
var dateStr = currentDate.forecastDateString();
console.log(dateStr);

//----------------------------------------------------------------------------------------

var weatherData = [];

function viewLocation(locationIndex) {
    //Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selected", JSON.stringify(weatherData[locationIndex]));
    //And load the view location page.
    location.href = 'viewlocation.html';
}

window.onload = function () {
    outputAreaRef = document.getElementById('locList');
    output = '';
    
    //CURRENT LOCATION
    output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation()\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/loading.png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">Current Location</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\"></span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Min &deg;C: </span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">Max &deg;C: </span>"

    
    var loc;
    var listofLocations = locationWeatherCache;
    
    for (i = 0; i < locationWeatherCache.length(); i++) {
       // data = localStorage.getItem(APP_PREFIX + i);
        loc = locationWeatherCache.locationAtIndex(i);
        
        // Make a call to 
        locationWeatherCache.getWeatherAtIndexForDate(i, dateStr, mainPageWeatherResponse);
        

/*        if (data !== null) {
            dataObj = JSON.parse(data);
            rawName = JSON.stringify(dataObj.nick);
            locName = rawName.split('"').join('');
            //console.log(locationWeatherCache.getWeatherAtIndexForDate(i, 'date', locationWeatherCache.mainPageWeatherResponse));
            //localStorage.addItem(JSON.stringify(dataObj); */

           /* output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation(" + i + ")\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/loading.png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">" + locName + "</span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Low &deg;C:</span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">High &deg;C:</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\">Condition: </span>"*/
        
        }
    outputAreaRef.innerHTML = output;
    }


function mainPageWeatherResponse(index, response) // the weather obj
{
    // get the index of the location of this weather obj by calling 
   // var index = locationWeatherCache.getIndexByLatLng(response.lat, response.long);
    
    //Pull location from cache
    var locRaw = locationWeatherCache.locationAtIndex(index);
    
    //Extract name of location
    var locRawName = JSON.stringify(locRaw.nick);
    var loc = locRawName.split('"').join('');
    
    //Extract Weather from location
    var key = locRaw.lat + ',' + locRaw.long + ',' + dateStr;
    var weatherInfoRaw = locRaw.forecasts[key];
    
    //Store weather data for viewing purposes
    weatherData.push(locRaw);
    
        //Get the summary
        var weatherInfo = JSON.stringify(weatherInfoRaw.data[0].summary);
        var summary = weatherInfo.split('"').join('');
    
        //Get the Lo Temps
        var loTemp = JSON.stringify(weatherInfoRaw.data[0].temperatureMin);
        var loCel = loTemp.split('"').join('');
    
        //Get the Hi Temps
        var hiTemp = JSON.stringify(weatherInfoRaw.data[0].temperatureMax);
        var hiCel = hiTemp.split('"').join('');
    
        //Get Icon
        var iconR = JSON.stringify(weatherInfoRaw.data[0].icon);
        var icon = iconR.split('"').join('');
        
    
    // Generate the output
     output += "<li class=\"mdl-list__item mdl-list__item--two-line mdl-list__item--three-line mdl-list__item--four-line\"  onclick=\"location.href = 'javascript:viewLocation("+ index +")\';\"><img class=\"mdl-list__item-icon\" id=\"icon0\" src=\"images/"+icon+".png\" class=\"list-avatar\" /><span class=\"mdl-list__item-primary-content\"><span id = \"head1\">" + loc + "</span><span id=\"condition 0\" class=\"mdl-list__item-sub-title\">"+ summary +"</span><span id=\"low 0\" class=\"mdl-list__item-sub-title\">Min &deg;C: "+ loCel +"</span><span id=\"high 0\" class=\"mdl-list__item-sub-title\">Max &deg;C: "+ hiCel +"</span>"
     
     outputAreaRef.innerHTML += output;
}


//Display Current location GPS
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



// Call GPS function
addCurrent();




/*function conditionSummaryImage()*/