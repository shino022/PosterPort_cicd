import { FiSearch } from "react-icons/fi";

function SearchBar({ searchTerm, setSearchTerm, category, setCategory }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-md mt-2 pr-1 w-[100%]"
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="hidden sm:block px-4 py-2 bg-white border-r border-gray-300 focus:outline-none rounded-l-lg"
      >
        <option>All categories</option>
        <option>Horror</option>
        <option>Sunny</option>
        <option>Night</option>
        <option>Wasteland</option>
        <option>Invasion</option> 
        <option>Anime</option> 
        {/* Add more categories as needed */}
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-4 py-2 border-0 focus:outline-none"
        placeholder="Search for posters..."
      />

      <button
        type="submit"
        className="px-4 py-2 bg-pink-500 text-white focus:outline-none flex items-center justify-center rounded-r-md"
      >
        <FiSearch className="h-5 w-5 " />
      </button>
    </form>
  );
}

export default SearchBar;
