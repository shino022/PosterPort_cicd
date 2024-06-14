import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Cart from "./Cart.jsx";
import Payment from "./Payment.jsx";
import Form from "./Form.jsx";
import posters from "../data/posters.js";
import AiImages from "./AiImages.jsx";

function MainComponent() {
  const [counts, setCounts] = useState({}); // State for tracking counts

  const incrementCount = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };
  const decrementCount = (id) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] - 1,
    }));
  };
  const router = createBrowserRouter([
    { path: "/", element: <App counts={counts} setCounts={setCounts} incrementCount={incrementCount} /> },
    { path: "/payment", element: <Payment /> },
    {
      path: "/cart",
      element: <Cart counts={counts} setCounts={setCounts} incrementCount={incrementCount} decrementCount={decrementCount}/>,
    },
    {
      path: "/form",
      element: <Form />,
    },
    {
      path: "/aiPosters",
      element: <AiImages />,
    }
  ]);

  useEffect(() => {
    // Initialize counts state with each poster having a count of 0
    const initialCounts = {};
    posters.forEach((poster) => {
      initialCounts[poster.id] = 0;
    });
    setCounts(initialCounts);
  }, []);

  return <RouterProvider router={router} />;
}

export default MainComponent;
