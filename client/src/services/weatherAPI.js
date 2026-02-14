import axios from 'axios';

export const fetchWeatherData = async (getIdTokenClaims) => {

  const claims = await getIdTokenClaims();
  const token = claims.__raw;

const response = await axios.get('/api/weather', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};