import { Modal } from "react-bootstrap";
import OrderCheckOut from "../orderCheckout";
import { useEffect, useState } from "react";

const EditOrder = ({show,setModal,OrderToEdit}) => {
    const [checkout, setcheckout] = useState(0);
    const [menu, setMenu] = useState([]);
    const [showw, setShoww] = useState(false);
  const [updated, setUpdated] = useState(false);
useEffect(()=>{
    console.log(OrderToEdit)
    if(OrderToEdit){
 
        const newItems=[...OrderToEdit?.items]
    console.log(newItems)
    setMenu(newItems)
    }
},[OrderToEdit])
    return ( 
        <Modal show={show} onHide={()=>setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>تعديل الطلب</Modal.Title>
            </Modal.Header>
            <Modal.Body>
   
            <OrderCheckOut
              checkout={checkout}
              menu={menu}
              setMenu={setMenu}
              setShow={setShoww}
              updated={updated}
              setcheckout={setcheckout}
              setUpdated={setUpdated}
            />
         
            </Modal.Body>
        </Modal>
     );
}
 
export default EditOrder;