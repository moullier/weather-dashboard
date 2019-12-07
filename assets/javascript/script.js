// declare global variables
let cityArray = [];

// inital pull of Tucson info to populate the page
// later, try to incorporate the geolocator API to this
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Tucson&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial",
    method: "GET"
}).then(function(response) {

    console.log(response);
    
    displayCurrentWeather(response);

});

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=Tucson&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial",
    method: "GET"
}).then(function(response) {
    
    display5DayForecast(response);

});

populateSidebar();

function displayCurrentWeather(response){
    let city = response.name;

    // convert dt to date format
    console.log(response.dt);
    console.log(typeof(response.dt));
    let day = moment.unix(response.dt);
    console.log(day.format("MM/DD/YYYY"));

    // update title with city and date
    let currentWeatherTitle = $("#weatherTitle");
    let titleString = city + " (" + day.format("MM/DD/YYYY") + ")";
    $(currentWeatherTitle).text(titleString);
    
    // create the img for the weather icon and give it the source for the correct icon
    let newIcon = $("<img>");
    let icon = response.weather[0].icon;
    let iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
    console.log(icon);
    newIcon.attr("src", iconURL);

    $(currentWeatherTitle).append(newIcon);

    // get the temperature, humidity, and wind speed from the response
    let temp = response.main.temp;
    let humidity = response.main.humidity;
    let wind = response.wind.speed;

    // create new paragraphs for each point of data 
    let newTempP = $("<p>");
    newTempP.text("Temperature: " + temp + "°F");

    let newHumidityP = $("<p>");
    newHumidityP.text("Humidity: " + humidity + "%");

    let newWindP = $("<p>");
    newWindP.text("Wind Speed: " + wind + " MPH");

    // append data to HTML page
    $(".weatherBody").empty();
    $(".weatherBody").append(newTempP);    
    $(".weatherBody").append(newHumidityP);
    $(".weatherBody").append(newWindP);

}

function display5DayForecast(response) {

    console.log(response);

}

function populateSidebar() {

    cityArray = JSON.parse(localStorage.getItem("cityList") || "[]");

    console.log("cityArray.length = " + cityArray.length);
    console.log("cityArray = " + cityArray);


    if(cityArray.length == 0) {
        // populate sidebar with default cities
        cityArray = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Shanghai", "Mexico City", "London"];
    }

    // build the sidebar
    for(let i = 0; i < cityArray.length; i++) {
        let newLI = $("<li>");
        newLI.addClass("list-group-item sidebarBtn");
        newLI.attr("dataCity", cityArray[i]);
        newLI.text(cityArray[i]);
        $("#sidebarList").append(newLI);

    }
}

// This function handles events where the search button is clicked
$("#searchButton").on("click", function(event) {
    
    // This line grabs the input from the textbox
    let city = $("#cityInput").val().trim();
    console.log(city);

    updatePage(city);

});

// Adding a click event listener to all elements with a class of "sidebarBtn"
$(document).on("click", ".sidebarBtn", updateFromSidebar);

function updateFromSidebar() {

    let city = $(this).attr("dataCity");

    updatePage(city);
  
}

function updatePage(city) {
    event.preventDefault();

    let weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";
    
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
    
        displayCurrentWeather(response);
    
      });

    let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";

      $.ajax({
        url: forecastQueryURL,
        method: "GET"
      }).then(function(response) {
    
        display5DayForecast(response);
    
      });
}