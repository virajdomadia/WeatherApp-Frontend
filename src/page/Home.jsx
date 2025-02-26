import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import axios from "axios";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  const toggleUnit = async () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    localStorage.setItem("temperatureUnit", newUnit);

    await axios.put(`http://localhost:5000/api/user/${userId}`, {
      preferredUnit: newUnit,
    });
  };

  useEffect(() => {
    const savedUnit = localStorage.getItem("temperatureUnit");
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  useEffect(() => {
    const fetchLocationWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/weather/location?lat=${latitude}&lon=${longitude}`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError("Unable to fetch location weather");
        console.error("Error fetching location weather:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationWeather(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation Error:", error.message);
          setError("Location access denied. Search manually.");
        }
      );
    }
  }, []);

  const handleSearch = async (city) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <h1 className="text-6xl font-extrabold text-white drop-shadow-xl mb-8">
        Weather Dashboard
      </h1>
      <p className="text-2xl text-white mb-6">Get the latest weather updates</p>
      <SearchBar onSearch={handleSearch} />
      {error && <div className="text-red-600 text-center mt-4">{error}</div>}
      <WeatherCard
        weatherData={weatherData}
        unit={unit}
        onUnitChange={toggleUnit}
      />
    </div>
  );
};

export default Home;
