# weather-dashboard

## Description

This project is a basic weather dashboard.  It displays the current weather in a city, as well as the 5 day forecast.  The UV index is included in the current weather.  It also saves a history of cities that have been searched for in the sidebar, which is initially populated with large cities from around the world.

The weather data is gathered using the OpenWeather API (https://openweathermap.org/api).  I used AJAX to access the weather data for each requested city.  The dynamic parts of the web page are created in JQuery.  The page is styled and laid out using Bootstrap.  The search history is saved and loaded from localStorage.

The page also uses the Geolocation API to pull the user's current location when they click on the "My Location" link on the sidebar.  If the browser can use geolocation and the user gives permission, it will populate the weather in their location.

## Resources

This page provided the basic Javascript array methods: https://www.w3schools.com/js/js_array_methods.asp

This page provided the information about the Geolocation API: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

## License

MIT License

Copyright (c) 2019 Maria Francis-Moullier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.