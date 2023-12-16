import { useEffect, useState } from "react";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import exit from "../assets/close.png";
import edit from "../assets/edit-2.png";
import axios from "../axios";
import { Modal } from "react-bootstrap";
const EditModal = ({
  showModal,
  setShowModal,
  selectedExtra,
  price,
  id,
  text,
  count,
  setMenu,
  index,
  menu,
}) => {
  const [extra, setExtra] = useState([]);
  const [totalPrice, settotalPrice] = useState();
  const [tempExtra, setTempExtra] = useState([...selectedExtra]);
const [qty,setqty]=useState(count)
  useEffect(() => {
    axios.get(`/pos/extra/${id}`).then((res) => {
      const ExtraWithCount = res.data.data.map((item) => {
        return { ...item, qty: 0 };
      });

      setExtra(ExtraWithCount);
    });
  }, []);
  function searchById(collection, targetId) {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === targetId) {
        return collection[i];
      }
    }
    return null; // Return null if the object with the given ID is not found
  }

  function submitHandler() {
    const tempMenuItem = { ...menu[index] };
    tempMenuItem.extra = tempExtra;
    tempMenuItem.qty = qty;

    const tempMenu = [...menu];
    tempMenu[index] = tempMenuItem;
   
    setMenu(tempMenu);
    setShowModal(false);
  }

useEffect(() => {

    const item = { ...menu[index] };
    item.extra = tempExtra;
    item.qty = qty;
    let total = item.price * item.qty;
    if (item.extra && Array.isArray(item.extra)) {
      // Calculate total for each extra item
      item.extra.forEach((extraItem) => {
        total += extraItem.price * extraItem.qty;
      });
    }
  
    settotalPrice( total);
 
},[tempExtra,qty])
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
                    if (qty > 0) {
                      setqty(qty - 1);
                      settotalPrice(totalPrice - price);
                    }
                  }}
                >
                  <img src={minus} />
                </span>
                <span>{qty}</span>

                <span
                  onClick={() => {
                    setqty(qty + 1);
                    settotalPrice(totalPrice + price);
                  }}
                >
                  <img src={plus} />
                </span>
              </div>
            </div>
          </div>
        </div>
        {extra.length ? (
          <div
            className="container mt-3 p-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span> الاضافات</span>
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
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
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
                            if (searchById(tempExtra, item.id)?.qty > 0) {
                              const newExtra = [...tempExtra];
                              newExtra[index].qty = newExtra[index].qty - 1;
                              if (newExtra[index].qty == 0) {
                                newExtra.splice(index, 1);
                              }

                              setTempExtra(newExtra);
                            }
                          }}
                        >
                          <img src={minus} />
                        </span>
                        <span>
                          {searchById(tempExtra, item.id)?.qty || Number(0)}
                        </span>

                        <span
                          onClick={() => {
                            if (!searchById(tempExtra, item.id)) {
                              let temp = { ...item };
                              temp.qty = temp.qty + 1;
                              const newExtra = [...tempExtra, temp];

                              setTempExtra(newExtra);
                            } else {
                              const newExtra = [...tempExtra];
                              newExtra[index].qty = newExtra[index].qty + 1;
                              setTempExtra(newExtra);
                            }
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
        ) : null}
        <div
          className="d-flex justify-content-between modalBtn"
          style={{
            transform: "translateX(0%) !important",
            maxWidth: "100% !important",
            width: "100%",
          }}
          onClick={() => submitHandler()}
        >
          <span>الإضافة الي السلة</span>

          <span className="totalPrice">{totalPrice} ر.س</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
