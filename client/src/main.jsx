// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import Cart from "./components/Cart.jsx";
// import Payment from "./components/Payment.jsx";

// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   { path: "/payment", element: <Payment /> },
//   { path: "/cart", element: <Cart /> },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainComponent from "./components/MainComponent.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>
);
