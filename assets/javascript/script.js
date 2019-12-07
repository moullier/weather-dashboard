// inital pull of Tucson info to populate the page
// later, try to incorporate the geolocator API to this
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Tucson&APPID=7c1d14299c12aa7faada3a48e18af17b",
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