import { useState } from "react";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import exit from "../assets/close.png"
import edit from '../assets/edit-2.png'
import { useNavigate } from "react-router";
const Order = ({ title, text, price = 0 }) => {
  const [totalPrice, settotalPrice] = useState(price);
  const [count, setcount] = useState(1);
  const router = useNavigate();
  return (
    <div style={{ backgroundColor: "#F2F5FF" ,paddingBottom:'40px' }}>
      <div className="rest-banner">
        <div className="banner-imagee d-flex align-items-end"></div>
        <div style={{position:'absolute',zIndex:'1000',top:'10px',right:'10px'}} onClick={()=>router('/ClientPos')}> <img src={exit}/></div>
      </div>
      <div>
        <div className="container" style={{ backgroundColor: "white" }}>
          <div className="food-text p-3 ">
            <h2>كلاسيك </h2>
            <p className="mb-0">
              قطعة برجر لحم بقري مشوي ، خس ، مخلل ومايونيز تقدم مع البطاطس
              المقلية{" "}
            </p>

            <div className="d-flex justify-content-between ">
              <a
                className=""
                style={{
                  color: "black",
                  fontSize: "18px",
                  textDecoration: "none",
                }}
              >
                {" "}
                995 ر.س
              </a>
              <div className="d-flex addMinus">
                <span
                  onClick={() => {
                    if (count > 0) {
                      setcount(count - 1);
                      settotalPrice(totalPrice - price);
                    }
                  }}
                >
                  <img src={minus} />
                </span>
                <span>{count}</span>

                <span
                  onClick={() => {
                    setcount(count + 1);
                    settotalPrice(totalPrice + price);
                  }}
                >
                  <img src={plus} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container mt-3 p-3"
          style={{ backgroundColor: "white" }}
        >
          <div>
            <div className="d-flex justify-content-between">
              <span>اختر الحجم</span>
              <span className="reqBadge">مطلوب</span>
            </div>
            <div>
              <div
                className="d-flex gap-2"
                style={{
                  marginBottom: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #CCD3D9",
                }}
              >
                <div className="checkDiv active">
                  {" "}
                  <div></div>
                </div>
                <span>وسط (15.00 ر.س)</span>
              </div>
              <div className="d-flex gap-2">
                <div className="checkDiv"></div>
                <span>وسط (15.00 ر.س)</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container mt-3 p-3"
          style={{ backgroundColor: "white" }}
        >
          <div className="d-flex justify-content-between">
            <span> الاضافات</span>
      
          </div>
          <div>
            <div
              className=" d-flex gap-2"
              style={{
                marginBottom: "10px",
                paddingBottom: "10px",
                borderBottom: "1px solid #CCD3D9",
              }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                style={{ borderRadius: "50%", width: "24px", height: "24px" }}
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                مشروم
              </label>
            </div>
            <div className=" d-flex gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                style={{ borderRadius: "50%", width: "24px", height: "24px" }}
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                مشروم
              </label>
            </div>
          </div>
        </div>
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
      </div>
      <div  onClick={()=>router('/')} className="bottomCart align-items-center" style={{position:'fixed', bottom:'0px',display:'flex' , justifyContent:'space-between',padding:'5px',borderRadius:'4px'}}>

<div className="d-flex gap-2 align-items-center">

  <div style={{color:'white'}}>الإضافة الي السلة</div>
</div>
<div style={{color:'white'}}>
30.00 ر.س
</div>
</div>
    </div>
  );
};

export default Order;
