// script.js
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "6b71bdaa17a65c101bbfa02b13199820"; // Replace with your actual key if needed
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  // Show loading state
  resultDiv.innerHTML = `<p>Loading weather data...</p>`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const condition = data.weather[0].main.toLowerCase();
      const bgColor = condition.includes("rain") ? "#a3c9f1" :
                      condition.includes("clear") ? "#ffe082" :
                      condition.includes("cloud") ? "#cfd8dc" : "#f0f4f8";
      document.body.style.background = bgColor;

      const weatherInfo = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Condition:</strong> ${data.weather[0].main}</p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" />
        </div>
      `;
      resultDiv.innerHTML = weatherInfo;
    } else {
      resultDiv.innerHTML = `<p>Oops! Couldn't find "${city}". Try another city name.</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    console.error("Fetch error:", error);
  }
}
