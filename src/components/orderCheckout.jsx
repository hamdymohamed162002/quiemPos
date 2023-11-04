import shop from "../assets/shop-outline.png";
import truck from "../assets/vuesax-outline-truck-fast.png";
import cash from "../assets/moneys-outline.png";
import Select from 'react-select';
import MenuCard from "./menuCard";
import { useEffect, useState } from "react";
import axios from '../axios.js'
const OrderCheckOut = ({ menu, setMenu,setShow }) => {
  function delte(index) {
    let newMenu = [...menu];
    newMenu.splice(index, 1);
    setMenu(newMenu);
  }
  

  const [options,setOptions] = useState(0);
  const [acitve,setactive] = useState(0)
  useEffect(() => {
    axios.get('/customers').then(res=>{
    
      const newOptions= res.data.data.map(item=>{
        return {value:item.id,label:item.name}
      })
setOptions(newOptions)
    })
  }, []);
    const [coupon,setcoupon] = useState('')
const [couponError,setcouponError] = useState();
const [couponLoading,setcouponLoading] = useState(false)
    function copunHandler(){
      setcouponLoading(true)
      axios.post('/coupon',{coupon:coupon}).then(res=>{
        console.log(res.data)
      setcouponLoading(false)
      setcouponError(res.data.discount)

      })
      .catch(err=>{
       setcouponError(true)
      })
    }
  return (
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
          <div  style={{ display: "flex", flex: "1", fontSize: "16px" }}>
          <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder={'اختر العميل'}
        isClearable={true}
        isRtl={true}
        isSearchable={true}
        name="color"
        styles={{ control: (base) => ({ ...base, width: '100%' }) }}
        options={options}
        aria-label=".form-select-lg example"
   
      />
          </div>
     
      
          <div className="addClient" onClick={()=>setShow(true)}>عميل جديد</div>
        </div>
      </div>
      <div
        className="d-flex mt-3"
        style={{ border: "1px solid rgba(106,110,131,0.2)", borderRadius: "8px" }}
      >
        <div className={`order-btn ${acitve==0?'active':''}`} onClick={()=>setactive(0)}>
          <img src={truck} style={{width:'24px', height:'24px'}} />
          المطعم{" "}
        </div>
        <div  className={`order-btn ${acitve==1?'active':''}`} onClick={()=>setactive(1)}>
          <img src={shop} style={{width:'24px', height:'24px'}} />
          سفري{" "}
        </div>

        <div className={`order-btn ${acitve==2?'active':''}`} onClick={()=>setactive(2)}>
          <img src={cash} style={{width:'24px', height:'24px'}} />
          طلبات سيارة{" "}
        </div>
      </div>
      <div className="mt-3">
        <label className=" mb-1">رقم الطاولة </label>

        <select
          style={{ display: "flex", flex: "1", fontSize: "16px" }}
          className="form-select form-select-lg  "
          aria-label=".form-select-lg example"
        >
          <option selected> اختر رقم الطاولة </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
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
      </div>
      <div className="mt-3">
        <label className="fs-4 mb-3">المنتجات المضافة</label>

        {menu.length ? (
          <div>
            {menu.map((item, index) => {
              return (
                <MenuCard
                  index={index}
                  delte={delte}
                  img={item.img}
                  text={item.text}
                  price={item.price}
                  count={item.count}
                />
              );
            })}
          </div>
        ) : (
          <h1 style={{ fontSize: "16px",color:'red' }}>لا يوجد منتجات</h1>
        )}
      </div>
      <div class="d-flex flex-column mt-3 mb-2">
        <label for="name">هل يوجد كود خصم ؟ </label>
        <div class="number-active mt-1 p-1">
          <input onChange={(e)=>setcoupon(e.target.value)} type="text" name="name" id="name" placeholder="CX3020" />
          <button onClick={copunHandler}>تطبيق</button>
        </div>
      </div>
      <div   className="bottomCart" style={{transform:'translateX(0%) !important'}}>
      تأكيد الطلب
      </div>
    </div>
  );
};

export default OrderCheckOut;
