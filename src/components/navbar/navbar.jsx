import classes from "./navbar.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "react-bootstrap/Button";
import SegmentIcon from "@mui/icons-material/Segment";
import logout from "../../assets/logout-outline.png";
import { useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import shop from "../../assets/shop-outline.png";

const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className={classes.navbar}>
      <div style={{ display: "flex", gap: "10px", position: "relative" }}>
        <SegmentIcon
          sx={{ width: "30px", height: "30px", color: "black" }}
          className="responsiveNav"
        />
        <div className={classes.logOut}>
          <img src={logout} />
          إنهاء الجلسة
        </div>
      </div>
      <div className={classes.Title}>
        <div className={classes.posPoint}>
          <img src={shop} />
          نقطة البيع
        </div>
        <div className={classes.icon}>
          <DarkModeOutlinedIcon
            sx={{ color: "#292D32", height: "36px", width: "36px" }}
          />
        </div>
        <div className={classes.icon}>
          <NotificationsNoneOutlinedIcon
            sx={{ color: "#292D32", height: "36px", width: "36px" }}
          />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
