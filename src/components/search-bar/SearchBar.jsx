import React, { useState } from 'react';
import './SearchBar.css'; // Import CSS file for styling

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://api.example.com/search?query=${query}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Use onKeyDown instead of onKeyPress
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-item">
              {result.title || "No title available"}
            </div>
          ))
        ) : (
          query && <div>No results found</div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
