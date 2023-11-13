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
import axios from '../../axios'
import { useNavigate } from "react-router";
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
        <div className={classes.logOut} onClick={()=>
        {
          dispatch(logout())
          router('/login')
        }} >
       
           تسجيل خروج
        </div>
      
      </div>
    </div>
  );
};
export default NavBar;
