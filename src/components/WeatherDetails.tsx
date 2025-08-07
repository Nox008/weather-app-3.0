// src/components/WeatherDetails.tsx
import React from 'react';
import { WeatherData } from '@/types/weather';
import { FiWind, FiDroplet, FiSun, FiEye } from 'react-icons/fi';
import { WiSunrise, WiSunset } from 'react-icons/wi';

interface WeatherDetailsProps {
  data: WeatherData;
}

// Reusable card for detailed weather info
const DetailCard: React.FC<{ icon: React.ElementType; title: string; value: string | number }> = ({ icon: Icon, title, value }) => (
  <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 flex flex-col items-center justify-center text-center">
    <Icon className="text-3xl mb-2" />
    <h3 className="text-sm font-medium text-gray-200">{title}</h3>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

// Main weather display at the top
export const CurrentWeather: React.FC<WeatherDetailsProps> = ({ data }) => {
  const { current, location, forecast } = data;
  const todayForecast = forecast.forecastday[0].day;

  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl md:text-5xl font-bold">{location.name}, {location.country}</h2>
      <h1 className="text-7xl md:text-9xl font-extrabold my-2">{Math.round(current.temp_c)}°C</h1>
      <p className="text-xl font-medium">{current.condition.text}</p>
      <div className="flex justify-center gap-4 text-lg">
        <span>H: {Math.round(todayForecast.maxtemp_c)}°</span>
        <span>L: {Math.round(todayForecast.mintemp_c)}°</span>
      </div>
    </div>
  );
};

// Grid of detailed information cards
export const DetailedInfo: React.FC<WeatherDetailsProps> = ({ data }) => {
  const { current, forecast } = data;
  const { astro } = forecast.forecastday[0];

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">More Details</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <DetailCard icon={FiDroplet} title="Humidity" value={`${current.humidity}%`} />
        <DetailCard icon={FiWind} title="Wind Speed" value={`${current.wind_kph} km/h`} />
        <DetailCard icon={FiSun} title="UV Index" value={current.uv} />
        <DetailCard icon={FiEye} title="Visibility" value={`${current.vis_km} km`} />
        <DetailCard icon={WiSunrise} title="Sunrise" value={astro.sunrise} />
        <DetailCard icon={WiSunset} title="Sunset" value={astro.sunset} />
      </div>
    </div>
  );
};

// 10-Day Forecast List
export const Forecast: React.FC<WeatherDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6">
       <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">10-Day Forecast</h3>
      <ul className="space-y-3">
        {data.forecast.forecastday.map((day, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="font-medium w-1/4">
              {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
            </span>
            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8" />
            <div className="flex gap-2 w-1/4 justify-end">
              <span className="font-semibold">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-gray-300">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};