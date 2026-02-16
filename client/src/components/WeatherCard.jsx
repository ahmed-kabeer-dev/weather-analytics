const getScoreColor = (score) => {
  if (score >= 75) return 'text-green-500';
  if (score >= 50) return 'text-yellow-500';
  return 'text-red-500';
};

const getScoreBg = (score) => {
  if (score >= 75) return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
  if (score >= 50) return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
  return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
};

const WeatherCard = ({ city }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm
                    border border-gray-100 dark:border-gray-700
                    p-5 hover:shadow-md transition-all duration-300">
      {/* Rank Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="bg-blue-600 text-white text-xs font-bold 
                         px-3 py-1 rounded-full">
          #{city.rank}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full border font-medium
                         ${city.cacheStatus === 'HIT' 
                           ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 border-gray-200 dark:text-gray-400' 
                           : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200'}`}>
          {city.cacheStatus}
        </span>
      </div>

      {/* City Name & Country */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
          alt={city.description}
          className="w-12 h-12"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{city.cityName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-500">{city.country}</p>
        </div>
      </div>

      {/* Weather Description */}
      <p className="text-sm text-gray-600 capitalize mb-4 capitalize mb-4 italic">{city.description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Temperature</p>
          <p className="font-semibold text-gray-700 dark:text-gray-200">{city.temperature}°C</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Feels Like</p>
          <p className="font-semibold text-gray-700 dark:text-gray-200">{city.feelsLike}°C</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Humidity</p>
          <p className="font-semibold text-gray-700 dark:text-gray-200">{city.humidity}%</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Wind Speed</p>
          <p className="font-semibold text-gray-700 dark:text-gray-200">{city.windSpeed} m/s</p>
        </div>
      </div>

      {/* Comfort Score */}
      <div className={`rounded-xl border p-3 text-center ${getScoreBg(city.comfortScore)}`}>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Comfort Score</p>
        <p className={`text-3xl font-bold ${getScoreColor(city.comfortScore)}`}>
          {city.comfortScore}
          <span className="text-sm font-normal text-gray-400">/100</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;