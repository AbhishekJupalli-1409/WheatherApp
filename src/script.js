
const apiKey = '15e529cc05c5f793bfa491c6bf9b6e5a';


const temperatureElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const timeElement = document.getElementById("time");
const sunnyModeButton = document.getElementById("sunnyMode");
const cloudyModeButton = document.getElementById("cloudyMode");
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
            changeBackgroundBasedOnTemperature(data.main.temp);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Failed to fetch weather data.");
    }
}

function updateWeatherUI(data) {
    temperatureElement.textContent = `${data.main.temp}°C`;
    locationElement.textContent = data.name;
    timeElement.textContent = new Date().toLocaleTimeString();
}

function changeBackgroundBasedOnTemperature(temp) {
    if (temp > 39) {
        document.body.style.background = "linear-gradient(135deg, #fa714b, #fdcf71)"; // Sunny background
    } else if (temp <= 39 && temp > 15) {
        document.body.style.background = "linear-gradient(135deg, #87ceeb, #f0f8ff)"; // Skyblue to Snow White
    } else if (temp <= 15) {
        document.body.style.background = "linear-gradient(135deg, #b0e0e6, #f8f8ff)"; // Ice snow type background
    }
}

sunnyModeButton.addEventListener("click", () => changeBackgroundBasedOnTemperature(40)); // Simulate sunny mode with >39°C
cloudyModeButton.addEventListener("click", () => changeBackgroundBasedOnTemperature(20)); // Simulate cloudy mode with 20°C

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Fetch weather data for a default location
fetchWeatherData("Jayawijaya");
