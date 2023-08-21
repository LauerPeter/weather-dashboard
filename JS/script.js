

$(document).ready(function () {
  var apiKey = '422a727a5e93443188202765206175d1'; // Replace with your actual API key
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

  function updateCurrentWeatherUI(data) {
    var cityName = data.name;
    var date = new Date().toLocaleDateString("en-US");
    var iconCode = data.weather[0].icon;
    var temperatureKelvin = data.main.temp;
    var temperatureCelsius = temperatureKelvin - 273.15;
    var temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;
    var iconCode = data.weather[0].icon;
    var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    // Update the UI elements with fetched data
    
    $("#todayforcast p:nth-child(1)").text(`${cityName} (${date})`);
    $("#todayforcast .weather-icon").attr("src", iconUrl);
    $("#todayforcast p:nth-child(2)").html(`Temp: ${temperatureFahrenheit.toFixed(2)} °F`);
    $("#todayforcast p:nth-child(3)").html(`Wind: ${windSpeed} m/s`);
    $("#todayforcast p:nth-child(4)").html(`Humidity: ${humidity}%`);
  }

  function saveSearchHistory(city) {
    var listItem = $("<li>").text(city);
    searchHistoryList.prepend(listItem);
  }

  // Loads a default weather data 
  var defaultCity = "New York"; 
  var defaultApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}`;

  fetch(defaultApiUrl)
    .then(response => response.json())
    .then(apiData => {
      updateCurrentWeatherUI(apiData);
      saveSearchHistory(defaultCity);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

