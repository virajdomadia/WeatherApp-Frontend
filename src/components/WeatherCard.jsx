import React from "react";
import {
  Sun,
  CloudRain,
  CloudSnow,
  Cloud,
  Wind,
  Droplet,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";
import { motion } from "framer-motion";

const WeatherCard = ({ weatherData, unit, onUnitChange }) => {
  const convertTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const getTemperature = (temp) => {
    return unit === "C"
      ? `${Math.round(temp)}°C`
      : `${Math.round(convertToFahrenheit(temp))}°F`;
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun className="text-yellow-500" size={80} />;
      case "Rain":
      case "Drizzle":
        return <CloudRain className="text-blue-500" size={80} />;
      case "Snow":
        return <CloudSnow className="text-blue-300" size={80} />;
      case "Clouds":
        return <Cloud className="text-gray-500" size={80} />;
      default:
        return <Sun className="text-yellow-500" size={80} />;
    }
  };

  if (!weatherData) return null;

  const { name, main, weather, wind, sys } = weatherData;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-3xl shadow-lg p-6 w-full max-w-4xl mx-auto mt-10 text-white 
        bg-white/30 backdrop-blur-lg border border-white/20"
    >
      <div className="flex justify-between items-center">
        {/* Weather Icon Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {getWeatherIcon(weather[0].main)}
        </motion.div>

        {/* Main Weather Details */}
        <div className="text-right">
          <h2 className="text-4xl font-bold">{name}</h2>
          <h1 className="text-6xl font-bold">{getTemperature(main.temp)}</h1>
          <p className="text-xl">{weather[0].main}</p>
          <button
            className="mt-2 bg-white/30 text-white py-1 px-3 rounded-full hover:bg-white/50 transition"
            onClick={onUnitChange}
          >
            Switch to °{unit === "C" ? "F" : "C"}
          </button>
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer size={24} />
          <p>Feels like: {getTemperature(main.feels_like)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Droplet size={24} />
          <p>Humidity: {main.humidity}%</p>
        </div>
        <div className="flex items-center space-x-2">
          <Wind size={24} />
          <p>Wind Speed: {wind.speed} m/s</p>
        </div>
        <div className="flex items-center space-x-2">
          <Sunrise size={24} />
          <p>Sunrise: {convertTime(sys.sunrise)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Sunset size={24} />
          <p>Sunset: {convertTime(sys.sunset)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
