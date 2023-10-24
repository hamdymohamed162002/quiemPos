import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./index.css";
import Cart from './pages/cart.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';


import Order from './pages/orderPage.jsx';
import OrderFinish from './pages/orderFinitsh.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/order",
    element:<Order/>,
  },
  {
    path: "/cart",
    element:<Cart/>,
  },
  {
    path: "/orderFinish",
    element:<OrderFinish/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
