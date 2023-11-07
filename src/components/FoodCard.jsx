import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import exit from "../assets/close.png"
import edit from '../assets/edit-2.png'
const FoodCard = ( {img,addtoMenu,text,price}) => {
    const [showModal,setShowModal] = useState(false)
    const [count,setcount] = useState(1)
    return ( 
    <>
        <div className="foodCard">
            <img src={img}/>
            <div>
                <h3 className='mt-2'>{text}</h3>
                <div className="d-flex justify-content-between align-items-center">
                    <div onClick={()=>
                        //  addtoMenu(img,text,price)
                        setShowModal(true)
                         } className="add-icon"> <AddIcon  sx={{color:'white',width:'26px',height:'26px'}}/></div>
                    <div> {price} ر.س</div>
                </div>
            </div>
        </div>
        <Modal size='lg' show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>  <div className="container" style={{ backgroundColor: "white" }}>
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
          <div className="d-flex justify-content-between">
            <span> الاضافات</span>
            <span
              className="reqBadge"
              style={{ color: "#6A6E83", backgroundColor: "#CCD3D9" }}
            >
              اختياري
            </span>
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
      
                            
        
        </div></Modal.Body>
        </Modal>
        
        </>
     );
}
 
export default FoodCard;