import React, { useState, useEffect, useCallback } from 'react';

const BookFilter = ({ activeFilter, onFilterChange, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');

  // Use useCallback to prevent infinite loop
  const handleEmptySearch = useCallback(() => {
    if (searchText === '') {
      onSearch(searchCriteria, '');
    }
  }, [searchText, searchCriteria, onSearch]);

  // Watch for changes in the search text and trigger search if empty
  useEffect(() => {
    // Only run this effect when searchText is empty
    if (searchText === '') {
      onSearch(searchCriteria, '');
    }
    // Remove onSearch from dependencies to prevent infinite loop
  }, [searchText, searchCriteria]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCriteria, searchText);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="mb-6">
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow flex">
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder="Search books..."
              className="flex-grow px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors md:rounded-l-none"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </div>
          </button>
        </div>
      </form>

      {/* Status filter buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Books
        </button>
        
        <button
          onClick={() => onFilterChange('read')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'read'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Read Books
        </button>
        
        <button
          onClick={() => onFilterChange('unread')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'unread'
              ? 'bg-yellow-600 text-white'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          }`}
        >
          Unread Books
        </button>
      </div>
    </div>
  );
};

export default BookFilter; 