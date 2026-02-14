import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from '../components/WeatherCard';
import LogoutButton from '../components/LogoutButton';
import { fetchWeatherData } from '../services/weatherAPI';

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { getIdTokenClaims } = useAuth0();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchWeatherData(getIdTokenClaims);
      setCities(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 
                          border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Fetching weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 
                        flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              🌤 Weather Analytics
            </h1>
            <p className="text-sm text-gray-400">
              Cities ranked by Comfort Index
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={loadData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg 
                         text-sm hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
            <LogoutButton />
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-1">
                Updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8 
                        flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Score ≥ 75: Comfortable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Score 50–74: Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Score &lt; 50: Uncomfortable</span>
          </div>
          <span className="ml-auto text-sm text-gray-400">
            {cities.length} cities tracked
          </span>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        xl:grid-cols-4 gap-6">
          {cities.map(city => (
            <WeatherCard key={city.id} city={city} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;