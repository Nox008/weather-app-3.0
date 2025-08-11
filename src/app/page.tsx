// src/app/page.tsx
'use client';


import { useState, useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { WeatherData } from '@/types/weather';
import { CurrentWeather, DetailedInfo, Forecast } from '@/components/WeatherDetails';
import LoadingSkeleton from '@/components/LoadingSkeleton';


const getBackgroundClass = (weatherCode: number) => {
 if (weatherCode === 1000) return "bg-sunny-animated";
 if (weatherCode === 1003) return "bg-partly-cloudy";
 if (weatherCode === 1006 || weatherCode === 1009) return "bg-cloudy-animated";
 if ([1030, 1135, 1147].includes(weatherCode)) return "bg-foggy-animated";
 if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246, 1249].includes(weatherCode)) return "bg-rainy-animated";
 if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1228, 1237, 1252, 1255, 1258, 1261, 1264, 1267].includes(weatherCode)) return "bg-snowy-animated";
 if ([1087, 1273, 1276, 1279, 1282].includes(weatherCode)) return "bg-thunderstorm-animated";
 return "bg-default"; // Fallback
};


const RainAnimation = () => {
 return [...Array(50)].map((_, i) => (
 <div
 key={i}
 className="rain-drop"
 style={{
 left: `${Math.random() * 100}vw`,
 animationDelay: `${Math.random()}s`,
 animationDuration: `${0.5 + Math.random() * 0.5}s`,
 width: `${Math.random() * 2 + 1}px`,
 height: `${Math.random() * 10 + 5}px`,
 }}
 />
 ));
};


const SnowAnimation = () => {
 return [...Array(50)].map((_, i) => (
 <div
 key={i}
 className="snow-flake"
 style={{
 left: `${Math.random() * 100}vw`,
 animationDelay: `${Math.random() * 2}s`,
 animationDuration: `${2 + Math.random() * 3}s`,
 width: `${Math.random() * 3 + 1}px`,
 height: `${Math.random() * 3 + 1}px`,
 }}
 />
 ));
};


const ThunderstormAnimation = () => {
 return [...Array(5)].map((_, i) => (
 <div
 key={i}
 className="lightning"
 style={{
 left: `${Math.random() * 100}vw`,
 top: `${Math.random() * 100}vh`,
 width: `${Math.random() * 5 + 10}px`,
 height: `${Math.random() * 50 + 50}px`,
 animationDelay: `${Math.random() * 5}s`,
 }}
 />
 ));
};


export default function Home() {
 const [location, setLocation] = useState('');
 const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);


 const fetchWeather = async (query: string) => {
 setLoading(true);
 setError(null);
 try {
 const res = await fetch(`/api/weather?location=${encodeURIComponent(query)}`);
 const data = await res.json();


 if (!res.ok) {
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
 fetchWeather('Kochi'); // Default location - Keeping it relevant to the context
 }
 );
 } else {
 fetchWeather('Kochi');
 }
 }, []);


 const handleSearch = () => {
 if (location) {
 fetchWeather(location);
 setLocation('');
 }
 };


 const backgroundClass = weatherData
 ? getBackgroundClass(weatherData.current.condition.code)
 : 'bg-default';


 const animation = useMemo(() => {
 if (backgroundClass === 'bg-rainy-animated') {
 return <RainAnimation />;
 } else if (backgroundClass === 'bg-snowy-animated') {
 return <SnowAnimation />;
 } else if (backgroundClass === 'bg-thunderstorm-animated') {
 return <ThunderstormAnimation />;
 }
 return null;
 }, [backgroundClass]);


 return (
 <main className={`min-h-screen flex flex-col items-center justify-center p-4 text-white transition-all duration-500 ${backgroundClass}`}>
 <div className="bg-animation-container">{animation}</div>
 <div className="w-full max-w-4xl backdrop-blur-sm p-4 md:p-8 rounded-lg z-10">
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