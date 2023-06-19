//api key
var apiKey = "eebbf925abd804c24b8227298e056052";
var searchHistory = [];
var today = moment().format("l");
$(document).ready(function () {
  //functiion to get current weather from user search
  function currentWeather(userCity) {
    //openweather api
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&units=imperial&appid=" +
      apiKey;

    //ajax method
    $.ajax({
      url: weatherUrl,
      method: "GET",
    }).then(function (weatherResponse) {
      $("#currentWeather").css("display", "block");
      $("#cityInfo").empty();

      console.log(weatherResponse);
      //var to store icon info
      var iconCode = weatherResponse.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

      //var for city input
      var city = $(
        '<h2 id="cityWeather">' +
          weatherResponse.name +
          " " +
          today +
          '</h2><img src="' +
          iconUrl +
          '"alt="' +
          weatherResponse.weather[0].description +
          '"/> <p>Temperature: ' +
          weatherResponse.main.temp +
          " °F </p>  <p>Humidity: " +
          weatherResponse.main.humidity +
          "% </p> <p>Wind Speed: " +
          weatherResponse.wind.speed +
          " MPH</p>"
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

      //console.log(lat, lon);
      //ajax function
      $.ajax({
        url: uviURL,
        method: "GET",
      }).then(function (uviResponse) {
        //var to save uv index
        var uvIndex = uviResponse.value;
        //var to add uv index to weather forecast
        console.log(uviResponse);
        var uviEl = $(
          "<p>UV Index: <span id='indexColor'>" + uvIndex + "</span> </p>"
        );
        //append uv index element
        $("#cityInfo").append(uviEl);

        //runs function for 5 day forecast weather
        forecastWeather(lon, lat);

        //if else to color uv index
        //UV Index colors 0-2 green, 3-5 yellow, 6-7 orange, 8-10 red, 11+ violet found on google
        if (uvIndex >= 0 && uvIndex <= 2) {
          //color uv index green
          $("#indexColor")
            .css("background-color", "green")
            .css("color", "white");
        } else if (uvIndex >= 3 && uvIndex <= 5) {
          //color uv index yellow
          $("#indexColor")
            .css("background-color", "yellow")
            .css("color", "white");
        } else if (uvIndex >= 6 && uvIndex <= 7) {
          //color uv index orange
          $("#indexColor")
            .css("background-color", "orange")
            .css("color", "white");
        } else if (uvIndex >= 8 && uvIndex <= 10) {
          //color uv index red
          $("#indexColor").css("background-color", "red").css("color", "white");
        } else {
          //color uv index purple
          $("#indexColor")
            .css("background-color", "purple")
            .css("color", "white");
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

      //need a for loop for 5 day forecast
      for (let i = 1; i < 6; i++) {
        var cityInfo = {
          date: forecastResponse.daily[i].dt,
          icon: forecastResponse.daily[i].weather[0].icon,
          temp: forecastResponse.daily[i].temp.day,
          humidity: forecastResponse.daily[i].humidity,
        };

        //need to get the icon from open weather api
        var day = moment.unix(cityInfo.date).format("MM/DD/YYYY");
        var weatherIcon =
          '<img src="https://openweathermap.org/img/wn/' +
          cityInfo.icon +
          '.png" alt="' +
          forecastResponse.daily[i].weather[0].description +
          '"/>';
        console.log(weatherIcon);
        //create a variable to save forecast
        var forecastCard = $(
          '<div class="forecast-card"><div><h5>' +
            day +
            "</h5><p>" +
            weatherIcon +
            "</p> <p>Temperature: " +
            cityInfo.temp +
            " °F </p> <p>Humidity: " +
            cityInfo.humidity +
            "% </p></div>"
        );
        //apend forecast card to page
        $("#fiveday").append(forecastCard);
      }
    });
  }

  //add event listener
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    //takes user city from input bar
    var userCity = $("#input").val().trim();
    currentWeather(userCity);
    if (!searchHistory.includes(userCity)) {
      searchHistory.push(userCity);
      var prevCity = $(
        '<li class="list-item"> <button type="button" id="button">' +
          userCity +
          "</button></li>"
      );
      //append searched city to list
      $("#search-history").append(prevCity);
    }

    //need local storage to save searches
    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
    //json to get saved city
    var searchHistoryList = JSON.parse(localStorage.getItem("city"));
    //if statement to check search history cities
    if (searchHistoryList !== null) {
      var searchArr = searchHistoryList.length - 1;
      var prevSearchedCity = searchArr[prevSearchedCity];
      //currentWeather(prevSearchedCity);
    }
  });
  //trying to make list item clickable
  $(document).on("click", "#button", function () {
    var cityList = $(this).text();
    //console.log(cityList);
    currentWeather(cityList);
  });
});
