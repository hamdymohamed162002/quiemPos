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
import { Modal } from "react-bootstrap";
const OrderCheckOut = ({ menu, setMenu, setShow ,checkout}) => {
  const [customer_id, setcustomer_id] = useState(null);
  const [customerError, setcustomerError] = useState(false);
  const [table, settable] = useState(null);
  const [tableError, settableError] = useState(false);
  const [company, setcompany] = useState(null);
  const [companyError, setcompanyError] = useState(false);
  const [productError, setproductError] = useState(false);

  const [orderLoading, setorderLoading] = useState(false);
  const [orderSuccess, setorderSuccess] = useState(false);
  const [orderError, setorderError] = useState(false);
  //modal functions

  function delte(index) {
    let newMenu = [...menu];
    newMenu.splice(index, 1);
    setMenu(newMenu);
  }

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
    axios.get("/customers").then((res) => {
      const newOptions = res.data.data.map((item) => {
        return { value: item.id, label: item.name };
      });
      setOptions(newOptions);
    });
  }, []);
  const [coupon, setcoupon] = useState("");
  const [couponError, setcouponError] = useState();
  
  const [couponLoading, setcouponLoading] = useState(false);
  const [couponSuccess, setcouponSuccess] = useState(false);
  const [discount, setdiscount] = useState(0);
  const [right, setright] = useState(0);
  function copunHandler() {
    setcouponLoading(true);
    axios
      .post("/coupon", { coupon: coupon })
      .then((res) => {
        console.log(res.data);
        setcouponSuccess(true)
        setcouponLoading(false);
   setdiscount(res.data.discount)
      })
      .catch((err) => {
        setcouponError(true);
        setcouponLoading(false);

      });
  }
  function submitHandler() {

    let flag1,flag2,flag3,flag4 = false
    if (customer_id == null) {
      setcustomerError(true);
      flag1 = true
    } else {
      flag1 = false

      setcustomerError(false);
    }
    if (acitve == 0 && table == null) {
      settableError(true);
      flag2 = true
    } else {
      flag2 = false

      settableError(false);
    }
    if (acitve == 3 && company == null) {
      setcompanyError(true);
      flag3 = true
    } else {
      flag3 = false
      setcompanyError(false);
    }
    if(menu.length == 0){
      flag4 = true
      setproductError(true)
    }
    else{
      flag4 = false
      setproductError(false)
    }
    if(flag1||flag2||flag3||flag4){
      return
    }
    let postData ={
      customer_id:customer_id,
      products:menu,
      order_type:acitve==1?'takeaway':acitve==2?'car':'',
      cash_amount:checkout,
      payment_method:'cash',
      coupon:coupon,
    }
    if(acitve==0)
    {
      postData.order_type = 'restaurant'
      postData.table= table
    }
   if(acitve==3){
    postData.order_type = 'company'
    postData.company= company
   }
setorderLoading(true)
   axios.post('/order',postData).then(res=>{
      console.log(res.data)
setorderLoading(false)
setorderSuccess(true)

    }
    ).catch(err=>{
      setorderLoading(false)
      setorderError(true)
    })
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
                onChange={(e) => setcustomer_id(e.value)}
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

            <select
              style={{ display: "flex", flex: "1", fontSize: "16px" }}
              className="form-select form-select-lg  "
              onChange={(e) => settable(e.target.value)}
              aria-label=".form-select-lg example"
            >
              <option selected> اختر رقم الطاولة </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            {
            tableError && (
              <div className="mt-1" style={{ color: "red" }}>
                يرجي اختيار رقم الطاولة
              </div>
            )
          }
          </div>
       
        ) : null}
        {acitve == 3 ? (
          <div className="mt-3">
            <label className=" mb-1">برامج التوصيل </label>

            <select
              style={{ display: "flex", flex: "1", fontSize: "16px" }}
              className="form-select form-select-lg  "
              aria-label=".form-select-lg example"
            >
              <option selected> اختر برامج التوصيل </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            {
            companyError && (
              <div className="mt-1" style={{ color: "red" }}>
                يرجي اختيار برنامج التوصيل 
              </div>
            )
          }
          </div>
        ) : null}
        <div className="mt-3">
          <label className="fs-4 mb-3">المنتجات المضافة</label>

          {menu.length ? (
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
                  />
                );
              })}
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <AddShoppingCartIcon
                style={{
                  textAlign: "center",
                  fontSize: "28px",
                  color: "#D0021B",
                }}
              />
              <h5
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  color: "#D0021B",
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
              placeholder="CX3020"
            />
            <button disabled={couponLoading} onClick={copunHandler}>{couponLoading?"جاري ...":"تطبيق"}</button>
          </div>
{
  couponError && (
    <div className="mt-1" style={{ color: "red" }}>
      الكود غير صحيح
    </div>
  )
  
}{
   couponSuccess && (
    <div className="mt-1" style={{ color: "green" }}>
     تم تفعيل الكود و حصلت علي خصم {discount} %
    </div>
  )
}
        </div>
        <button
          className="bottomCart"
          style={{ transform: "translateX(0%) !important",border:'none' }}
          onClick={submitHandler}
          disabled={orderLoading}
        >
   {
    orderLoading?(
      <span class="loader"></span>

    ):"تأكيد الطلب"
   }
        </button>
        {
          productError && (
            <div className="mt-1" style={{ color: "red" }}>
        اضف بعض المنتجات
            </div>
          )
        }
      </div>
    </>
  );
};

export default OrderCheckOut;
