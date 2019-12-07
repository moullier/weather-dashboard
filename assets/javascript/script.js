// inital pull of Tucson info to populate the page
// later, try to incorporate the geolocator API to this
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Tucson&APPID=7c1d14299c12aa7faada3a48e18af17b&units=imperial",
    method: "GET"
  }).then(function(response) {

    console.log(response);
    
    displayCurrentWeather(response);

  });

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
    $(".weatherBody").append(newTempP);    
    $(".weatherBody").append(newHumidityP);
    $(".weatherBody").append(newWindP);

}

// This function handles events where the search button is clicked
$("#searchButton").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    let city = $("#cityInput").val().trim();
    console.log(city);

    let weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=7c1d14299c12aa7faada3a48e18af17b";
    
    
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
    
        let city = response.name;

        // convert dt to date format
        console.log(response.dt);
        console.log(typeof(response.dt));
        let day = moment.unix(response.dt);
        console.log(day.format("MM/DD/YYYY"));

        let currentWeatherTitle = $("#weatherTitle");
        let titleString = city + " (" + day.format("MM/DD/YYYY") + ")";
        $(currentWeatherTitle).text(titleString);
        
        let temp = response.main.temp;
        let humidity = response.main.humidity;
    
    
        console.log(city);
    
      });



});