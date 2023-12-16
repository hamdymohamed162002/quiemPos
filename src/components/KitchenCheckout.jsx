import truck from "../assets/vuesax-outline-truck-fast.png";
import cash from "../assets/moneys-outline.png";
import Select from "react-select";
import MenuCard from "./menuCard";
import { useEffect, useState } from "react";
import axios from "../axios.js";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import exit from "../assets/close.png";
import edit from "../assets/edit-2.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import dumy from "../assets/dummy.png";
import { motion } from "framer-motion";
import { Modal } from "react-bootstrap";
import animaion from "../assets/done.json";
import Lottie from "react-lottie";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import shop from "../assets/shop-outline.png";

const KitchenCheckout = ({
  menu,
  setMenu,
  setShow,
  checkout,
  setcheckout,
  updated,
  setUpdated,
  SingleProductCheckout,
}) => {
  const [company, setcompany] = useState(null);

  //modal functions
  const [CompanyToSelect, setCompanyToSelect] = useState([]);

  function searchById(collection, targetId) {
    console.log(collection, targetId);
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === targetId) {
        return collection[i];
      }
    }
    return null; // Return null if the object with the given ID is not found
  }
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animaion,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid ",
    },
  };

  const [options, setOptions] = useState(0);
  const [acitve, setactive] = useState(0);

  const [coupon, setcoupon] = useState("");
  const [couponError, setcouponError] = useState();

  const [couponLoading, setcouponLoading] = useState(false);
  const [couponSuccess, setcouponSuccess] = useState(false);
  const [discount, setdiscount] = useState(0);
  const [right, setright] = useState(0);
  useEffect(()=>{
    console.log(SingleProductCheckout);
  },[SingleProductCheckout])

  return (
    <>
      <div
        className="orderCheckCard KitchenCheckot"
        style={{ borderRadius: "8px" }}
      >
        <div
          className="HeadCard d-flex justify-content-between align-items-center"
          style={{ paddingBottom: "10px", borderBottom: "0.5px solid #A8B1CE" }}
        >
          <h3 style={{ fontSize: "24px" }}>معلومات الطلب</h3>
          <div className="icon">
            <img src={shop} />
            في المطعم
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <span>رقم الطاولة</span>
          <span>3 </span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span> برامج التوصيل</span>
          <span>3 </span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>عدد الوجبات </span>
          <span>{SingleProductCheckout?.items.length} </span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>التكلفة </span>
          <span>{SingleProductCheckout?.total} ر.س </span>
        </div>

        <div className="mt-3">
          <>
            <label className="fs-4 mb-1">المنتجات المضافة</label>
           {
            SingleProductCheckout?.items.map((item) => (
              <div>
              <div
                className="d-flex justify-content-between align-items-center mt-2"
                style={{
                  borderBottom: "1px solid #A8B1CE",
                  paddingBottom: "5px",
                }}
              >
                <div>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src={item.image}
                      style={{
                        width: "59px",
                        height: "59px",
                        borderRadius: "5px",
                      }}
                    />
                    <div className="d-flex flex-column  ">
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {item.product.title }
                      </span>
                      <span style={{ fontSize: "14px" }}>{item.price} ر.س</span>
                      <span style={{ fontSize: "14px" }}>الكمية : {item?.quantity }</span>
                    </div>
                  </div>
                  <div>
        {
          item?.product?.extras.length ? 
            <>
            <h5 className="mt-2">
             الاضافات
           </h5>
           <div>
             <ul style={{listStyle:'none'}}>
        {     item?.product?.extras?.map((extra)=>(
            <li style={{marginInlineEnd:'5px'}}> ads <span style={{color:'rgba(31,129,226,1)',fontWeight:'600'}} >  x 3 </span> </li>
         
        ))}
          
             </ul>
           </div></>:null
        
        }
                  </div>
                </div>
             
              </div>
            </div>
            ))
           }
          </>
        </div>

        <div className="mt-3">
          <h4>ملخص الطلب</h4>
          <div className="d-flex justify-content-between">
            <div style={{ fontSize: "18px" }}>تكلفة المنتجات</div>
            <div style={{ fontSize: "18px" }}> {checkout} ر.س </div>
          </div>

          <div className="d-flex justify-content-between">
            <div style={{ fontSize: "18px" }}>رسوم الخدمة </div>
            <div style={{ fontSize: "18px" }}>
              {" "}
              {searchById(CompanyToSelect, +company)?.extra} ر.س
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div style={{ fontSize: "18px" }}> الخصم </div>
            <div style={{ fontSize: "18px" }}> {discount}%</div>
          </div>

          <div
            className="d-flex justify-content-between"
            style={{ paddingTop: "10px", borderTop: "1px solid #A8B1CE" }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600" }}>
              {" "}
              اجمالي التكلفة
            </div>
            <div style={{ fontSize: "18px" }}>{SingleProductCheckout?.total} ر.س </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KitchenCheckout;
