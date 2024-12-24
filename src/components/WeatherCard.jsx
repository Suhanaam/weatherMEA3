import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useTheme } from "../context/ThemeContext";

const WeatherCard = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { toggleDarkMode } = useTheme();

    const apiKey = "befd984de4d3c050671d4eb935e6c660";
    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
        } catch (err) {
            setError("City not found. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-card">
            <header>
                <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
            </header>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchWeather}>Search</button>
            </div>

            {loading && <Spinner />}

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherCard;
