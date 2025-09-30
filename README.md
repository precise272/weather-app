Weather Dashboard
This is a responsive, branded weather application built as part of my front‑end portfolio. The goal of this project was to demonstrate API integration, interactive mapping, and polished UI design using semantic HTML, modular CSS, and vanilla JavaScript.

Overview
The app allows users to search for any city worldwide or use their current location to view real‑time weather conditions and a 5‑day forecast. It includes an interactive map powered by Leaflet, a premium‑styled hero card with detailed weather data, and a responsive layout optimized for both desktop and mobile. The codebase is lightweight, adaptable, and structured to be extended into a full‑featured weather service or integrated into a larger web platform.

Features
City‑based weather search with instant results
Geolocation support for local weather retrieval
Current conditions with temperature, description, and detailed stats (feels like, humidity, wind, sunrise/sunset)
5‑day forecast with daily summaries and icons
Interactive Leaflet map centered on the searched city or user’s location
Dynamic background color that adapts to weather conditions
Responsive, mobile‑first design with fluid layouts and touch‑friendly controls
Clear error handling and user feedback for invalid searches or denied location access

Technologies
HTML5
CSS3 (custom properties, flexbox, grid)
JavaScript
OpenWeatherMap API for weather and forecast data
Leaflet.js with OpenStreetMap tiles for mapping
GitHub Pages for deployment

File Structure
index.html — semantic structure and responsive layout
style.css — fully annotated stylesheet with gradients, responsive utilities, and premium branding
script.js — weather logic, API integration, DOM rendering, and map handling

Design Notes
The interface was designed to feel polished and professional, with a branded landing state and a premium hero card for the main weather display. I used a utility‑first approach to CSS with custom properties for consistent spacing, color, and transitions. The layout adapts fluidly across screen sizes, and the codebase is structured for clarity and maintainability. The map container is hidden until data is available, ensuring a clean landing experience.

Live Demo
You can view the live version of the app at: https://precise272.github.io/weather-app
