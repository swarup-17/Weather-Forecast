import Image from "next/image";
import React from "react";
import "/app/globals.css";

export const Weather = ({
  weatherData,
  forecastData,
  getCurrentDate,
  getWeatherIcon,
  formatDate,
  displaySection,
}) => {
  return (
    <section
      className="weather-info"
      style={{ display: displaySection === "weather" ? "flex" : "none" }}
    >
      {weatherData && (
        <>
          <div className="location-data-container">
            <div className="location">
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h4 className="country-txt">{weatherData.name}</h4>
            </div>
            <h5 className="current-date-txt regular-txt">{getCurrentDate()}</h5>
          </div>

          <div className="weather-summary-container">
            <Image
              src={`/weather/${getWeatherIcon(weatherData.weather[0].id)}`}
              alt={weatherData.weather[0].main}
              className="weather-summary-img"
              width={150}
              height={150}
            />
            <div className="weather-summary-info">
              <h1 className="temp-txt">
                {Math.round(weatherData.main.temp)}°C
              </h1>
              <h3 className="condition-txt regular-txt">
                {weatherData.weather[0].main}
              </h3>
            </div>
          </div>

          <div className="weather-condition-container">
            <div className="condition-item">
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
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
              <div className="condition-info">
                <h5 className="regular-txt">Humidity</h5>
                <h5 className="humidity-value-txt">
                  {weatherData.main.humidity}%
                </h5>
              </div>
            </div>
            <div className="condition-item">
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
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
              </svg>
              <div className="condition-info">
                <h5 className="regular-txt">Wind Speed</h5>
                <h5 className="wind-value-txt">{weatherData.wind.speed} M/s</h5>
              </div>
            </div>
          </div>

          <div className="forecast-items-container">
            {forecastData.map((forecast, index) => (
              <div className="forecast-item" key={index}>
                <h5 className="forecast-item-date regular-txt">
                  {formatDate(forecast.dt_txt)}
                </h5>
                <Image
                  src={`/weather/${getWeatherIcon(forecast.weather[0].id)}`}
                  alt={forecast.weather[0].main}
                  className="forecast-item-img"
                  width={35}
                  height={35}
                />
                <h5 className="forecast-item-temp">
                  {Math.round(forecast.main.temp)}°C
                </h5>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
