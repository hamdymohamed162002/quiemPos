import classes from "./navbar.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "react-bootstrap/Button";
import SegmentIcon from "@mui/icons-material/Segment";
import logoutt from "../../assets/logout-outline.png";
import { useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import shop from "../../assets/shop-outline.png";
import { useDispatch  } from "react-redux";
import { logout } from "../../redux";
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import axios from '../../axios'
import { useNavigate } from "react-router";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "react-bootstrap";
const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useNavigate();
const dispatch=useDispatch()
function handleLogOut()
  {
    axios.post('/endsession').then((res)=>{
      dispatch(logout())
      router('/login')
    })

  }

  return (
    <div className={classes.navbar}>
      <div style={{ display: "flex", gap: "10px", position: "relative" }}>
        <SegmentIcon
          sx={{ width: "30px", height: "30px", color: "black" }}
          className="responsiveNav"
        />
        <div className={classes.logOut} style={{cursor:'pointer'}} onClick={handleLogOut}>
          <img src={logoutt} />
          إنهاء الجلسة
        </div>
      </div>
      <div className={classes.Title}>
        <div className={classes.posPoint} style={{gap:'5px'}} onClick={()=>
        {
          dispatch(logout())
          router('/login')
        }} >
      <PauseOutlinedIcon/>
           ايقاف مؤقت
        </div>
        <div className={classes.posPoint} style={{gap:'5px', background:'  linear-gradient(135deg, rgb(121, 241, 164) 10%, rgb(14, 92, 173) 100%)'}} onClick={()=>
        {
          setShowDropDown(true)
        }} >
       <Inventory2OutlinedIcon/>
        <span>  الطلبات </span>
        </div>
      </div>
      <Modal size="md" show={showDropDown} onHide={() => setShowDropDown(false)}>
        <Modal.Header closeButton>
          الطلبات
        </Modal.Header>
        <Modal.Body>
{[1,2,3,4,5,6].map((item,index)=>{
  return <div className="PastOrder">
  <div className="d-flex align-items-center gap-2">
    <div className="OrderNumber">
  #{item}
    </div>
    <div>
      <h2>
      احمد محمد
      </h2>
      <span>
      21:12:39   2023-12-07 
      </span>
    </div>
  
  </div>
  <div className="d-flex gap-2">
 
  <div className="EditICon">
  <BorderColorOutlinedIcon />
  </div>
  <div className="CloseIcon">
    <CloseIcon/>
    </div>
  <div className="PrintIcon">
  <LocalPrintshopOutlinedIcon />
  </div>
  
  </div>
  </div>
})}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default NavBar;
