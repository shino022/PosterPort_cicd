import posters from "./data/posters";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All categories");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const filterResults = () => {
      let results = posters;
      if (category !== "All categories") {
        results = results.filter((poster) => poster.category === category);
      }

      if (searchTerm) {
        results = results.filter((poster) =>
          poster.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredResults(results);
    };

    filterResults();
  }, [searchTerm, category]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col items-center max-w-[70%] w-full mb-4">
        <SearchBar
          posters={posters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          setFilteredResults={setFilteredResults}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 px-2 py-2">
          {currentItems.map((poster) => (
            <Card
              key={poster.id}
              posterId={poster.id}
              posterImg={poster.imageUrl}
              posterTitle={poster.title}
              posterDescription={poster.description}
              posterPrice={poster.price}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-2 text-black rounded-md border-2 border-neutral-900 ${currentPage===1? 'bg-gray-500': 'bg-amber-400'}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {/* Page Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 mx-1 text-black rounded-md ${currentPage === index + 1 ? 'bg-amber-500' : 'bg-amber-300'}`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 mx-2 text-black rounded-md border-2 border-neutral-900 ${currentPage===totalPages? 'bg-gray-500': 'bg-amber-400'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
