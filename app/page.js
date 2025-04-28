"use client";

import { useState } from "react";
import "./globals.css";
import { Weather } from "./components/Weather";
import { SearchCity } from "./components/SearchCity";
import { NotFound } from "./components/NotFound";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [displaySection, setDisplaySection] = useState("search");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      updateWeatherInfo(city);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      updateWeatherInfo(city);
    }
  };

  async function updateWeatherInfo(cityName) {
    setIsLoading(true);
    try {
      const data = await getFetchWeatherData("weather", cityName);

      if (data.cod !== 200) {
        setDisplaySection("notFound");
        setIsLoading(false);
        return;
      }

      setWeatherData(data);
      await updateForecastInfo(cityName);
      setDisplaySection("weather");
      setCity("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setDisplaySection("notFound");
    } finally {
      setIsLoading(false);
    }
  }
  async function getFetchWeatherData(endPoint, cityName) {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${cityName}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`;
      const response = await fetch(apiUrl);
      return response.json();
    } catch (error) {
      console.error("Error in API request:", error);
      return { cod: "500", message: "Server error" };
    }
  }

  function getWeatherIcon(id) {
    if (id <= 232) return "thunderstorm.svg";
    if (id >= 300 && id <= 321) return "drizzle.svg";
    if (id <= 531) return "rain.svg";
    if (id <= 622) return "snow.svg";
    if (id <= 781) return "atmosphere.svg";
    if (id === 800) return "clear.svg";
    return "clouds.svg";
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: "short", month: "short", day: "2-digit" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  async function updateForecastInfo(cityName) {
    try {
      const data = await getFetchWeatherData("forecast", cityName);

      if (data.cod !== "200") {
        console.error("Error in forecast data:", data.message);
        return;
      }

      const timeTaken = "12:00:00";
      const today = new Date().toISOString().split("T")[0];

      const filteredForecasts = data.list.filter(
        (forecastWeather) =>
          forecastWeather.dt_txt.includes(timeTaken) &&
          !forecastWeather.dt_txt.includes(today)
      );

      setForecastData(filteredForecasts);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  }

  function formatDate(dateString) {
    const dateTaken = new Date(dateString);
    const dateOption = { month: "short", day: "2-digit" };
    return dateTaken.toLocaleDateString("en-US", dateOption);
  }

  return (
    <main className="main-container">
      <div className="search-container">
        <input
          type="text"
          className="city-input"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      <Weather
        weatherData={weatherData}
        forecastData={forecastData}
        getCurrentDate={getCurrentDate}
        getWeatherIcon={getWeatherIcon}
        formatDate={formatDate}
        displaySection={displaySection}
      />

      <SearchCity displaySection={displaySection} />

      <NotFound displaySection={displaySection} />
    </main>
  );
}
