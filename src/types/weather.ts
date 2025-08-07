// src/types/weather.ts
export interface WeatherData {
    location: {
      name: string;
      country: string;
      localtime: string;
    };
    current: {
      temp_c: number;
      temp_f: number;
      feelslike_c: number;
      feelslike_f: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_kph: number;
      wind_mph: number;
      humidity: number;
      uv: number;
      vis_km: number;
      vis_miles: number;
    };
    forecast: {
      forecastday: {
        date: string;
        day: {
          maxtemp_c: number;
          maxtemp_f: number;
          mintemp_c: number;
          mintemp_f: number;
          condition: {
            text: string;
            icon: string;
          };
        };
        astro: {
          sunrise: string;
          sunset: string;
        };
      }[];
    };
  }