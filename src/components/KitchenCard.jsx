import { useEffect } from "react";
import packge from "../assets/Package.png";
import shop from "../assets/shop-outline.png";
import axios from "../axios";
const KitchenCard = ({ ended, item, start,refetch,setSingleProductCheckout }) => {

  const handleStartCooking = () => {
    axios.get(`/kitchen/startcooking/${item?.id}`).then((res) => {

      refetch()
    });
  };
  const handleEndOrder = () => {    
    axios.get(`/kitchen/finish/${item?.id}`).then((res) => {
    
      refetch()
    });
  }
  return (
    <div className="KitchenCard mt-2" onClick={()=>{
      setSingleProductCheckout(item)
    }}>
      <div className="KitchenCardHeader">
        <div className="KitchenCardHeaderImage d-flex">
          <img src={packge} />
          <div>
            <h4> {item?.customer}</h4>
            <p>رقم الطلب #{item?.order_number}</p>
          </div>
        </div>
        <div className="icon">
          <img src={shop} />
          في المطعم
        </div>
      </div>
      <div className="KitchenCardBody">
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
          <span>{item?.items.length} </span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <span>التكلفة </span>
          <span>{item?.grand_total} ر.س </span>
        </div>
        <div
          className={`${ended ? "SubmitBtn ended" : "SubmitBtn"}`}
          onClick={start ? handleStartCooking : handleEndOrder}
        >
          {ended ? "منتهي" : " بدأ الطبخ"}
        </div>
      </div>
    </div>
  );
};

export default KitchenCard;
