const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="flex justify-center items-center w-full min-h-[100vh]">
      <div className="mx-2">
        <h2 className="mb-2 ml-1 text-xl">
          Enter a prompt to generate your own image!{" "}
          <span className="bg-black p-1 text-red-600">
            MUST BE LESS THAN 100 CHARACTERS
          </span>
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <textarea
            name=""
            id=""
            // rows={5}
            // cols={100}
            className="rounded-lg p-2 w-full"
            placeholder="ex: a white siamese cat"
            maxLength={100}
          ></textarea>
          <button className="text-xl text-indigo-800 bg-yellow-500 p-1 rounded-md mt-2">
            GENERATE...
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
