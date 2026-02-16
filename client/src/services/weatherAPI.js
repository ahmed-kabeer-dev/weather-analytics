import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchWeatherData = async (getIdTokenClaims) => {

  const claims = await getIdTokenClaims();
  const token = claims.__raw;

const response = await axios.get(
  'https://weather-analytics-server.onrender.com/api/weather',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};