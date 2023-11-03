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

function App() {
  const [types, settypes] = useState([
    "قسم البرجر",
    "قسم اللحوم",
    "أسماك",
    "فرايد تشيكن",
    "القسم الغربي",
    "وجبات عائلية",
    "اضافات",
  ]);
  const [active, setactive] = useState(0);
  function changeActive(index) {
    setactive(index);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/order" element={<Order />} />
        <Route
          path="/ClientPos"
          element={
            <div
              className="container px-lg-0 px-sm-5 "
              style={{ position: "relative" }}
            >
              <div className="d-flex justify-content-between pt-3 ">
                <div className="logoOnDesk">
                  <img src={logo} />
                </div>
                <div className="logoOnDesk">
                  <img src={res} />
                </div>
              </div>

              <div className="mt-4">
                <h3>ماذا تريد ان تطلب ؟</h3>
                <input className="search-area" placeholder=".. ابحث عن" />
              </div>
              <div className="overscrollPhone">
                <ul
                  className="nav flex-row nav-pills mb-3 mt-3  flex-nowrap p-0 "
                  style={{ minWidth: "800px" }}
                  id="pills-tab"
                  role="tablist"
                >
                  {types.map((item, index) => {
                    return (
                      <Tab
                        active={index == active}
                        setactive={setactive}
                        index={index}
                        key={`${item}${index}`}
                        text={item}
                        click={changeActive}
                      />
                    );
                  })}
                </ul>
              </div>
              <div className="row">
                <ProductCard />
                <ProductCard />

                <ProductCard />
              </div>
              <div
                onClick={() => router("/cart")}
                className="bottomCart align-items-center"
                style={{
                  position: "fixed",
                  bottom: "0px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      padding: "10px 15px",
                    }}
                  >
                    {" "}
                    2
                  </div>
                  <div style={{ color: "white" }}>الذهاب إلي السلة</div>
                </div>
                <div style={{ color: "white" }}>30.00 ر.س</div>
              </div>
            </div>
          }
        />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/orderFinish" element={<OrderFinish/>} />
        

      </Routes>
    </>
  );
}

export default App;
