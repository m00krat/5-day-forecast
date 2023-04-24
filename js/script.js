// replace apiKey with your actual API key
const apiKey = "3d164fa37879846ea87d0b9643681167";

// function to get weather data for a city
function getWeatherData(cityName) {
  // use API to get the latitude and longitude for the city
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data[0];
      // use the latitude and longitude to get the current weather data for the city
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
          // display weather data on the page
          const cityNameElement = document.getElementById("cityName");
          const dateElement = document.getElementById("date");
          const weatherIconElement = document.getElementById("weatherIcon");
          const temperatureElement = document.getElementById("temperature");
          const humidityElement = document.getElementById("humidity");
          const windSpeedElement = document.getElementById("windSpeed");

          cityNameElement.textContent = cityName;
          dateElement.textContent = moment(data.dt * 1000).format("MMM D, YYYY");
          weatherIconElement.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
          temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
          humidityElement.textContent = `${data.main.humidity}%`;
          windSpeedElement.textContent = `${Math.round(data.wind.speed)} mph`;
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

// function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // prevent default form submission behavior
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim(); // get city name from input
  if (cityName === "") return; // if city name is empty, do nothing
  cityInput.value = ""; // clear the input field
  getWeatherData(cityName); // get weather data for the entered city
}

// add event listener for form submission
const weatherForm = document.getElementById("weatherForm");
weatherForm.addEventListener("submit", handleSubmit);
