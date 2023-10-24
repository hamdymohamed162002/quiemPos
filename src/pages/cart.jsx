import { useNavigate } from "react-router";
import arrow from "../assets/arrow-right.png";
import ProductCard from "../components/card";
const Cart = () => {
    const router = useNavigate();
  return (
    <div className="container pt-5">
      <div className="d-flex gap-2">
        <div>
          <img src={arrow} onClick={()=>{
            router('/')
          }} />
        </div>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>السلة</div>
      </div>
      <div className="mt-3">
        <ProductCard cart />
        <ProductCard cart />
      </div>
      <div class="d-flex flex-column">
        <label for="name">هل يوجد كود خصم ؟ </label>
        <div class="number-active mt-1 p-1">
          <input type="text" name="name" id="name" placeholder="CX3020" />
          <button>تطبيق</button>
        </div>
      </div>
      <div className="checkout-container">
        <div className="data-row">
          <p style={{ fontSize: "18px" }}>ملخص الطلب</p>
        </div>

        <div className="content">
          <div className="data-row">
            <p>الإجمالي</p>
            <p>3050 جنيه</p>
          </div>
          <div className="data-row">
            <p>خدمة توصيل</p>
            <p>3050 جنيه</p>
          </div>
          <div className="data-row">
            <p>ضريبة</p>
            <p>3050 جنيه</p>
          </div>
          <div className="data-row">
            <p>خصم</p>
            <p>3050 جنيه</p>
          </div>
          <div
            className="data-row"
            style={{
              borderTop: "1px solid rgba(86, 86, 86,0.2)",
              paddingTop: "10px",
            }}
          >
            <p>اجمالي الطلب</p>
            <p>3050 جنيه</p>
          </div>
        </div>
      </div>
      <div className="nextbtn">
        التالي
      </div>
   
    </div>
  );
};

export default Cart;
