const FilterBar = ({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  searchQuery,
  setSearchQuery,
  totalCities,
  filteredCount
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border
                    border-gray-100 dark:border-gray-700
                    shadow-sm p-4 mb-6">

      <div className="flex flex-wrap gap-3 items-center">

        {/* Search */}
        <div className="flex-1 min-w-48">
          <input
            type="text"
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border
                       border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       text-sm focus:outline-none focus:ring-2
                       focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400
                            font-medium whitespace-nowrap">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm
                       border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500 cursor-pointer"
          >
            <option value="comfort">Comfort Score</option>
            <option value="temp_high">Temperature (High)</option>
            <option value="temp_low">Temperature (Low)</option>
            <option value="name">City Name (A-Z)</option>
            <option value="humidity">Humidity</option>
          </select>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400
                            font-medium whitespace-nowrap">
            Filter:
          </label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm
                       border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Cities</option>
            <option value="comfortable">Comfortable (75-100)</option>
            <option value="moderate">Moderate (50-74)</option>
            <option value="uncomfortable">Uncomfortable (0-49)</option>
          </select>
        </div>

        {/* Results count */}
        <span className="text-xs text-gray-400 dark:text-gray-500
                         ml-auto whitespace-nowrap">
          {filteredCount} of {totalCities} cities
        </span>

      </div>
    </div>
  );
};

export default FilterBar;