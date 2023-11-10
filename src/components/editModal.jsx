import { useEffect, useState } from "react";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import exit from "../assets/close.png";
import edit from "../assets/edit-2.png";
import axios from "../axios";
import { Modal } from "react-bootstrap";
const EditModal = ({ showModal, setShowModal, selectedExtra, price , id,text ,count}) => {

  const [extra, setExtra] = useState([]);
  const [totalPrice, settotalPrice] = useState();


  useEffect(() => {
    axios.get(`/extra/${id}`).then((res) => {
      const ExtraWithCount = res.data.data.map((item) => {
        return { ...item, count: 0 };
      });
      setExtra(ExtraWithCount);
    });
  }, []);
  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {" "}
        <div className="container" style={{ backgroundColor: "white" }}>
          <div className="food-text p-3 ">
            <h2>{text} </h2>

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
                {price} ر.س
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
          <div className="d-flex justify-content-between align-items-center">
            <span> الاضافات</span>
            <span
              className="reqBadge"
              style={{ color: "#6A6E83", backgroundColor: "#CCD3D9" }}
            >
              اختياري
            </span>
          </div>
          <div>
            {extra.map((item, index) => {
              return (
                <>
                  <div
                    className=" d-flex gap-2 justify-content-between align-items-center"
                    style={{
                      marginBlock: `${index % 2 != 0 ? "0px" : "10px"}`,
                      paddingBlock: `${index % 2 != 0 ? "10px" : "0px"}`,
                      borderBlock: `${
                        index % 2 != 0 ? "1px solid #CCD3D9" : "none"
                      }`,
                    }}
                  >
                    <label className="form-check-label" for="flexCheckDefault">
                      {item.title}{" "}
                      <span
                        style={{ marginInlineStart: "5px", color: "#6A6E83" }}
                      >
                        {" "}
                        ({item.price} ر.س ){" "}
                      </span>
                    </label>
                    <div className="d-flex addMinus">
                      <span
                        onClick={() => {
                          if (item.count > 0) {
                            const newExtra = [...extra];
                            newExtra[index].count = newExtra[index].count - 1;
                            setExtra(newExtra);
                          }
                        }}
                      >
                        <img src={minus} />
                      </span>
                      <span>{item.qty}</span>

                      <span
                        onClick={() => {
                          const newExtra = [...extra];
                          newExtra[index].count = newExtra[index].count + 1;
                          setExtra(newExtra);
                        }}
                      >
                        <img src={plus} />
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div
          className="container mt-3 p-3"
          style={{ backgroundColor: "white" }}
        >
          <div className="d-flex justify-content-between">
            <span> هل لديك ملاحظات إضافية ؟</span>
            <span>
              <img src={edit} />
            </span>
          </div>
          <div>
            <input
              type="text"
              class="form-control mt-3"
              id="exampleFormControlInput1"
              placeholder=""
            />
          </div>
        </div>
        <div
          className="d-flex justify-content-between bottomCart"
          style={{
            transform: "translateX(0%) !important",
            maxWidth: "100% !important",
            width: "100%",
          }}
          onClick={() => submit()}
        >
          <span>الإضافة الي السلة</span>

          <span className="totalPrice">{totalPrice} ر.س</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
