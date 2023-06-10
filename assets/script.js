//api key
var apkiKey = "eebbf925abd804c24b8227298e056052";
var searchHistory = [];
var today = moment().format('l');

//functiion to get current weather from user search
function currentWeather(userCity) {
    //openweather api 
    var weatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${apiKey}";
    //ajax method 
    $.ajax({
        url: weatherUrl,
        method: "GET",
    }).then(function(weatherResponse){
        $("#currentWeather").css.$("display", "block");
        $("#cityInfo").empty();
        console.log(weatherResponse);
        //var to store icon info
        var iconCode = weatherResponse.weather[0].icon;
        var iconUrl = "";

  
    //var for city input
    var city = $(' <h2 id="cityWeather">  ${weatherResponse.name} ${today} </h2>  <p>Temperature: </p>  <p>Humidity:</> <p>Wind Speed: MPH</p>');
 

    //var for longitude 
    var lon = weatherResponse.coord.lon;
    //var for latitude 
    var lat = weatherResponse.coord.lat;
    //var for uv index url
    var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + ${lat} + "&lon=" + ${lon} + "&appid=" + ${apiKey};

    //ajax function
    $.ajax({
        url: uviURL,
        method: "GET",
    }).then(function(uviResponse) {
        console.log(uviResponse);
        var uvIndex = uviResponse.value;
        var uviEl = $('<p>UV Index:  </p> ') ;

        $("cityInfo").append();
    
        forecastWeather(lon, lat);
    })
    

});
}

function forecastWeather(lon, lat) {
    //url for 5 day forecast
    //openweather api
    var forecastUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat='+ {lat} + '&lon=' + ${lon} + '&exclude=current,minutely,hourly,alerts,&units=imperial&appid=' + ${apiKey};
    //ajax function to empty and get forecast weather
    $.ajax({
        url: forecastUrl,
        method: "GET",
    }).then(function(forecastResponse) {
        console.log(forecastResponse);
        $("#fiveday").empty();

    })

    //need a for loop for 5 day forecast
    for (let i =1; i < 6; i++){
        var cityInfo = {
            date: forecastResponse.daily[i].dt,
            icon: forecastResponse.daily[i].weather[0].icon,
            temp: forecastResponse.daily[i].temp.day,
            humidity: forecastResponse.daily[i].humidity,
        };


    }

}

//add event listener
$("search-button").on("click", function (event) {
    event.preventDefault();

    var userCity = $("#input").val().trim();
    currentWeather(userCity);
    if(!searchHistory.includes(userCity)){
        searchHistory.push(userCity);
        var prevCity = $('  <li class="list-item">${userCity}</li>');
        $("search-history").append(prevCity); 
    }

    
//need local storage to save searches
localStorage.setItem("city", JSON.stringify(searchHistory));
console.log(searchHistory);
});

