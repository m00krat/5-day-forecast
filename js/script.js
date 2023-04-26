// replace apiKey with your actual API key
const apiKey = "3d164fa37879846ea87d0b9643681167";

function getWeatherForecast(cityName) {
  // use API to get the 5-day forecast data for the city
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      // display forecast data on the page
      const cityNameElement = document.getElementById("cityName");
      const forecastListElement = document.getElementById("forecastList");

      cityNameElement.textContent = cityName;
      forecastListElement.innerHTML = "";

      for (let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        const date = moment(forecastData.dt * 1000).format("MMM D, YYYY");
        const weatherIconUrl = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`;
        const temperature = `${Math.round(forecastData.main.temp)}°F`;
        const humidity = `${forecastData.main.humidity}% humidity`;
        const windSpeed = `${Math.round(forecastData.wind.speed)} mph`;

        const forecastItemElement = document.createElement("li");
        forecastItemElement.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${date}</h5>
              <img src="${weatherIconUrl}" alt="Weather Icon">
              <p class="card-text">${temperature}</p>
              <p class="card-text">${humidity}</p>
              <p class="card-text">${windSpeed}</p>
            </div>
          </div>
        `;
        forecastListElement.appendChild(forecastItemElement);
      }

      // save the city into local storage
      const cityList = JSON.parse(localStorage.getItem("cityList")) || [];
      if (!cityList.includes(cityName)) {
        cityList.push(cityName);
        localStorage.setItem("cityList", JSON.stringify(cityList));
        renderCityButtons(cityList);
      }
      localStorage.setItem("lastSearchedCity", cityName);
        const clearCitiesButton = document.getElementById("clearCitiesButton");
        clearCitiesButton.addEventListener("click", () => {
        localStorage.removeItem("cityList");
        renderCityButtons([]);
});

    })
    .catch(error => console.error(error));
}

// retrieve the last searched city from local storage
const lastSearchedCity = localStorage.getItem("lastSearchedCity");

// if the last searched city is not null, display it as a button or link
if (lastSearchedCity !== null) {
  getWeatherForecast(lastSearchedCity); // add this line to get the 5-day forecast for the last searched city
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim();

  if (cityName.length === 0) {
    return;
  }

  getWeatherForecast(cityName);

  cityInput.value = "";
}

function renderCityButtons(cityList) {
  const cityListElement = document.getElementById("cityList");
  cityListElement.innerHTML = "";
  const form = document.getElementById("weatherForm");
  form.addEventListener("submit", handleSubmit);


  cityList.forEach(cityName => {
    const cityButtonElement = document.createElement("button");
    cityButtonElement.textContent = cityName;
    cityButtonElement.classList.add("btn", "btn-secondary", "mx-1");
    cityButtonElement.addEventListener("click", () => getWeatherForecast(cityName));
    cityListElement.appendChild(cityButtonElement);
  });
}

// retrieve the city list from local storage and render the buttons
const cityList = JSON.parse(localStorage.getItem("cityList")) || [];
renderCityButtons(cityList);
