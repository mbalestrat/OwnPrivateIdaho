// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var APP_PREFIX="weatherApp";

var chosenLocation = localStorage.getItem(APP_PREFIX + "-selected");
var chosenLocationObj = JSON.parse(chosenLocation);

//Pull data from localStorage capture


//Extract name of location
    var locRawName = JSON.stringify(chosenLocationObj.nick);
    var loc = locRawName.split('"').join('');

//Extract co-ordinates for map
    var latRaw = JSON.stringify(chosenLocationObj.lat);
    var latitude = Number(latRaw.split('"').join(''));

    var longRaw = JSON.stringify(chosenLocationObj.long);
    var longitude = Number(longRaw.split('"').join(''));
    
  //Extract Weather from location
    //var key = chosenLocationObj.lat + ',' + chosenLocationObj.long + ',' + dateStr;
    //var weatherInfoRaw = chosenLocationObj.forecasts;
    
  /*      //Get the summary
        var weatherInfo = JSON.stringify(weatherInfoRaw.data[0].summary);
        var summary = weatherInfo.split('"').join('');
    
        //Get the Lo Temps
        var loTemp = JSON.stringify(weatherInfoRaw.data[0].apparentTemperatureMin);
        var loCel = loTemp.split('"').join('');
    
        //Get the Hi Temps
        var hiTemp = JSON.stringify(weatherInfoRaw.data[0].apparentTemperatureMax);
        var hiCel = hiTemp.split('"').join('');
    
        //Get Icon
        var iconR = JSON.stringify(weatherInfoRaw.data[0].icon);
        var icon = iconR.split('"').join('');
        */

if (chosenLocation !== null) 
        {
            document.getElementById("headerBarTitle").textContent = loc;
        }
    else
        {
            var locationNames = ["Location A", "Location B"];
            // If a location name was specified, use it for header bar title.
            document.getElementById("headerBarTitle").textContent = locationNames[locationIndex];
        }

//The date that dispalyedd weather applies to
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

var outputAreaRef = document.getElementById("locDate");
var output = "";

var currentDate = new Date();

var dateStr = currentDate.simpleDateString()

outputAreaRef.innerHTML = dateStr;

//time zone errors
Date.prototype.forcastDateString = function () {

    return this.simpleDateString() + "T12:00:00"
}

//map displays on the page

var map;

function locMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: latitude,
            lng: longitude
        }
    });

    var geocoder = new google.maps.Geocoder();
    fieldValueChanged = function () {
        geocoderAddress(geocoder, map);
    };
}


//A date selection slider
//30 positions
//set to the far right
var slide = document.getElementById('slide'),
    sliderDate = new Date;

slide.onchange = function() {
    sliderDate.innerHTML = this.value;
}




//A summary of the weather
/*
var APIID = "760b8e8a0a5f4992d672bcb53a07998e";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;


function update(weather)
{
    temp.innerHTML = weather.temp;
    loc.inner = weather.loc;
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    humidity.innerHTML = weather.humidity;
    icon.src = "imgs/code/" + weather.icon + ".png";
    console.log(icon.src)
}

window.onload = function ()
{
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("direction");
    
    var weather = {};
    weather.temp = ;
    weather.wind = ;
    weather.dirction = ;
    weather.humidity =  ;
    weather.loc = ;
    weather.icon = ;
     
    update(weather);
}
*/
//A “Remove this location” button