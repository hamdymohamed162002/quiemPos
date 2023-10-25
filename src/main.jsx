import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NavBar from "./components/navbar/navbar.jsx";
// import "./index.css";
import Cart from "./pages/cart.jsx";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";

import Order from "./pages/orderPage.jsx";
import OrderFinish from "./pages/orderFinitsh.jsx";
import SideBar from "./components/sidebar/sidebar.jsx";
import MobileSideBar from "./components/sidebar/mobileSideBar.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
   

  </React.StrictMode>
);
