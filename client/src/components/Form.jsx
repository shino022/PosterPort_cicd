import { useState } from "react";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);  // State to track loading status

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    setUrl("");
    setPrompt("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}posters/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log(data);
      setUrl(data.imageUrl);
      setLoading(false);  // Stop loading (after setting the URL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[100vh]">
      <div className="mx-2 w-[500px]">
        <h2 className="mb-2 ml-1 text-xl text-white">
          Enter a prompt to generate your own image!{" "}
          <span className="bg-black p-1 text-red-600">
            MUST BE LESS THAN 100 CHARACTERS
          </span>
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={handleChange}
            className="rounded-lg p-2 w-full"
            placeholder="ex: a white siamese cat"
            maxLength={100}
          ></textarea>
          <button className="text-xl text-indigo-800 bg-yellow-500 p-1 rounded-md mt-2">
            GENERATE...
          </button>
          <Link to="/" className="inline-block">
            <button className="flex group justify-center items-center gap-1 text-xl text-amber-500 bg-indigo-600 p-1 ml-2 rounded-md hover:bg-indigo-700">
              HOME <RxArrowTopRight className="group-hover:rotate-45" />
            </button>
          </Link>
        </form>
        {loading ? <div>Loading...</div> : url && <img src={url} alt="Generated" className="rounded-lg w-full mt-2 border-2" />}
      </div>
    </div>
  );
};

const Ima = ({ url }) => {
  return (
    <div>
      <img src={url} className="rounded-lg w-full mt-2 border-2" />
    </div>
  );
}
export default Form;
