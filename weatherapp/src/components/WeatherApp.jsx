import React, { useEffect, useRef, useState } from "react";
import styles from "./WeatherApp.module.css";
import search_icon from "../assets/WeatherApp/search-icon.svg";

import cloudy from "../assets/WeatherApp/cloudy.svg";
import rainy from "../assets/WeatherApp/rainy.svg";
import snow from "../assets/WeatherApp/snow.svg";

import sunny from "../assets/WeatherApp/sunny.svg";
import windy from "../assets/WeatherApp/windy.svg";
import humidity from "../assets/WeatherApp/humidity.svg";
const WeatherApp = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": sunny,
    "01n": sunny,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": rainy,
    "04n": rainy,
    "09d": rainy,
    "09n": rainy,
    "10d": rainy,
    "10n": rainy,
    "13d": snow,
    "13n": snow,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || cloudy;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data :(");
    }
  };

  useEffect(() => {
    search("Rome");
  }, []);
  return (
    <div className={styles.app}>
      <div className={styles.weather}>
        <h1>WeatherApp</h1>
        <div className={styles.searchBar}>
          <input ref={inputRef} type="text" placeholder="Search..." />
          <img
            src={search_icon}
            alt=""
            onClick={() => search(inputRef.current.value)}
          />
        </div>
        {weatherData ? (
          <>
            <img className={styles.weatherIcon} src={weatherData.icon} alt="" />
            <p className={styles.temperature}>{weatherData.temperature} °C</p>
            <p className={styles.location}>{weatherData.location}</p>
            <div className={styles.weatherData}>
              <div className={styles.col}>
                <img src={humidity} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className={styles.col}>
                <img src={windy} alt="" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
