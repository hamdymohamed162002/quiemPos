import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import RemoveIcon from '@mui/icons-material/Remove';

import exit from "../assets/close.png";
import edit from "../assets/edit-2.png";
import axios from "../axios";
import defaullt from '../assets/default.png'
const FoodCard = ({ img, addtoMenu, text, price, id,setcheckout }) => {
  const [showModal, setShowModal] = useState(false);
  const [count, setcount] = useState(1);
  const [extra, setExtra] = useState([]);
  const [totalPrice, settotalPrice] = useState(price);
  useEffect(() => {
    axios.get(`/pos/extra/${id}`).then((res) => {
     
      let ExtraWithCount = res.data.data.map((item) => {
        return { ...item, count: 0 };
      });
      setExtra(ExtraWithCount);
    });
  }, []);
  useEffect(() => {
    let extraPrice = 0;
    extra.forEach((item) => {
      extraPrice = extraPrice + item.price * item.count;
    });
    settotalPrice(count * price + extraPrice);
  }, [extra, count]);

  function submit() {
    addtoMenu(img, text, price, extra, count,id);
    setcheckout((perv)=>perv+totalPrice)
    setShowModal(false);
  }

  return (
    <>
      <div className="foodCard" style={{cursor:'pointer'}} onClick={() => setShowModal(true)}>
        <img src={img} />
        <div>
          <h3 className="mt-2">{text}</h3>
          <div className="d-flex justify-content-between align-items-center">
            <div  className="add-icon">
              {" "}
              <AddIcon  sx={{ color: "white", width: "26px", height: "26px" }} />
            </div>
            <div> {price} ر.س</div>
          </div>
        </div>
      </div>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
        <h2 >{text} </h2>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="container d-flex gap-2" style={{ backgroundColor: "white" }}>
            <img src={img} style={{width:'100px',height:'100px', borderRadius:'5px'}} />
            <div className="food-text  ">
              <h2 style={{fontSize:'20px'}}>{text} </h2>

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
                <div className="d-flex addMinus align-items-center ">
                  <span
                  style={{cursor:'pointer'}}
                    onClick={() => {
                      if (count > 0) {
                        setcount(count - 1);
                        settotalPrice(totalPrice - price);
                      }
                    }}
                  >
                    <RemoveIcon sx={{width:'28px' ,height:'28px'}} />
                  </span>
                  <span >{count}</span>

                  <span    style={{cursor:'pointer'}}
                    onClick={() => {
                      setcount(count + 1);
                      settotalPrice(totalPrice + price);
                    }}
                  >
                  <AddIcon sx={{width:'28px' ,height:'28px'}} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="container mt-3 p-3"
            style={{ backgroundColor: "white" }}
          >
           
          </div>
        {
          extra.length ? 
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
                    <div className="d-flex addMinus align-items-center">
                      <span    style={{cursor:'pointer'}}
                        onClick={() => {
                          if (item.count > 0) {
                            const newExtra = [...extra];
                            newExtra[index].count = newExtra[index].count - 1;
                            setExtra(newExtra);
                          }
                        }}
                      >
                        <RemoveIcon sx={{width:'28px' ,height:'28px'}} />
                      </span>
                      <span>{item.count}</span>

                      <span    style={{cursor:'pointer'}}
                        onClick={() => {
                          const newExtra = [...extra];
                          newExtra[index].count = newExtra[index].count + 1;
                          setExtra(newExtra);
                        }}
                      >
                  <AddIcon sx={{width:'28px' ,height:'28px'}} />
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>:null
        }
        
          
        </Modal.Body>
        <Modal.Footer>

        <div
            className="d-flex justify-content-between modalBtn"
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
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default FoodCard;
