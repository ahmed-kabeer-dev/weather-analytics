export const calculateComfortScore = (weatherData) => {
  const tempKelvin = weatherData.main.feels_like;
  const tempCelsius = tempKelvin - 273.15;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const cloudiness = weatherData.clouds.all;

  // --- Temperature Score ---
  // Ideal range: 18°C to 24°C scores highest
  // Below 0°C or above 40°C scores 0
  let tempScore;
  if (tempCelsius >= 18 && tempCelsius <= 24) {
    tempScore = 100;
  } else if (tempCelsius < 18) {
    tempScore = Math.max(0, 100 - (18 - tempCelsius) * 5);
  } else {
    tempScore = Math.max(0, 100 - (tempCelsius - 24) * 5);
  }

  // --- Humidity Score ---
  // Ideal range: 30% to 60% scores highest
  // Above 90% or below 10% scores very low
  let humidityScore;
  if (humidity >= 30 && humidity <= 60) {
    humidityScore = 100;
  } else if (humidity < 30) {
    humidityScore = Math.max(0, 100 - (30 - humidity) * 3);
  } else {
    humidityScore = Math.max(0, 100 - (humidity - 60) * 3);
  }

  // --- Wind Speed Score ---
  // Ideal: 0-5 m/s (gentle breeze)
  // Above 15 m/s (strong wind) scores 0
  const windScore = Math.max(0, 100 - windSpeed * 6.67);

  // --- Cloudiness Score ---
  // Partly cloudy (20-50%) is ideal
  // Fully overcast scores lower
  let cloudScore;
  if (cloudiness >= 20 && cloudiness <= 50) {
    cloudScore = 100;
  } else if (cloudiness < 20) {
    cloudScore = 80 + cloudiness;
  } else {
    cloudScore = Math.max(0, 100 - (cloudiness - 50) * 2);
  }

  // --- Final Score ---
  const finalScore =
    tempScore * 0.4 +
    humidityScore * 0.3 +
    windScore * 0.2 +
    cloudScore * 0.1;

  return Math.round(finalScore);
};