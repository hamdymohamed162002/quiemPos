import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./editModal";
import { useState } from "react";
const MenuCard = ({ img, text, price, count, index, delte, extra,setMenu,id }) => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div
      className="d-flex justify-content-between align-items-center mt-2"
      style={{ borderBottom: "1px solid #A8B1CE", paddingBottom: "5px" }}
    >
     <div>
     <div className="d-flex gap-2 align-items-center">
        <img
          src={img}
          style={{ width: "59px", height: "59px", borderRadius: "5px" }}
        />
        <div className="d-flex flex-column  ">
          <span style={{ fontSize: "16px", fontWeight: "600" }}>{text}</span>
          <span style={{ fontSize: "14px" }}>{price} ر.س</span>
          <span style={{ fontSize: "14px" }}>الكمية : {count}</span>
        </div>
      </div>
      <div>
      <h5>
        الاضافات
      </h5>
      <div>
        {
            extra.map((item,index)=>{
                return <span style={{marginInlineEnd:'5px'}}> {item.title}x{item.qty} </span>
            })
        }
      </div>
      </div>
     </div>
      <div className="d-flex gap-2">
        <div
          onClick={() => setShowModal(true)  }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(35 211 249)",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <EditIcon sx={{ color: "white" }} />{" "}
        </div>
        <div
          onClick={() => delte(index)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E91D1D",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <DeleteIcon sx={{ color: "white" }} />
        </div>
      </div>
    </div>
    <EditModal 
    showModal={showModal}
    setShowModal={setShowModal}
    selectedExtra={extra}
    setMenu={setMenu}
    text={text}
    price={price}
    id={id}
    count={count}
    />
    </>
  );
};

export default MenuCard;
