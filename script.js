const apiKey = "6b71bdaa17a65c101bbfa02b13199820";
let mapInstance = null;

/**
 * Fetch weather and forecast data for a given city
 */
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return displayMessage("Please enter a city name.");

  displayMessage("Loading weather data...");

  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

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
    showMap(currentData.coord.lat, currentData.coord.lon, currentData.name);
  } catch (error) {
    displayMessage("Error fetching data. Please try again.");
    console.error(error);
  }
}

/**
 * Fetch weather and forecast data based on user's geolocation
 */
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
      showMap(latitude, longitude, currentData.name);
    } catch (error) {
      displayMessage("Error fetching local weather.");
      console.error(error);
    }
  }, () => displayMessage("Location access denied."));
}

/**
 * Render enhanced current weather hero card
 */
function displayCurrentWeather(data) {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const iconClass = mapIconToClass(data.weather[0].icon);

  document.getElementById("weatherResult").innerHTML = `
    <div class="weather-card hero">
      <h2>${data.name}, ${data.sys.country}</h2>
      <i class="wi ${iconClass} weather-icon" aria-hidden="true"></i>
      <p class="temp">${Math.round(data.main.temp)}°C</p>
      <p class="condition">${data.weather[0].description}</p>
      <div class="details-grid">
        <div><i class="wi wi-thermometer"></i> Feels like: ${Math.round(data.main.feels_like)}°C</div>
        <div><i class="wi wi-humidity"></i> Humidity: ${data.main.humidity}%</div>
        <div><i class="wi wi-strong-wind"></i> Wind: ${Math.round(data.wind.speed)} m/s</div>
        <div><i class="wi wi-cloud"></i> Clouds: ${data.clouds.all}%</div>
        <div><i class="wi wi-sunrise"></i> Sunrise: ${sunrise}</div>
        <div><i class="wi wi-sunset"></i> Sunset: ${sunset}</div>
      </div>
    </div>
  `;
}

/**
 * Render 5-day forecast cards
 */
function displayForecast(list) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const daily = list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

  daily.forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const iconClass = mapIconToClass(item.weather[0].icon);

    forecastDiv.innerHTML += `
      <div class="forecast-card">
        <p><strong>${date}</strong></p>
        <i class="wi ${iconClass} forecast-icon" aria-hidden="true"></i>
        <p>${Math.round(item.main.temp)}°C</p>
        <p>${item.weather[0].main}</p>
      </div>
    `;
  });
}

/**
 * Initialize or refresh the Leaflet map with a marker
 */
function showMap(lat, lon, city) {
  const mapSection = document.getElementById("map");

  // Reveal map section now that we have data
  mapSection.classList.remove("hidden");

  // Clear any existing map instance to avoid reinitialization errors
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  // Initialize map
  mapInstance = L.map("map").setView([lat, lon], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(mapInstance);

  L.marker([lat, lon]).addTo(mapInstance)
    .bindPopup(`<strong>${city}</strong>`)
    .openPopup();
}

/**
 * Map OpenWeatherMap icon codes to Weather Icons classes
 */
function mapIconToClass(icon) {
  const map = {
    "01d": "wi-day-sunny", "01n": "wi-night-clear",
    "02d": "wi-day-cloudy", "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud", "03n": "wi-cloud",
    "04d": "wi-cloudy", "04n": "wi-cloudy",
    "09d": "wi-showers", "09n": "wi-showers",
    "10d": "wi-day-rain", "10n": "wi-night-alt-rain",
    "11d": "wi-thunderstorm", "11n": "wi-thunderstorm",
    "13d": "wi-snow", "13n": "wi-snow",
    "50d": "wi-fog", "50n": "wi-fog"
  };
  return map[icon] || "wi-na";
}

/**
 * Update background color dynamically based on weather condition
 */
function updateBackground(condition) {
  const c = String(condition || "").toLowerCase();
  const bgColor = c.includes("rain") ? "#a3c9f1" :
                  c.includes("clear") ? "#ffe082" :
                  c.includes("cloud") ? "#cfd8dc" : "#f5f7fa";
  document.body.style.background = bgColor;
}

/**
 * Display a message or landing card and hide map until data is available
 */
function displayMessage(msg) {
  document.getElementById("weatherResult").innerHTML = `
    <div class="welcome-card">
      <h2>${msg}</h2>
      <p>Search for a city or use your location to see the forecast.</p>
      <i class="wi wi-day-sunny big-icon" aria-hidden="true"></i>
    </div>
  `;
  document.getElementById("forecast").innerHTML = "";
  const mapSection = document.getElementById("map");
  if (mapSection) mapSection.classList.add("hidden");
}
