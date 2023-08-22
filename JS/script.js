$(document).ready(function () {

  var apiKey = '422a727a5e93443188202765206175d1'; // Replace with your actual API key

  var searchButton = $("#search-button");
  var searchInput = $("#search-input");
  var currentDay = $("#currentday");
  var searchHistoryList = $("#history");
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Render the search history buttons
  renderSearchHistory();

  searchButton.on("click", function () {
    var city = searchInput.val();
    fetchWeather(city);
    // Update search history and save to local storage
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderSearchHistory(); // Update the search history UI
  });

  // Handle search history button click
  searchHistoryList.on("click", "button", function () {
    var city = $(this).text();
    fetchWeather(city);
  });

  function fetchWeather(city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(apiData => {
        if (apiData.cod === 200) {
          // Valid response, update current weather UI
          updateCurrentWeatherUI(apiData);
  
          // Fetch 5-day forecast data
          fetch(forecastUrl)
            .then(response => response.json())
            .then(forecastData => {
              updateFiveDayForecastUI(forecastData);
            })
            .catch(error => {
              console.error('Error fetching forecast data:', error);
            });
        } else {
          // Invalid response, show error message
          console.error('Invalid city:', apiData.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  

  function updateCurrentWeatherUI(data) {
    var cityName = data.name;
    var date = new Date().toLocaleDateString("en-US");
    var iconCode = data.weather[0].icon;
    var temperatureKelvin = data.main.temp;
    var temperatureCelsius = temperatureKelvin - 273.15;
    var temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;
    var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    // Update the UI elements with fetched data
    $(".city-date").text(`${cityName} (${date})`);
    $(".weather-icon").attr("src", iconUrl);
    $("#temp").html(`Temp: ${temperatureFahrenheit.toFixed(2)} °F`);
    $("#wind").html(`Wind: ${windSpeed} m/s`);
    $("#humidity").html(`Humidity: ${humidity}%`);
  }

  function renderSearchHistory() {
    searchHistoryList.empty();
    searchHistory.forEach(city => {
      var listItem = $("<p>");
      var button = $("<button>").text(city);
      listItem.append(button);
      searchHistoryList.append(listItem);
    });
  }

  // Load default weather data
  var defaultCity = "New York";
  fetchWeather(defaultCity);
});

function updateFiveDayForecastUI(data) {
  var forecastItems = data.list;

  for (var i = 1; i <= 5; i++) { // Start from index 1
    var forecastItem = forecastItems[i * 8 - 1]; // Subtract 1 to get the correct index
    var date = new Date(forecastItem.dt * 1000).toLocaleDateString("en-US");
    var iconCode = forecastItem.weather[0].icon;
    var temperatureKelvin = forecastItem.main.temp;
    var temperatureCelsius = temperatureKelvin - 273.15;
    var temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    var windSpeed = forecastItem.wind.speed;
    var humidity = forecastItem.main.humidity;
    var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    // Update forecast item UI elements
    $("#date-" + (i - 1)).text(date);
    $("#img-" + (i - 1)).attr("src", iconUrl);
    $("#temp-" + (i - 1)).text(`Temp: ${temperatureFahrenheit.toFixed(2)} °F`);
    $("#wind-" + (i - 1)).text(`Wind: ${windSpeed} m/s`);
    $("#humidity-" + (i - 1)).text(`Humidity: ${humidity}%`);
  }
}