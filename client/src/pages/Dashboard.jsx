import { useState, useEffect, useMemo  } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from '../components/WeatherCard';
import LogoutButton from '../components/LogoutButton';
import DarkModeToggle from '../components/DarkModeToggle';
import FilterBar from '../components/FilterBar';
import WeatherCharts from '../components/WeatherCharts';
import { fetchWeatherData } from '../services/weatherAPI';

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const [sortBy, setSortBy] = useState('comfort');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const processedCities = useMemo(() => {
    let result = [...cities];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(city =>
        city.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply comfort level filter
    if (filterBy === 'comfortable') {
      result = result.filter(city => city.comfortScore >= 75);
    } else if (filterBy === 'moderate') {
      result = result.filter(city =>
        city.comfortScore >= 50 && city.comfortScore < 75
      );
    } else if (filterBy === 'uncomfortable') {
      result = result.filter(city => city.comfortScore < 50);
    }

    // Apply sort
    switch (sortBy) {
      case 'comfort':
        result.sort((a, b) => b.comfortScore - a.comfortScore);
        break;
      case 'temp_high':
        result.sort((a, b) => b.temperature - a.temperature);
        break;
      case 'temp_low':
        result.sort((a, b) => a.temperature - b.temperature);
        break;
      case 'name':
        result.sort((a, b) => a.cityName.localeCompare(b.cityName));
        break;
      case 'humidity':
        result.sort((a, b) => b.humidity - a.humidity);
        break;
      default:
        break;
    }

    return result;
  }, [cities, sortBy, filterBy, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 
                          border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Fetching weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900
                    transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b
                         border-gray-200 dark:border-gray-700
                         sticky top-0 z-10 transition-colors
                         duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 
                        flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              🌤 Weather Analytics
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Cities ranked by Comfort Index
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Charts toggle button */}
            <button
              onClick={() => setShowCharts(prev => !prev)}
              className={`px-3 py-2 rounded-lg text-sm
                         font-medium transition-all duration-200
                         ${showCharts
                           ? 'bg-blue-600 text-white'
                           : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                         }`}
            >
              📊 {showCharts ? 'Hide Charts' : 'Show Charts'}
            </button>

            <button
              onClick={loadData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg 
                         text-sm hover:bg-blue-700 transition-colors hidden sm:block"
            >
              Refresh
            </button>
            <DarkModeToggle />
            <LogoutButton />
            </div>
            </div>
            {lastUpdated && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Updated: {lastUpdated}
              </p>
              </div>
            )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Charts Section */}
        {showCharts && cities.length > 0 && (
          <WeatherCharts cities={cities} />
        )}

        {/* Summary Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 mb-8 
                        flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Score ≥ 75: Comfortable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Score 50–74: Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Score &lt; 50: Uncomfortable</span>
          </div>
          <span className="ml-auto text-sm text-gray-400">
            {cities.length} cities tracked
          </span>
        </div>

         {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalCities={cities.length}
          filteredCount={processedCities.length}
        />

        {/* No results message */}
        {processedCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              No cities match your search or filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterBy('all');
              }}
              className="mt-4 text-blue-500 hover:text-blue-600
                         text-sm underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        xl:grid-cols-4 gap-5">
          {processedCities.map(city => (
            <WeatherCard key={city.id} city={city} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;