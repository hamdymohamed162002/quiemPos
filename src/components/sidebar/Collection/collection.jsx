import { useEffect, useRef, useState } from "react";
import classes from "./collection.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Collection = ({ mainIcon, mainTitle, children, acitve }) => {
  const x = useRef();
  const [Height, setHeight] = useState(false);
  //collection is used in sidebar and get childern (subicon ) from it
  return (
    <>
    <div className={classes.mainIcon}>
            <div>
             {mainIcon}
            <span style={acitve?{display:'none'}:null} >{mainTitle}</span>
            </div>
            <div className={classes.arrow}  ref={x} style={acitve?{display:'none'}:null} onClick={(e)=>{setHeight(!Height)
         
         
            }}>
            <KeyboardArrowDownIcon sx={{ color: 'black' ,cursor:'pointer' }}  />
            </div>
        </div>
        <div className={classes.smallCollection} style={Height?{maxHeight:'200px',  marginBottom: '10px'}:null}>
       {children}
          
        </div>
    
    </>
  );
};

export default Collection;
// style={Height?{maxHeight:'200px',  marginBottom: '10px'}:null}
