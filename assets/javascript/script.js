// declare global variables
let cityArray = [];

// inital pull of Tucson info to populate the page

updatePage("Tucson");
populateSidebar();


// uses geolocation to pull current latitude and longitude, if allowed by the browser
function currentLocationPull() {
  
    // if successfull
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // console.log("Successfully got position");
        // console.log("latitude = " + latitude);
        // console.log("longitude = " + longitude);

        // construct URL for current weather by lat/long API request
        let weatherByCoordsURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";

        // send request for current weather data
        $.ajax({
            url: weatherByCoordsURL,
            method: "GET"
        }).then(function(response) {
            // display response
            displayCurrentWeather(response);
        });

        // construct URL for forecast by lat/long API request
        let forecastByCoordsURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";

        // send request for forecast data
        $.ajax({
            url: forecastByCoordsURL,
            method: "GET"
        }).then(function(response) {
            // display response
            display5DayForecast(response);
        });


    }
  
    function error() {
      console.log("Unable to retrieve your location");
    }
  
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

// takes the data returned from the current weather API, and displays it
function displayCurrentWeather(response){
    
    let city = response.name;

    let latitude = response.coord.lat;
    let longitude = response.coord.lon;

    console.log("latitude = " + latitude + " longitude = " + longitude);

    displayUV(latitude, longitude);

    // convert dt to date format
    let day = moment.unix(response.dt);
    console.log(day.format("MM/DD/YYYY"));

    // update title with city and date
    let currentWeatherTitle = $("#weatherTitle");
    let titleString = city + " (" + day.format("MM/DD/YYYY") + ")";
    $(currentWeatherTitle).text(titleString);
    
    // create the img for the weather icon and give it the source for the correct icon
    let newIcon = $("<img>");
    let icon = response.weather[0].icon;
    let descript = response.weather[0].description;
    let iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
    console.log(descript);
    newIcon.attr("src", iconURL);
    newIcon.attr("alt", descript);

    $(currentWeatherTitle).append(newIcon);

    // get the temperature, humidity, and wind speed from the response
    let temp = response.main.temp;
    temp = temp.toFixed(1);
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


// pass in the latitude and longitude in order to get the UV from the API
function displayUV(latitude, longitude) {
        // construct URL for UV API request
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";
    
        // send request for UV data
        $.ajax({
            url: UVQueryURL,
            method: "GET"
        }).then(function(response) {
            
            // create a new button and give it the appropriate Bootstrap class for formatting
            let newButton = $("<button>");
            let UVValue = response.value;
            newButton.addClass("btn");

            // color the button according to the UV level
            if(UVValue >= 0 && UVValue <= 2.5)
                newButton.css("background-color","green");
            else if(UVValue > 2.5 && UVValue <= 5.5)
                newButton.css("background-color","yellow");
            else if(UVValue > 5.5 && UVValue <= 7.5)
                newButton.css("background-color","orange");
            else if(UVValue > 7.5 && UVValue <= 10.5)
                newButton.css("background-color","red");
            else
                newButton.css("background-color","violet");
                
            // Add the UV value to the button, append the button to the div
            newButton.text(UVValue);
            $(".UVBody").empty();
            $(".UVBody").text("UV Index: ")
            $(".UVBody").append(newButton);

        
        });
}

// take the data from the forecast API call and display it
function display5DayForecast(response) {

    // console.log(response);

    // data is every 3 hours, so pulling each 8th element gets every 24 hours
    for(let i = 0; i < 40; i += 8){
        console.log(response.list[i]);
        let day = response.list[i].dt_txt;

        let yr = day.substring(0, 4);
        daymonth = day.substring(5,10);
        day = daymonth + "-" + yr;
        day = day.replace(/-/g, "/");

        // construct class string for specific card title
        let j = (i / 8) + 1;
        let cardTitle = ".ct" + j;
        let cardName = ".card" + j;
        $(cardTitle).text(day);


        let temp = response.list[i].main.temp;
        temp = temp.toFixed(0);
        let humidity = response.list[i].main.humidity;
        let wind = response.list[i].wind.speed;

        let newTempP = $("<p>");
        newTempP.text("Temp: " + temp + "°F");
    
        let newHumidityP = $("<p>");
        newHumidityP.text("Humidity: " + humidity + "%");
    
        // create the img for the weather icon and give it the source for the correct icon
        let newIcon = $("<img>");
        let icon = response.list[i].weather[0].icon;
        let iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
        console.log(icon);
        newIcon.attr("src", iconURL);


        // append data to appropriate card
        $(cardName).empty();
        $(cardName).append(newIcon); 
        $(cardName).append(newTempP);
        $(cardName).append(newHumidityP);

    }
    

}

// populate the sidebar with what is saved in local storage, and/or the default cities
function populateSidebar() {

    // get the cityArray from localStorage, if one is saved
    cityArray = JSON.parse(localStorage.getItem("cityList") || "[]");

    console.log("cityArray.length = " + cityArray.length);
    console.log("cityArray = " + cityArray);

    // empty the sidebar
    $("#sidebarList").empty();

    // if nothing was saved in localStorage
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
    
    // Get the input from the text box
    let city = $("#cityInput").val().trim();
    console.log(city);

    if(cityArray.length <= 9){
        cityArray.unshift(city);
    } else {
        cityArray.pop();
        cityArray.unshift(city);
    }

    // save the cityList in localStorage
    localStorage.setItem("cityList", JSON.stringify(cityArray));
    populateSidebar();

    updatePage(city);

});

// calls updatePage, but passes in the city that was clicked from the sidebar
function updateFromSidebar() {

    let city = $(this).attr("dataCity");

    updatePage(city);
  
}

function updatePage(city) {
    if(event != undefined)
        event.preventDefault();

    // construct URL for current weather API request
    let weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";
    
    // send request for current weather data
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);
        
        // pass returned data to function that will update that section of the dashboard
        displayCurrentWeather(response);
    
    });

    // construct URL for forecast API request
    let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial";

    // send request for current weather data
    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response) {
    
        // pass returned data to function that will update that section of the dashboard
        display5DayForecast(response);
    
    });
}

// Adding a click event listener to all elements with a class of "sidebarBtn"
$(document).on("click", ".sidebarBtn", updateFromSidebar);

// Adding a click event listener to the My Location text
$(document).on("click", "#geolocate", currentLocationPull);