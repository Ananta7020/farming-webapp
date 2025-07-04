import React, { useState } from 'react';
import axios from 'axios';

function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = (`https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true`) // API key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      alert('❌ Weather not found for this location');
      setWeather(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">🌤 Weather Information</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city or village name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          🔍
        </button>
      </div>

      {weather && (
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="text-xl font-bold text-green-800 mb-2">{weather.name}, {weather.sys.country}</h3>
          <img
            className="w-20 mx-auto"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className="text-lg text-gray-700">{weather.weather[0].description}</p>
          <p className="text-3xl font-bold text-green-900">{weather.main.temp}°C</p>
          <p className="text-sm text-gray-500">Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
