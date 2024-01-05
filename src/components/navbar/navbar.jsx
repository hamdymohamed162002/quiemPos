import classes from "./navbar.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "react-bootstrap/Button";
import SegmentIcon from "@mui/icons-material/Segment";
import logoutt from "../../assets/logout-outline.png";
import { useEffect, useRef, useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import shop from "../../assets/shop-outline.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import axios from "../../axios";
import { useNavigate } from "react-router";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "react-bootstrap";
import PrintButton from "../PrintButton";
import { useReactToPrint } from "react-to-print";
import Receipt from "../Receipt";
import OrderModal from "./orderModal";
import Lottie from "react-lottie";
import animaion from "../../assets/done.json";

import edit from "../../assets/edit-2.png";
import { motion, AnimatePresence } from "framer-motion";
import EditOrder from "./EditOrder";
const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const type = useSelector((state) => state.auth.type);
  const router = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [orderToPrint, setOrderToPrint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [showSuccesModal, setShowSuccesModal] = useState(false);
const [OrderToEdit,setOrderToEdit]=useState(null)

  const [showEditModal, setShowEditModal] = useState(false);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animaion,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid ",
    },
  };
  function handleLogOut() {
    if (type === "pos") {
      axios.post("/pos/endsession").then((res) => {
        dispatch(logout());
        router("/login");
      });
    } else {
      dispatch(logout());
      router("/login");
    }
  }
  function submit() {
    axios
      .post("/pos/returnorder", {
        order_id: selectId,
        reason: notes,
      })
      .then((res) => {
        setShowModal(false);
      });
  }
  useEffect(() => {
    axios
      .get("/pos/orders")
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {});
  }, [showDropDown]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintBtn = (order) => {
    setOrderToPrint(order);
  };
  useEffect(() => {
    if (orderToPrint) {
      handlePrint();
    }
  }, [orderToPrint]);
  return (
    <div className={classes.navbar}>
      <div style={{ display: "flex", gap: "10px", position: "relative" }}>
        <SegmentIcon
          sx={{ width: "30px", height: "30px", color: "black" }}
          className="responsiveNav"
        />
        <div
          className={classes.logOut}
          style={{ cursor: "pointer" }}
          onClick={handleLogOut}
        >
          <img src={logoutt} />
          إنهاء الجلسة
        </div>
      </div>
      <div className={classes.Title}>
        <div
          className={classes.posPoint}
          style={{ gap: "5px" }}
          onClick={() => {
            dispatch(logout());
            router("/login");
          }}
        >
          <PauseOutlinedIcon />
          ايقاف مؤقت
        </div>
        <div
          className={classes.posPoint}
          style={{
            gap: "5px",
            background:
              "  linear-gradient(135deg, rgb(121, 241, 164) 10%, rgb(14, 92, 173) 100%)",
          }}
          onClick={() => {
            setShowDropDown(true);
          }}
        >
          <Inventory2OutlinedIcon />
          <span> الطلبات </span>
        </div>
      </div>

      <OrderModal
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
        orders={orders}
        setOrders={setOrders}
        handlePrintBtn={handlePrintBtn}
        orderToPrint={orderToPrint}
        setSelectId={setSelectId}
        setShowModal={setShowModal}
        componentRef={componentRef}
        setShowEditModal={setShowEditModal}
        setOrderToEdit={setOrderToEdit}
      />
      <Modal size="md" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>استرجاع الطلب</Modal.Header>
        <Modal.Body>
          <div
            className="container mt-3 p-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="d-flex justify-content-between">
              <span> لماذا تريد استرجاع الطلب ؟</span>
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
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            paddingBlock: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="d-flex justify-content-between modalBtn p-3"
            style={{
              transform: "translateX(0%) !important",
              maxWidth: "100% !important",

              background:
                "linear-gradient(111.4deg, rgb(246, 4, 26) 0.4%, rgb(251, 139, 34) 100.2%)",
            }}
            onClick={() => submit()}
          >
            <span>استرجاع </span>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccesModal} onHide={() => setShowSuccesModal(false)}>
        <Modal.Body>
          <div>
            <Lottie
              key={Math.random()}
              options={defaultOptions}
              height={200}
              width={200}
            />

            <motion.div
              style={{
                textAlign: "center",
                fontSize: "28px",
                color: "#55BF40",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              تم استرجاع الطلب
            </motion.div>
          </div>
        </Modal.Body>
      </Modal>
     
    </div>
  );
};
export default NavBar;
