import arrow from "../assets/arrow-right.png";
import ProductCard from "../components/card";
import shop from "../assets/shop-outline.png";
import truck from "../assets/vuesax-outline-truck-fast.png";
import cash from '../assets/moneys-outline.png';
import card from '../assets/card-outline.png'
import { useNavigate } from "react-router";
const OrderFinish = () => {
    const router=useNavigate()

  return (
    <div className="container pt-5">
      <div className="d-flex gap-2">
        <div>
          <img src={arrow} onClick={()=>{
            router('/cart')
          }} />
        </div>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>السلة</div>
      </div>
      <div className="mt-3">
        <ProductCard num={1} />
        <ProductCard num={3} />
      </div>
      <div>
        <label className="fs-3 mb-3">اختر الفرع</label>
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option selected> فرع الرياض</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div>
        <label className="fs-3 mb-3">نوع الطلب </label>
        <div className="d-flex justify-content-center gap-3">
          <div className="">
            <div className="d-flex gap-2 justify-content-center checkBtn active">
              <img src={shop} />
              محلي
            </div>
          </div>
          <div className="">
            <div className="d-flex gap-2 justify-content-center checkBtn ">
              <img src={truck} />
              سفري
            </div>
          </div>
        </div>
      </div>
      <div>
 
        <select
          className="form-select form-select-lg mb-3 mt-3"
          aria-label=".form-select-lg example"
        >
          <option selected>  رقم الطاولة </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div>
        <label className="fs-3 mb-3">نوع الدفع  </label>
        <div className="d-flex justify-content-center gap-3">
          <div className="">
            <div className="d-flex gap-2 justify-content-center checkBtn active">
              <img src={cash} />
              نقدي
            </div>
          </div>
          <div className="">
            <div className="d-flex gap-2 justify-content-center checkBtn ">
              <img src={card} />
              الكتروني
            </div>
          </div>
        </div>
      </div>
      <div>
      <label className="fs-3 mb-3"> بيانات الشخصية</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="اسمك الشخصي"/>
      <input type="text" class="form-control mt-2" id="exampleFormControlInput1" placeholder="رقم الجوال "/>


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
      <div className="nextbtn">تأكيد الطلب</div>
    </div>
  );
};

export default OrderFinish;
