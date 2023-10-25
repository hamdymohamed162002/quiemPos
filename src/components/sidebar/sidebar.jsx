import classes from "./sidebar.module.scss";


import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";

import AddIcon from "@mui/icons-material/Add";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import logo from '../../assets/logo.png'
import { useEffect, useRef, useState } from "react";
import Collection from "./Collection/collection";
import { Link } from "react-router-dom";

const SideBar = ({ flag=false, setflag, mobile }) => {
  const ref = useRef();
  const parent = useRef();

  // .body had collection which is like cateogery and has its own list (subicon ) which contain route to another pages
  return (
    <div
      className={
        flag ? [classes.active, classes.sideBar].join(" ") : classes.sideBar
      }
      style={{minHeight:'100vh'}}
    >
     <div className={classes.sidebarHeader}>
      <img src={logo}/>
     
      </div>
      <div className={classes.body}>
      

        <div className={classes.mainIcon} ref={parent}>
          <Link to={"/"}>
            <div>
              <HomeIcon
                sx={{ color: "black", width: "35px", height: "35px" }}
              />
              <span>sadsad</span>
            </div>
          </Link>
        </div>

        <Collection
          mainIcon={
            <AccountBalanceIcon
              sx={{
                color: "black",
                width: "35px",
                height: "35px",
                display: "flex",
                justfiyContent: "center",
              }}
            />
          }
          acitve={flag}
          mainTitle={"asd"}
        >
          <Link to={"/"}>
            <div
              className={classes.subIcon}
              onClick={(e) => {
           
              }}
            >
              <div>
                <FeaturedPlayListIcon
                  sx={{ color: "black", width: "24px", height: "24px" }}
                />
              </div>
              <span>ss</span>
            </div>
          </Link>
          <Link to={"/"}>
            <div
              className={classes.subIcon}
              onClick={(e) => {
                // mobile ? setShow(false) : null;
              }}
            >
              <div>
                <AddIcon
                  sx={{ color: "black", width: "24px", height: "24px" }}
                />
              </div>
              <span> a</span>
            </div>
          </Link>
        </Collection>
        <Collection
          mainIcon={
            <AccountBalanceIcon
              sx={{
                color: "black",
                width: "35px",
                height: "35px",
                display: "flex",
                justfiyContent: "center",
              }}
            />
          }
          acitve={flag}
          mainTitle={"asd"}
        >
          <Link to={"/"}>
            <div
              className={classes.subIcon}
              onClick={(e) => {
           
              }}
            >
              <div>
                <FeaturedPlayListIcon
                  sx={{ color: "black", width: "24px", height: "24px" }}
                />
              </div>
              <span>ss</span>
            </div>
          </Link>
          <Link to={"/"}>
            <div
              className={classes.subIcon}
              onClick={(e) => {
                // mobile ? setShow(false) : null;
              }}
            >
              <div>
                <AddIcon
                  sx={{ color: "black", width: "24px", height: "24px" }}
                />
              </div>
              <span> a</span>
            </div>
          </Link>
        </Collection>
      </div>
    </div>
  );
};

export default SideBar;
