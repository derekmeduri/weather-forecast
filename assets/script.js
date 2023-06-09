//api key
var apkiKey = "eebbf925abd804c24b8227298e056052";
var searchHistory = [];

//functiion to get current weather from user search
function currentWeather() {
    //openweather api 
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=39.9622601&lon=-83.0007065&units=imperial&appid=eebbf925abd804c24b8227298e056052";
    //ajax method 
    $.ajax({
        url: weatherUrl,
        method: "GET",
    })
    //var for city input
    var city = 

    //var for latitude 
    var lat = 
    //var for longitude 
    var lon =

}

function forecastWeather() {
    var forecastUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=39.9622601&lon=-83.0007065&exclude=current,minutely,hourly,alerts,&units=imperial&appid=eebbf925abd804c24b8227298e056052";

    //need a for loop for 5 day forecast
    for ()

}

//add event listener
$("search-button").on("click", function (event) {
    event.preventDefault();

    var userCity = $("#input").val().trim();
    currentWeather(userCity);

    var prevCity;
//need local storage to save searches
localStorage.setItem("city", JSON.stringify());
console.log(searchHistory);
})

