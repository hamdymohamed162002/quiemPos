const OrderCheckOut = () => {
  return (
    <div className="orderCheckCard" style={{ borderRadius: "8px" }}>
      <div className="HeadCard d-flex justify-content-between align-items-center" style={{paddingBottom:'10px' , borderBottom:'0.5px solid #A8B1CE'}}>
        <h3 style={{ fontSize: "24px" }}>معلومات الطلب</h3>
        <h3 style={{ color: "red", fontSize: "16px", cursor: "pointer" }}>
          مسح الكل
        </h3>
      </div>

      <div>
        <label className=" mb-1">العميل </label>
      <div className="d-flex gap-2 align-items-center">
      <select style={{display:'flex',flex:'1',fontSize:'16px'}}
          className="form-select form-select-lg  "
          aria-label=".form-select-lg example"
        >
          <option selected> اختر العميل </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div className="addClient">
عميل جديد
        </div>
      </div>
      </div>
      <div class="d-flex flex-column">
        <label for="name">هل يوجد كود خصم ؟ </label>
        <div class="number-active mt-1 p-1">
          <input type="text" name="name" id="name" placeholder="CX3020" />
          <button>تطبيق</button>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckOut;
