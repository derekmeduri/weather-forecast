//api key
var apkiKey = "eebbf925abd804c24b8227298e056052";
var searchHistory = [];
var today = moment().format('l');

//functiion to get current weather from user search
function currentWeather() {
    //openweather api 
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=39.9622601&lon=-83.0007065&units=imperial&appid=eebbf925abd804c24b8227298e056052";
    //ajax method 
    $.ajax({
        url: weatherUrl,
        method: "GET",
    }).then(function(weatherResponse){
        $("#currentWeather").css.("display", "block");
        $("#cityInfo").empty();
        console.log(weatherResponse);
        //var to store icon info
        var iconCode = weatherResponse.weather[0].icon;
        var iconUrl = "";

  
    //var for city input
    var city = weatherResponse.name;
    //var for longitude 
    var lon = weatherResponse.coord.lon;
    //var for latitude 
    var lat = weatherResponse.coord.lat;
    
    

});
}

function forecastWeather(lon, lat) {
    //url for 5 day forecast
    //openweather api
    var forecastUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=39.9622601&lon=-83.0007065&exclude=current,minutely,hourly,alerts,&units=imperial&appid=eebbf925abd804c24b8227298e056052";
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
        var prevCity = $('
        <li class="list-item">${userCity}</li>'
        );
        $("search-history").append(prevCity); 
    }

    
//need local storage to save searches
localStorage.setItem("city", JSON.stringify(searchHistory));
console.log(searchHistory);
});

