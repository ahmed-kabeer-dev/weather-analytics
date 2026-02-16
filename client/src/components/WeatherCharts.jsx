import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const WeatherCharts = ({ cities }) => {
  const { darkMode } = useTheme();

  const textColor = darkMode ? '#9ca3af' : '#6b7280';
  const gridColor = darkMode ? '#374151' : '#f3f4f6';
  const bgColor = darkMode ? '#1f2937' : '#ffffff';

  // Color based on comfort score
  const getBarColor = (score) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#facc15';
    return '#ef4444';
  };

  // Color based on temperature
  const getTempColor = (temp) => {
    if (temp <= 0) return '#93c5fd';
    if (temp <= 15) return '#60a5fa';
    if (temp <= 25) return '#22c55e';
    if (temp <= 35) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

      {/* Comfort Score Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl
                      border border-gray-100 dark:border-gray-700
                      shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800
                       dark:text-gray-100 mb-1">
          Comfort Score by City
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          Ranked from most to least comfortable
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={cities}
            margin={{ top: 5, right: 10, left: -20, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="cityName"
              tick={{ fill: textColor, fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: textColor, fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: bgColor,
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                color: darkMode ? '#f3f4f6' : '#1f2937'
              }}
              formatter={(value) => [`${value}/100`, 'Comfort Score']}
            />
            <Bar dataKey="comfortScore" radius={[6, 6, 0, 0]}>
              {cities.map((city, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(city.comfortScore)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl
                      border border-gray-100 dark:border-gray-700
                      shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800
                       dark:text-gray-100 mb-1">
          Temperature by City
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          Current temperature in Celsius
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={cities}
            margin={{ top: 5, right: 10, left: -20, bottom: 60 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="cityName"
              tick={{ fill: textColor, fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fill: textColor, fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: bgColor,
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                color: darkMode ? '#f3f4f6' : '#1f2937'
              }}
              formatter={(value) => [`${value}°C`, 'Temperature']}
            />
            <Bar dataKey="temperature" radius={[6, 6, 0, 0]}>
              {cities.map((city, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getTempColor(city.temperature)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default WeatherCharts;