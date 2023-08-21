


$(document).ready(function () {
  var apiKey = '422a727a5e93443188202765206175d1';
  var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}';

  var searchButton = $("#search-button");
  var searchInput = $("#search-input");
  var currentDay = $("#currentday");
  var searchHistoryList = $("#history");

  searchButton.on("click", function () {
    var city = searchInput.val();
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(apiData => {
        updateCurrentWeatherUI(apiData);
        saveSearchHistory(city);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  //fetch request to the API URL
fetch(weatherApiUrl)
.then(response => response.json())
.then(apiData => {
  //process API response data 
  console.log(apiData);
  updateCurrentWeatherUI(apiData); //call function to update the UI
})

.catch(error => {
  console.error('Error fetching data:', error);
});

  function updateCurrentWeatherUI(data) {
    // update UI with fetched weather data
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;

    // switch kelvin to fahrenheit
  var temperatureKelvin = data.main.temp;
  var temperatureCelsius = temperatureKelvin - 273.15; // kelvin to celsius
  var temperatureFahrenheit = (temperatureCelsius * 9/5) + 32; //celsius to fahrenheit

  // Update the UI elements with fetched data
  $("#todayforcast p:nth-child(2)").text("Temp: " + temperatureFahrenheit.toFixed(2) + " °F"); 
  $("#todayforcast p:nth-child(3)").text("Wind: " + windSpeed + " m/s");
  $("#todayforcast p:nth-child(4)").text("Humidity: " + humidity + "%");
  }

  function saveSearchHistory(city) {
    // Save searched city to search history section
  }
});



