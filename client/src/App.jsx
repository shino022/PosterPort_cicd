import posters from "./data/posters";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import { useEffect, useState } from "react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All categories");
  const [filteredResults, setFilteredResults] = useState([]);

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
  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[70%]">
        <SearchBar
          posters={posters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          setFilteredResults={setFilteredResults}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 px-2 py-2">
          {filteredResults.map((poster) => (
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
      </div>
    </div>
  );
}
