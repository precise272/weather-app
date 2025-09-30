// script.js
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "4b693b3b82cfb4acb44c86f7d099ec54"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].main}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      `;
      document.getElementById("weatherResult").innerHTML = weatherInfo;
    } else {
      document.getElementById("weatherResult").innerHTML = `<p>City not found.</p>`;
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>Error fetching data.</p>`;
  }
}
