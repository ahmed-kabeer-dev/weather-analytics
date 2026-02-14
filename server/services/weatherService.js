import axios from 'axios';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cache from '../utils/cache.js';
import { calculateComfortScore } from './comfortScore.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Fetch weather for a single city
const fetchCityWeather = async (cityCode) => {
  const cacheKey = `weather_${cityCode}`;

  // Check if data exists in cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return { data: cachedData, cacheStatus: 'HIT' };
  }

  // If not in cache, fetch from API
  const response = await axios.get(BASE_URL, {
    params: { id: cityCode, appid: API_KEY }
  });

  // Save to cache
  cache.set(cacheKey, response.data);

  return { data: response.data, cacheStatus: 'MISS' };
};

// Fetch all cities, compute scores, return ranked list
export const getAllCitiesWeather = async () => {
  // Read cities.json
  const citiesPath = join(__dirname, '../data/cities.json');
  const raw = await readFile(citiesPath, 'utf-8');
  const { List } = JSON.parse(raw);

  const results = [];

  for (const city of List) {
    try {
      const { data, cacheStatus } = await fetchCityWeather(city.CityCode);

      const comfortScore = calculateComfortScore(data);

      results.push({
        id: data.id,
        cityName: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        temperature: Math.round((data.main.temp - 273.15) * 10) / 10,
        feelsLike: Math.round((data.main.feels_like - 273.15) * 10) / 10,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        cloudiness: data.clouds.all,
        pressure: data.main.pressure,
        visibility: data.visibility,
        comfortScore,
        cacheStatus,
        icon: data.weather[0].icon
      });
    } catch (error) {
      console.error(`Failed to fetch weather for city ${city.CityCode}:`, error.message);
    }
  }

  // Sort by comfort score descending (most comfortable first)
  results.sort((a, b) => b.comfortScore - a.comfortScore);

  // Add rank
  return results.map((city, index) => ({
    ...city,
    rank: index + 1
  }));
};

// For the cache debug endpoint
export const getCacheStatus = () => {
  const keys = cache.keys();
  return keys.map(key => ({
    key,
    ttl: cache.getTtl(key),
    status: cache.has(key) ? 'HIT' : 'MISS'
  }));
};