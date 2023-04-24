//replace apiKey with actual API key
apiKey = "3d164fa37879846ea87d0b9643681167";

//function to get weather data for city
function getWeatherData(cityName) {
    //use API to get the lat and lon for city
    const getcodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    

fetch(getcodingUrl)
    .then(response => response.json())
    .then(data => {
        const {lat, lon} = data[0];
         //use the lat and lon to get 5-day forecast for city
         const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
         fetch(forecastURL)
            .then(response => response.json())
            .then(data => {
                //.......
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    }
    
    // Example usage:
    getWeatherData('London');