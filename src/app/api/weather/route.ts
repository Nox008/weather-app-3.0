// src/app/api/weather/route.ts

import { NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY;
const API_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json({ error: 'Location parameter is missing' }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
  }

  try {
    const url = `${API_URL}?key=${API_KEY}&q=${location}&days=10&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      // Forward the error from the external API
      return NextResponse.json({ error: data.error.message || 'Failed to fetch weather data' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}