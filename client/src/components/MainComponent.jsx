import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Cart from "./Cart.jsx";
import Payment from "./Payment.jsx";
import posters from "../data/posters.js";
function MainComponent() {
  const [counts, setCounts] = useState({});  // State for tracking counts

  const router = createBrowserRouter([
    { path: "/", element: <App counts={counts} setCounts={setCounts} /> },
    { path: "/payment", element: <Payment /> },
    {
      path: "/cart",
      element: <Cart counts={counts} setCounts={setCounts} />
    },
  ]);

  useEffect(() => {
    // Initialize counts state with each poster having a count of 0
    const initialCounts = {};
    posters.forEach((poster) => {
      initialCounts[poster.id] = 0;
    });
    setCounts(initialCounts);
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default MainComponent;
