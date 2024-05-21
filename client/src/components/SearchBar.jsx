import  { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All categories');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Category:', category, 'Search Term:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-md m-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 bg-white border-r border-gray-300 focus:outline-none"
      >
        <option>All categories</option>
        <option>Horror</option>
        <option>Sunny</option>
        <option>Green</option>
        {/* Add more categories as needed */}
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-4 py-2 border-0 focus:outline-none"
        placeholder="Search for posters..."
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.292 4.292-1.415 1.414-4.291-4.292zm-6.9-5.32a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
