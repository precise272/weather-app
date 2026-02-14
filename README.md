Weather Dashboard
A responsive, branded weather application built as part of my front‑end portfolio. This project demonstrates API integration, interactive mapping, and polished UI design using semantic HTML, modular CSS, and vanilla JavaScript.

Overview
The app allows users to search for any city worldwide or use their current location to view real‑time weather conditions and a 5‑day forecast. It includes an interactive map powered by Leaflet, a premium‑styled hero card with detailed weather data, and a responsive layout optimized for both desktop and mobile.

The codebase is lightweight, adaptable, and structured to be extended into a full‑featured weather service or integrated into a larger web platform.

Features
City‑based weather search with instant results
Geolocation support for local weather retrieval
Current conditions including temperature, description, feels like, humidity, wind, sunrise, and sunset
Five‑day forecast with daily summaries and icons
Interactive Leaflet map centered on the searched city or user location
Dynamic background color that adapts to weather conditions
Responsive, mobile‑first design with fluid layouts and touch‑friendly controls
Clear error handling and user feedback for invalid searches or denied location access

Technologies Used
HTML5
CSS3 with custom properties, flexbox, and grid
JavaScript
OpenWeatherMap API for weather and forecast data
Leaflet.js with OpenStreetMap tiles for mapping
GitHub Pages for deployment

File Structure
index.html — semantic structure and responsive layout
style.css — annotated stylesheet with gradients, responsive utilities, and premium branding
script.js — weather logic, API integration, DOM rendering, and map handling

Design Notes
The interface was designed to feel polished and professional, with a branded landing state and a premium hero card for the main weather display. A utility‑first CSS approach was used with custom properties for consistent spacing, color, and transitions.

The layout adapts fluidly across screen sizes, and the map container remains hidden until data is available to ensure a clean landing experience.

Live Demo
https://precise272.github.io/weather-app

Future Improvements
Add loading states or skeleton screens
Add search history with localStorage
Add hourly forecast view
Add theme customization
Add unit tests for API and rendering logic
Convert to a React or Svelte version

Screenshots
(Add images to your repo and update the paths below)

Desktop View: screenshot-desktop.png
Mobile View: screenshot-mobile.png

License
MIT License
