//api key
var apkiKey = "eebbf925abd804c24b8227298e056052";
var searchHistory = [];
var today = moment().format("l");

//functiion to get current weather from user search
function currentWeather(userCity) {
  //openweather api
  var weatherUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${apiKey}";
  //ajax method
  $.ajax({
    url: weatherUrl,
    method: "GET",
  }).then(function (weatherResponse) {
    $("#currentWeather").css.$("display", "block");
    $("#cityInfo").empty();
    console.log(weatherResponse);
    //var to store icon info
    var iconCode = weatherResponse.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";

    //var for city input
    var city = $(
      '<h2 id="cityWeather">',
      weatherResponse.name + today,
      "<img src=",
      iconUrl,
      "alt=",
      weatherResponse.weather[0].description,
      "</h2> <p>Temperature:",
      weatherResponse.main.temp,
      "</p>  <p>Humidity:",
      weatherResponse.wind.humidity,
      "</p> <p>Wind Speed:",
      weatherResponse.wind.speed,
      "MPH</p>"
    );
    //appending info for current city
    $("#cityInfo").append(city);
    //var for longitude
    var lon = weatherResponse.coord.lon;
    //var for latitude
    var lat = weatherResponse.coord.lat;
    //var for uv index url
    var uviURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;

    //ajax function
    $.ajax({
      url: uviURL,
      method: "GET",
    }).then(function (uviResponse) {
      console.log(uviResponse);
      //var to save uv index
      var uvIndex = uviResponse.value;
      //var to add uv index to weather forecast
      var uviEl = $("<p>UV Index: <span>", uvIndex, "</span> </p>");
      //append uv index element
      $("cityInfo").append(uviEl);
    //runs function for 5 day forecast weather
      forecastWeather(lon, lat);
      if (uvIndex >= 0 && uvIndex <= 2){
        //color uv index green
      } else if ( ) {
        //color uv index yellow
      } else if () {
        //color uv index orange
      } else if () {
        //color uv index red 
      } else {
        //color uv index purple
      }
    });
  });
}

function forecastWeather(lon, lat) {
  //url for 5 day forecast
  //openweather api
  var forecastUrl =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=current,minutely,hourly,alerts,&units=imperial&appid=" +
    apiKey;
  //ajax function to empty and get forecast weather
  $.ajax({
    url: forecastUrl,
    method: "GET",
  }).then(function (forecastResponse) {
    console.log(forecastResponse);
    $("#fiveday").empty();
  });

  //need a for loop for 5 day forecast
  for (let i = 1; i < 6; i++) {
    var cityInfo = {
      date: forecastResponse.daily[i].dt,
      icon: forecastResponse.daily[i].weather[0].icon,
      temp: forecastResponse.daily[i].temp.day,
      humidity: forecastResponse.daily[i].humidity,
    };
  };
  //create a variable to save forecast 
  var forecastCard; 
  //apend forecast card to page
  $("#fiveday").append(forecastCard);
}

//add event listener
$("search-button").on("click", function (event) {
  event.preventDefault();

  var userCity = $("#input").val().trim();
  currentWeather(userCity);
  if (!searchHistory.includes(userCity)) {
    searchHistory.push(userCity);
    var prevCity = $('  <li class="list-item"> ${userCity} </li>');
    $("search-history").append(prevCity);
  }

  //need local storage to save searches
  localStorage.setItem("city", JSON.stringify(searchHistory));
  console.log(searchHistory);
});
