import posters from "./data/posters";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import CartButton from "./components/CartButton";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function App({ counts, incrementCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All categories");
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [found, setFound] = useState(true);

  // useEffect(() => {
  //   // Initialize counts state with each poster having a count of 0
  //   const initialCounts = {};
  //   posters.forEach((poster) => {
  //     initialCounts[poster.id] = 0;
  //   });
  //   setCounts(initialCounts);
  // }, []);

  useEffect(() => {
    const filterResults = () => {
      let results = posters.map((poster) => ({
        ...poster,
        count: counts[poster.id] || 0, // Ensure counts are carried over when filtering
      }));
      if (category !== "All categories") {
        results = results.filter((poster) => poster.category === category);
      }
      if (searchTerm) {
        results = results.filter((poster) =>
          poster.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredResults(results);
      setCurrentPage(1);
    };

    filterResults();
  }, [searchTerm, category]);

  //separate useEffect to ensure change in counts does not set page to 1
  useEffect(() => {
    const filterResults = () => {
      let results = posters.map((poster) => ({
        ...poster,
        count: counts[poster.id] || 0, // Ensure counts are carried over when filtering
      }));

      setFilteredResults(results);
    };

    filterResults();
  }, [counts]);

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
    <div className="flex flex-col items-center min-h-screen min-w-[350px]">
      <Hero />

      <div className="flex flex-col items-center max-w-[70%] w-full mb-4">
        <SearchBar
          posters={posters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          setFilteredResults={setFilteredResults}
        />

        <div className="my-2 flex w-full justify-end items-center">
          <Link to="/form">
            <button className="flex gap-2 items-center bg-black text-white border rounded-md m-2 p-2 hover:scale-105">
              Generate Image Using OpenAI API
              <FaRegImage className="text-xl" />
            </button>
          </Link>
          <Link to="/payment">
            <button className="flex gap-2 items-center bg-yellow-500 text-violet-900 rounded-md m-2 p-2 hover:scale-105">
              Simulate Payment
              <MdOutlinePayment className="text-xl" />
            </button>
          </Link>
          <CartButton />
        </div>
        {found ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 px-2 py-2">
              {currentItems.map((poster) => (
                <Card
                  key={poster.id}
                  posterId={poster.id}
                  posterImg={poster.imageUrl}
                  posterTitle={poster.title}
                  posterDescription={poster.description}
                  posterPrice={poster.price}
                  posterCount={poster.count}
                  incrementCount={() => incrementCount(poster.id)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className={`px-4 py-2 mx-2 text-black rounded-md border border-white ${
                  currentPage === 1 ? "bg-gray-500" : "bg-amber-400"
                }`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {/* Page Buttons */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 mx-1 text-black rounded-md border border-white ${
                    currentPage === index + 1 ? "bg-amber-500" : "bg-amber-300"
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 mx-2 text-black rounded-md border border-white ${
                  currentPage === totalPages ? "bg-gray-500" : "bg-amber-400"
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        ) : (
          <div className="text-3xl w-[300px] text-center rounded-md text-white py-2 bg-slate-700 border-2 border-white m-auto">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
