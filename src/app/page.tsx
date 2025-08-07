// src/app/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { WeatherData } from '@/types/weather';
import { CurrentWeather, DetailedInfo, Forecast } from '@/components/WeatherDetails';
import LoadingSkeleton from '@/components/LoadingSkeleton';

// ... (getBackgroundClass function remains the same)

const getBackgroundClass = (weatherCode: number) => {
  if (weatherCode === 1000) return 'bg-sunny';
  if (weatherCode >= 1003 && weatherCode <= 1030) return 'bg-cloudy';
  if (weatherCode >= 1063 && weatherCode <= 1282) return 'bg-rainy';
  return 'bg-default';
};

export default function Home() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This is the new fetch function
  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        // Use the error message from our API route
        throw new Error(data.error || 'Something went wrong');
      }
      
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (err) => {
          console.error(err);
          fetchWeather('London'); // Default location
        }
      );
    } else {
      fetchWeather('London');
    }
  }, []);

  const handleSearch = () => {
    if (location) {
      fetchWeather(location);
      setLocation('');
    }
  };
  
  // ... (the rest of the JSX component remains exactly the same)
  const backgroundClass = weatherData
    ? getBackgroundClass(weatherData.current.condition.code)
    : 'bg-default';

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 text-white transition-all duration-500 ${backgroundClass}`}>
       <div className="w-full max-w-4xl backdrop-blur-sm p-4 md:p-8 rounded-lg">
        {/* Search Bar */}
        <div className="flex items-center w-full mb-8">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a city..."
            className="w-full p-3 bg-white/20 backdrop-blur-lg rounded-l-lg focus:outline-none placeholder-gray-300"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-blue-500 hover:bg-blue-600 rounded-r-lg transition-colors"
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Content Area */}
        {loading && <LoadingSkeleton />}
        {error && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
        {weatherData && !loading && !error && (
          <div>
            <CurrentWeather data={weatherData} />
            <DetailedInfo data={weatherData} />
            <Forecast data={weatherData} />
          </div>
        )}
      </div>
    </main>
  );
}