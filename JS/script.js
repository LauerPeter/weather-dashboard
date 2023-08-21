




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

  // Fetch request to the API URL
fetch(weatherApiUrl)
.then(response => response.json())
.then(apiData => {
  // Process the API response data here
  console.log(apiData);
  updateCurrentWeatherUI(apiData); // Call the function to update the UI
})

.catch(error => {
  console.error('Error fetching data:', error);
});

  function updateCurrentWeatherUI(data) {
    // Update UI with fetched weather data
  }

  function saveSearchHistory(city) {
    // Save searched city to search history section
  }
});



