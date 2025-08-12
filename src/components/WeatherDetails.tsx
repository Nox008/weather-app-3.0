// src/components/WeatherDetails.tsx
import React, { useMemo } from 'react';
import { WeatherData } from '@/types/weather';
import { FiWind, FiDroplet, FiSun, FiEye, FiMapPin, FiCalendar } from 'react-icons/fi';
import { WiSunrise, WiSunset } from 'react-icons/wi';

interface WeatherDetailsProps {
  data: WeatherData;
}

const StatCard: React.FC<{ icon: React.ElementType; label: string; value: React.ReactNode }> = ({ icon: Icon, label, value }) => (
  <div className="bg-gradient-to-br from-white/10 to-white/3 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-start gap-1 shadow-md hover:scale-[1.02] transition-transform duration-200">
    <div className="flex items-center gap-3 w-full">
      <div className="p-2 bg-white/6 rounded-lg grid place-items-center">
        <Icon className="text-2xl" />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-gray-300">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  </div>
);

const ForecastCard: React.FC<{ day: any; index: number; days: any[] }> = ({ day, index, days }) => {
  const points = days.map((d) => d.day.maxtemp_c);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const normalize = (v: number) => ((v - min) / (max - min || 1)) * 36 + 4;
  const path = points.map((v: number, i: number) => `${i === 0 ? 'M' : 'L'} ${i * 18} ${40 - normalize(v)}`).join(' ');

  return (
    <div className="min-w-[92px] flex-shrink-0 bg-white/6 border border-white/8 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center gap-2">
      <div className="text-xs text-gray-300">{index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
      <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-10 h-10" />
      <div className="text-sm font-bold">{Math.round(day.day.maxtemp_c)}°</div>
      <div className="text-xs text-gray-400">{Math.round(day.day.mintemp_c)}°</div>
      <svg width={100} height={44} viewBox="0 0 100 44" className="mt-1">
        <path d={path} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// Named export: CurrentWeather (keeps compatibility with existing imports)
export const CurrentWeather: React.FC<WeatherDetailsProps> = ({ data }) => {
  const { current, location, forecast } = data;
  const today = forecast.forecastday[0];
  const temp = Math.round(current.temp_c);
  const feels = Math.round(current.feelslike_c);
  const conditionIcon = current.condition.icon;
  const conditionText = current.condition.text;

  const meta = useMemo(() => ({
    high: Math.round(today.day.maxtemp_c),
    low: Math.round(today.day.mintemp_c),
  }), [today]);

  return (
    <header className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/6 p-3 shadow-md">
            <FiMapPin className="text-xl" />
          </div>
          <div>
            <div className="text-sm text-gray-300">{location.name}, <span className="text-gray-400">{location.country}</span></div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-6xl md:text-7xl font-extrabold font-mono leading-[0.9]">{temp}°</h1>
              <div className="flex flex-col">
                <div className="text-sm text-gray-300">Feels like</div>
                <div className="text-lg font-semibold">{feels}° • {conditionText}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-300 flex items-center gap-4">
              <div>H {meta.high}°</div>
              <div>L {meta.low}°</div>
              <div className="hidden sm:block">• Updated: <span className="font-medium">{new Date(current.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-self-end relative hidden md:flex items-center">
        <div className="w-36 h-36 rounded-xl bg-gradient-to-br from-white/6 to-white/3 grid place-items-center shadow-2xl">
          <img src={conditionIcon} alt={conditionText} className="w-28 h-28 opacity-95" />
        </div>
      </div>
    </header>
  );
};

// Named export: DetailedInfo
export const DetailedInfo: React.FC<WeatherDetailsProps> = ({ data }) => {
  const { current, forecast } = data;
  const today = forecast.forecastday[0];

  const meta = useMemo(() => ({
    humidity: current.humidity,
    wind: current.wind_kph,
    uv: current.uv,
    visibility: current.vis_km,
    sunrise: today.astro.sunrise,
    sunset: today.astro.sunset,
  }), [current, today]);

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <StatCard icon={FiDroplet} label="Humidity" value={`${meta.humidity}%`} />
      <StatCard icon={FiWind} label="Wind" value={`${meta.wind} km/h`} />
      <StatCard icon={FiSun} label="UV Index" value={meta.uv} />
      <StatCard icon={FiEye} label="Visibility" value={`${meta.visibility} km`} />
      <StatCard icon={WiSunrise} label="Sunrise" value={meta.sunrise} />
      <StatCard icon={WiSunset} label="Sunset" value={meta.sunset} />
    </section>
  );
};

// Named export: Forecast
export const Forecast: React.FC<WeatherDetailsProps> = ({ data }) => {
  const days = data.forecast.forecastday;

  return (
    <aside className="bg-gradient-to-br from-white/6 to-white/3 border border-white/10 backdrop-blur-md rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm uppercase text-gray-300 tracking-wider">10-Day</div>
        <div className="text-xs text-gray-400">Tap to expand</div>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 py-1">
        {days.map((d: any, i: number) => (
          <ForecastCard key={d.date} day={d} index={i} days={days} />
        ))}
      </div>
    </aside>
  );
};

// Default export: a composed WeatherDetails component for convenience
const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  // Defensive helpers for optional fields that some APIs omit
  const todayAny = data.forecast.forecastday[0] as any;
  const precipPercent = todayAny?.day?.daily_chance_of_rain ?? null;
  const precipMm = todayAny?.day?.totalprecip_mm ?? null;
  const snowChance = todayAny?.day?.daily_chance_of_snow ?? null;
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 text-white relative z-10">
      <CurrentWeather data={data} />
      <DetailedInfo data={data} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-white/6 to-white/3 border border-white/10 backdrop-blur-md rounded-2xl p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="uppercase text-xs text-gray-300 tracking-wider mb-2">Today • {new Date(data.forecast.forecastday[0].date).toLocaleDateString()}</div>
              <div className="text-sm text-gray-200 mb-3">{data.forecast.forecastday[0].day.condition.text}. Expect scattered clouds with intermittent sun.</div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-gray-300">Precipitation</div>
                  <div className="text-lg font-semibold">{precipPercent != null ? `${precipPercent}%` : precipMm != null ? `${precipMm} mm` : '—'}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-300">Chance of Snow</div>
                  <div className="text-lg font-semibold">{snowChance != null ? `${snowChance}%` : '0%'}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-300">Avg Temp</div>
                  <div className="text-lg font-semibold">{Math.round(data.forecast.forecastday[0].day.avgtemp_c)}°</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-[220px] h-[120px]">
              {(() => {
                // Some APIs don't include hourly data in the forecast type — be defensive.
                const todayAny = data.forecast.forecastday[0] as any;
                const hours = Array.isArray(todayAny?.hour) ? todayAny.hour.slice(0, 24) : null;
                if (!hours || hours.length === 0) return null;

                const tvals = hours.map((h: any) => h.temp_c);
                const maxT = Math.max(...tvals);
                const minT = Math.min(...tvals);
                const points = tvals.map((tv: number, i: number) => {
                  const x = (i / (tvals.length - 1)) * 220;
                  const y = 10 + ((maxT - tv) / (maxT - minT || 1)) * 90;
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <svg viewBox="0 0 220 120" width="220" height="120" preserveAspectRatio="none">
                    <polyline fill="none" stroke="white" strokeWidth={1.6} points={points} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
                  </svg>
                );
              })()}
            </div>
          </div>
        </div>

        <Forecast data={data} />
      </section>

      <footer className="mt-6 text-xs text-gray-400 flex items-center justify-between">
        <div>Data provided by your weather API</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2"><FiCalendar /> <span>{new Date().toLocaleDateString()}</span></div>
        </div>
      </footer>
    </main>
  );
};

export default WeatherDetails;
