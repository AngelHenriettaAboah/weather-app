import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "ee642d4399072c119cc1a792a69d219e";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setError(null);
      } else {
        setError("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Fetch Weather</button>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
