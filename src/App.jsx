import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logo.png";
import res from "./assets/res.svg";
import Tab from "./components/tab";
import ProductCard from "./components/card";

import MobileSideBar from "./components/sidebar/mobileSideBar";
import SideBar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import {
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Order from "./pages/orderPage";
import PosPage from "./pages/posPage";
import './index.css'
import Cart from "./pages/cart";
import OrderFinish from "./pages/orderFinitsh";
import ClientPos from "./pages/ClientPos";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WaittingList from "./pages/waitingLists";
import Login from "./pages/login";

import { useSelector } from "react-redux";
import Cookies from "js-cookie";
function App() {
  let isLoggedIn=!!Cookies.get('token')
  function AuthGuard({ children }) {


    if (!isLoggedIn) {
        return <Navigate
         to="/login" />;
    }
    return <div style={{maxWidth:'100%',width:'100%'}}>{children}</div>;

};

  return (
    <>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={true}
pauseOnFocusLoss

pauseOnHover
theme="light"
/>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
   <div>
              <div
                style={{
                  display: "",
                  justifyContent: "space-between",
                  backgroundColor: "#ECF0EE",
                }}
                className="resposive-container"
              >
                <div className="responsive-sideBar"></div>

                <div className="main-page" style={{ minHeight: "100vh" }}>
                  <NavBar />

                  <PosPage />
                </div>
              </div>
            </div>
            </AuthGuard>
         
          }
        />
        <Route path="/order" element={<Order />} />
        <Route
          path="/ClientPos"
          element={
           <ClientPos />
          }
        />
        <Route path="/cart" element={<AuthGuard>
          <Cart/>
          </AuthGuard>} />
        <Route path="/orderFinish" element={<OrderFinish/>} />
        <Route path="/WaitList" element={<WaittingList />} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    </>
  );
}

export default App;
