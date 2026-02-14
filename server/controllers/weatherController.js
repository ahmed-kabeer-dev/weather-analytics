import { getAllCitiesWeather, getCacheStatus } from '../services/weatherService.js';

export const getWeatherData = async (req, res) => {
  try {
    const data = await getAllCitiesWeather();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCacheDebug = async (req, res) => {
  try {
    const cacheInfo = getCacheStatus();
    res.json({ success: true, cache: cacheInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};