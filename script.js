const apiKey = '2ecfe4915be5003fdf4f02cc0a62d5ce';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const windspeedElement = document.getElementById('windspeed');
const visibilityElement = document.getElementById('visibility');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {  // Check if the response is successful
                locationElement.textContent = data.name;
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                humidityElement.textContent = `${Math.round(data.main.humidity)}%`;
                pressureElement.textContent = `${Math.round(data.main.pressure)} hPa`;
                windspeedElement.textContent = `${Math.round(data.wind.speed)} m/s`;
                visibilityElement.textContent = `${data.visibility / 1000} km`;
                descriptionElement.textContent = data.weather[0].description;
            } else {
                console.error('Location not found:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
