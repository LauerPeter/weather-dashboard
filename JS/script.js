
/*
  I am loading the sample data via another script tag on the index.html page, so I have that data 
  available here as a global variable. It was named sample in the other file so we'll use that here.
*/

//API setup
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = '422a727a5e93443188202765206175d1'

//searched city
var town="";
var searchHistory = [];
var temp
var wind
var humidity

//DOM ELEMENTS


$("#search-button").on("click", function (event) {

  event.preventDefault();

  q = $("#city-input").val();
  if (q === '') {
      return alert('Please Enter Valid City Name ! ');
  }
  getWeather(q);

  saveToLocalStorage(q);

});

