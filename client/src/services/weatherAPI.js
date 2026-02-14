import axios from 'axios';

export const fetchWeatherData = async () => {
  const response = await axios.get('/api/weather');
  return response.data;
};