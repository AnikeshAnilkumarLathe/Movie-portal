import React from 'react';
import { universalContext } from '../Context/Context';

function SearchBar() {
  const { results, setResults } = universalContext();

  return (
    <div>
       <h2 className="text-3xl font-semibold mb-4 text-center text-white">
        What do you want to watch today?
      </h2>
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg max-w-md mx-auto">
     
      <form onSubmit={(e) => e.preventDefault()} className="flex">
        <input
          type="text"
          placeholder="Search"
          value={results}
          onChange={(e) => setResults(e.target.value)}
          className="flex-1 p-3 rounded-l-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </form>
    </div>
    </div>
  );
}

export default SearchBar;
