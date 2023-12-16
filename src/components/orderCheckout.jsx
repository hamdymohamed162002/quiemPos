import shop from "../assets/shop-outline.png";
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

import { motion } from "framer-motion";
import { Modal } from "react-bootstrap";
import animaion from "../assets/done.json";
import Lottie from "react-lottie";
import { TextField } from "@mui/material";
const OrderCheckOut = ({
  menu,
  setMenu,
  setShow,
  checkout,
  setcheckout,
  updated,
  setUpdated,
}) => {
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [customer_id, setcustomer_id] = useState(null);
  const [customerError, setcustomerError] = useState(false);
  const [table, settable] = useState(null);
  const [tableError, settableError] = useState(false);
  const [company, setcompany] = useState(null);
  const [companyError, setcompanyError] = useState(false);
  const [productError, setproductError] = useState(false);
  const [payMethod, setpayMethod] = useState("cash");
  const [orderLoading, setorderLoading] = useState(false);
  const [orderSuccess, setorderSuccess] = useState(false);
  const [orderError, setorderError] = useState(false);
  //modal functions
  const [CompanyToSelect, setCompanyToSelect] = useState([]);
  function delte(index) {
    let newMenu = [...menu];
    newMenu.splice(index, 1);
    setMenu(newMenu);
  }
  function discountCalc(total, discount) {
    return Math.round(total - (discount / 100) * total);
  }

  useEffect(() => {
    axios
      .get("/pos/companies")
      .then((res) => {
        setCompanyToSelect(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

  function editHandler(price, text, img, index, extra) {
    setShowModal(true);
    setExtra(extra);
    settext(text);
    setprice(price);
    setcount(menu[index].qty);
    settotalPrice(price);
  }

  const [options, setOptions] = useState(0);
  const [acitve, setactive] = useState(0);
  useEffect(() => {
    axios.get("/pos/customers").then((res) => {
      const newOptions = res.data.data.map((item) => {
        return { value: item.id, label: item.name };
      });
      setOptions(newOptions);
      setUpdated(false);
    });
  }, [updated]);
  const [coupon, setcoupon] = useState("");
  const [couponError, setcouponError] = useState();

  const [couponLoading, setcouponLoading] = useState(false);
  const [couponSuccess, setcouponSuccess] = useState(false);
  const [discount, setdiscount] = useState(0);
  const [right, setright] = useState(0);
  function copunHandler() {
    setcouponLoading(true);
    axios
      .post("/pos/coupon", { coupon: coupon })
      .then((res) => {
        console.log(res.data);
        setcouponSuccess(true);
        setcouponLoading(false);
        setdiscount(res.data.discount);
      })
      .catch((err) => {
        setcouponError(true);
        setcouponLoading(false);
      });
  }
  function submitHandler() {
    let flag1,
      flag2,
      flag3,
      flag4 = false;
    if (customer_id == null) {
      setcustomerError(true);
      flag1 = true;
    } else {
      flag1 = false;

      setcustomerError(false);
    }
    if (acitve == 0 && table == null) {
      settableError(true);
      flag2 = true;
    } else {
      flag2 = false;

      settableError(false);
    }
    if (acitve == 3 && company == null) {
      setcompanyError(true);
      flag3 = true;
    } else {
      flag3 = false;
      setcompanyError(false);
    }
    if (menu.length == 0) {
      flag4 = true;
      setproductError(true);
    } else {
      flag4 = false;
      setproductError(false);
    }
    if (flag1 || flag2 || flag3 || flag4) {
      return;
    }
    let postData = {
      customer_id: customer_id,
      products: menu,
      order_type: acitve == 1 ? "takeaway" : acitve == 2 ? "car" : "",
      cash_amount: checkout,
      payment_method: payMethod,
      coupon: coupon,
    };
    if (acitve == 0) {
      postData.order_type = "restaurant";
      postData.table = table;
    }
    if (acitve == 3) {
      postData.order_type = "company";
      postData.company = company;
      postData.cash_amount =
        checkout + (searchById(CompanyToSelect, +company)?.extra || Number(0));
    }
    setorderLoading(true);
    axios
      .post("/pos/order", postData)
      .then((res) => {
        console.log(res.data);
        setorderLoading(false);
        setShowSuccesModal(true);
        setorderSuccess(true);
        setMenu([]);
        setcompany(null);
        settable(null);
        setcheckout(0);
        setdiscount(null);
      })
      .catch((err) => {
        setorderLoading(false);
        setorderError(true);
      });
  }
  return (
    <>
      <div className="orderCheckCard" style={{ borderRadius: "8px" }}>
        <div
          className="HeadCard d-flex justify-content-between align-items-center"
          style={{ paddingBottom: "10px", borderBottom: "0.5px solid #A8B1CE" }}
        >
          <h3 style={{ fontSize: "24px" }}>معلومات الطلب</h3>
          <h3
            style={{ color: "red", fontSize: "16px", cursor: "pointer" }}
            onClick={() => setMenu([])}
          >
            مسح الكل
          </h3>
        </div>

        <div className="mt-3">
          <label className=" mb-1">العميل </label>
          <div className="d-flex gap-2 align-items-center">
            <div style={{ display: "flex", flex: "1", fontSize: "16px" }}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder={"اختر العميل"}
                isClearable={true}
                isRtl={true}
                onChange={(e) => setcustomer_id(e ? e.value : null)}
                isSearchable={true}
                name="color"
                styles={{ control: (base) => ({ ...base, width: "100%" }) }}
                options={options}
                aria-label=".form-select-lg example"
              />
            </div>

            <div
              className="addClient"
              role="button"
              onClick={() => setShow(true)}
            >
              عميل جديد
            </div>
          </div>
        </div>
        {customerError && (
          <div className="mt-1" style={{ color: "red" }}>
            يرجي اختيار العميل
          </div>
        )}

        <div
          className="d-flex mt-3"
          style={{
            border: "1px solid rgba(106,110,131,0.2)",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <div className="tabMarker" style={{ right: right }}></div>
          <div
            className={`order-btn ${acitve == 0 ? "active" : ""}`}
            onClick={() => {
              setactive(0);
              setright("0%");
              setcompany(null);
            }}
          >
            <img src={shop} style={{ width: "24px", height: "24px" }} />
            المطعم{" "}
          </div>
          <div
            className={`order-btn ${acitve == 1 ? "active" : ""}`}
            onClick={() => {
              setactive(1);
              setright("25%");

              setcompany(null);
              settable(null);
            }}
          >
            <img src={truck} style={{ width: "24px", height: "24px" }} />
            سفري{" "}
          </div>

          <div
            className={`order-btn ${acitve == 2 ? "active" : ""}`}
            onClick={() => {
              setactive(2);
              setright("50%");
              setcompany(null);
              settable(null);
            }}
          >
            <img src={cash} style={{ width: "24px", height: "24px" }} />
            طلبات سيارة{" "}
          </div>
          <div
            className={`order-btn ${acitve == 3 ? "active" : ""}`}
            onClick={() => {
              setactive(3);
              setright("75%");
              setcompany(null);
            }}
          >
            <img src={cash} style={{ width: "24px", height: "24px" }} />
            برامج التوصيل{" "}
          </div>
        </div>
        {acitve == 0 ? (
          <div className="mt-3">
            <label className=" mb-1">رقم الطاولة </label>
            <input
              className="form-control"
              placeholder="رقم الطاولة "
              onChange={(e) => settable(e.target.value)}
            />

            {tableError && (
              <div className="mt-1" style={{ color: "red" }}>
                يرجي اختيار رقم الطاولة
              </div>
            )}
          </div>
        ) : null}
        {acitve == 3 ? (
          <div className="mt-3">
            <label className=" mb-1">برامج التوصيل </label>

            <select
              style={{ display: "flex", flex: "1", fontSize: "16px" }}
              className="form-select form-select-lg  "
              aria-label=".form-select-lg example"
              onChange={(e) => setcompany(e.target.value)}
            >
              <option selected> اختر برامج التوصيل </option>

              {CompanyToSelect.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
            {companyError && (
              <div className="mt-1" style={{ color: "red" }}>
                يرجي اختيار برنامج التوصيل
              </div>
            )}
          </div>
        ) : null}
        <div className="mt-3">
          {menu.length ? (
            <>
              <label className="fs-4 mb-3">المنتجات المضافة</label>
              <div>
                {menu.map((item, index) => {
                  return (
                    <MenuCard
                      index={index}
                      id={item.id}
                      delte={delte}
                      setMenu={setMenu}
                      img={item.img}
                      text={item.text}
                      price={item.price}
                      count={item.qty}
                      editHandler={editHandler}
                      extra={item.extra}
                      menu={menu}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <AddShoppingCartIcon
                style={{
                  textAlign: "center",
                  fontSize: "28px",
                  color: "#6A6E83",
                }}
              />
              <h5
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  color: "#6A6E83",
                }}
              >
                اضف منتجات
              </h5>
            </div>
          )}
        </div>
        <div class="d-flex flex-column mt-3 mb-2">
          <label for="name">هل يوجد كود خصم ؟ </label>
          <div class="number-active mt-1 p-1">
            <input
              onChange={(e) => setcoupon(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder=""
            />
            <button disabled={couponLoading} onClick={copunHandler}>
              {couponLoading ? "جاري ..." : "تطبيق"}
            </button>
          </div>
          {couponError && (
            <div className="mt-1" style={{ color: "red" }}>
              الكود غير صحيح
            </div>
          )}
          {couponSuccess && (
            <div className="mt-1" style={{ color: "green" }}>
              تم تفعيل الكود و حصلت علي خصم {discount} %
            </div>
          )}
        </div>

        {checkout ? (
          <div className="mt-3">
            <h4>ملخص الطلب</h4>
            <div className="d-flex justify-content-between">
              <div style={{ fontSize: "18px" }}>تكلفة المنتجات</div>
              <div style={{ fontSize: "18px" }}> {checkout} ر.س </div>
            </div>
            {company && (
              <div className="d-flex justify-content-between">
                <div style={{ fontSize: "18px" }}>رسوم الخدمة </div>
                <div style={{ fontSize: "18px" }}>
                  {" "}
                  {searchById(CompanyToSelect, +company)?.extra} ر.س
                </div>
              </div>
            )}
            {discount ? (
              <div className="d-flex justify-content-between">
                <div style={{ fontSize: "18px" }}> الخصم </div>
                <div style={{ fontSize: "18px" }}> {discount}%</div>
              </div>
            ) : null}
            <div
              className="d-flex justify-content-between"
              style={{ paddingTop: "10px", borderTop: "1px solid #A8B1CE" }}
            >
              <div style={{ fontSize: "18px", fontWeight: "600" }}>
                {" "}
                اجمالي التكلفة
              </div>
              <div style={{ fontSize: "18px" }}>
                {" "}
                {discount
                  ? discountCalc(
                      checkout +
                        (searchById(CompanyToSelect, +company)?.extra ||
                          Number(0)),
                      discount
                    )
                  : checkout +
                    (searchById(CompanyToSelect, +company)?.extra ||
                      Number(0))}{" "}
                ر.س{" "}
              </div>
            </div>
            <h4 className="mt-3 mb-2"> طريقة الدفع</h4>
            <div className="row justifty-content-between">
              <div className=" col-6">
                <div
                  className={payMethod == "cash" ? "payType active" : "payType"}
                  onClick={() => setpayMethod("cash")}
                >
                  نقدي
                </div>
              </div>
              <div className=" col-6">
                <div
                  className={payMethod == "visa" ? "payType active" : "payType"}
                  onClick={() => setpayMethod("visa")}
                >
                  شبكة
                </div>
              </div>
            </div>
          </div>
        ) : null}
  <div
          className="container mt-3 p-3"
          style={{ backgroundColor: "white" }}
        >
          <div className="d-flex justify-content-between">
            <span> هل لديك ملاحظات إضافية ؟</span>
            <span
         
            >
              <img src={edit}/>
            </span>
          </div>
          <div>
          <input type="text" class="form-control mt-3" id="exampleFormControlInput1" placeholder=""/>

          </div>
      
                            
        
        </div>
        <button
          className="bottomCart"
          style={{
            transform: "translateX(0%) !important",
            border: "none",
            width: "100%",
            maxWidth: "100%",
          }}
          onClick={submitHandler}
          disabled={orderLoading}
        >
          {orderLoading ? <span class="loader"></span> : "تأكيد الطلب"}
        </button>
        {productError && (
          <div className="mt-1" style={{ color: "red" }}>
            اضف بعض المنتجات
          </div>
        )}
      </div>
      <Modal show={showSuccesModal} onHide={() => setShowSuccesModal(false)}>
        <Modal.Body>
          <div>
            <Lottie
              key={Math.random()}
              options={defaultOptions}
              height={200}
              width={200}
            />

            <motion.div
              key={acitve + Math.random()}
              style={{
                textAlign: "center",
                fontSize: "28px",
                color: "#55BF40",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              تمت اضافة الطلب
            </motion.div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderCheckOut;
