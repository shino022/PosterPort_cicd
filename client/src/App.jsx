import posters from "./data/posters";
import SearchBar from "./components/SearchBar";

export default function App() {
  //return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 items-center justify-center gap-4 px-2 py-2">
        {posters.map((poster) => (
          <div key={poster.id} className="shadow-md rounded-md px-2">
            <img
              src={poster.imageUrl}
              alt={poster.title}
              className="rounded-lg"
            />
            <h2>{poster.title}</h2>
            <p>{poster.description}</p>
            <p>{`$${poster.price}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
