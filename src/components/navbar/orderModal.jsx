import Receipt from "../Receipt";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { Modal } from "react-bootstrap";
const OrderModal = ({
    showDropDown,
    setShowDropDown,
    orders,
    handlePrintBtn,
    orderToPrint,
    componentRef,
}) => {
    return (   <Modal
        size="md"
        show={showDropDown}
        onHide={() => setShowDropDown(false)}
      >
        <Modal.Header closeButton>الطلبات</Modal.Header>
        <Modal.Body>
          {orders?.map((item, index) => {
            return (
              <div key={index + item?.id} className="PastOrder">
                <div className="d-flex align-items-center gap-2">
                  <div className="OrderNumber">#{item?.id}</div>
                  <div>
                    <h2>{item?.customer?.name}</h2>
                    <span>{item?.created_at}</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <div className="EditICon">
                    <BorderColorOutlinedIcon />
                  </div>
                  <div className="CloseIcon">
                    <CloseIcon />
                  </div>
                  <div className="PrintIcon" onClick={()=>handlePrintBtn(item)}>
                    <LocalPrintshopOutlinedIcon />
                  </div>
                </div>
              </div>
            );
          })}
          {orderToPrint && (
            <Receipt
              key={orderToPrint.id}
              order={orderToPrint}
              ref={componentRef}
            />
          )}
        </Modal.Body>
      </Modal> );
}
 
export default OrderModal;