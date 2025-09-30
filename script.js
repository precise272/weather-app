const apiKey = "6b71bdaa17a65c101bbfa02b13199820";

// Main weather fetch by city
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return displayMessage("Please enter a city name.");

  displayMessage("Loading weather data...");

  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (currentData.cod !== 200) return displayMessage(`City "${city}" not found.`);

    updateBackground(currentData.weather[0].main);
    displayCurrentWeather(currentData);
    displayForecast(forecastData.list);
  } catch (error) {
    displayMessage("Error fetching data. Please try again.");
    console.error(error);
  }
}

// Weather fetch by geolocation
function getLocalWeather() {
  if (!navigator.geolocation) return displayMessage("Geolocation not supported.");

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    displayMessage("Loading local weather...");

    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      const [currentRes, forecastRes] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
      ]);

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      updateBackground(currentData.weather[0].main);
      displayCurrentWeather(currentData);
      displayForecast(forecastData.list);
    } catch (error) {
      displayMessage("Error fetching local weather.");
      console.error(error);
    }
  });
}

// Display current weather
function displayCurrentWeather(data) {
  const iconClass = mapIconToClass(data.weather[0].icon);
  document.getElementById("weatherResult").innerHTML = `
    <div class="weather-card">
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].main}</p>
      <i class="wi ${iconClass} weather-icon"></i>
    </div>
  `;
}

// Display 5-day forecast
function displayForecast(list) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";

  const daily = list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
  daily.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const iconClass = mapIconToClass(item.weather[0].icon);
    forecastDiv.innerHTML += `
      <div class="forecast-card">
        <p><strong>${date}</strong></p>
        <i class="wi ${iconClass} forecast-icon"></i>
        <p>${item.main.temp}°C</p>
        <p>${item.weather[0].main}</p>
      </div>
    `;
  });
}

// Utility: map OpenWeather icon to Weather Icons class
function mapIconToClass(icon) {
  const map = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog"
  };
  return map[icon] || "wi-na";
}

// Utility: update background color
function updateBackground(condition) {
  const bgColor = condition.toLowerCase().includes("rain") ? "#a3c9f1" :
                  condition.toLowerCase().includes("clear") ? "#ffe082" :
                  condition.toLowerCase().includes("cloud") ? "#cfd8dc" : "#f0f4f8";
  document.body.style.background = bgColor;
}

// Utility: display message
function displayMessage(msg) {
  document.getElementById("weatherResult").innerHTML = `<p>${msg}</p>`;
  document.getElementById("forecast").innerHTML = "";
}
