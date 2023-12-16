import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NavBar from "./components/navbar/navbar.jsx";
// import "./index.css";
import Cart from "./pages/cart.jsx";
import authReducer from './redux.js';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";

import Order from "./pages/orderPage.jsx";
import OrderFinish from "./pages/orderFinitsh.jsx";
import SideBar from "./components/sidebar/sidebar.jsx";
import MobileSideBar from "./components/sidebar/mobileSideBar.jsx";
import { StyledEngineProvider } from "@mui/styled-engine";
import { configureStore } from "@reduxjs/toolkit";

import { Provider } from 'react-redux';
const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<BrowserRouter>
<StyledEngineProvider>
  <Provider store={store}>

  <App />
  </Provider>

</StyledEngineProvider>



</BrowserRouter>
   

  </React.StrictMode>
);
