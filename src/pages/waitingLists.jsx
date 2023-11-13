import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import image from '../assets/shahi.png'
import Clock from "../components/clock";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CountdownTimer from "../components/CountDownCLock";
import Perpare from "../components/OrderPrepaer";
const WaittingList = () => {

    
  return (
    <div className="WaitingListContainer">
      <div className="container">
        <div className="CurrentResturant">
          <div className="ResturantInfo d-flex">

            <img src={image}/>
            <div className="d-flex flex-column  justify-content-center">
                <h4>
                مطعم شهية - فرع الرياض
                </h4>
                <p> <FmdGoodOutlinedIcon/> شارع الأمير سلطان بن سلمان بن عبدالعزيز، 7579، الرحمانية، الرياض </p>
            </div>
          </div>
          <div className="CurrentTime">
<AccessTimeOutlinedIcon sx={{width:'50px',height:'50px'}}/>
            <Clock />
          </div>
        </div>

        <div className="row text-center" style={{color:'white'}}>
            <div className=" col-lg-7 row">
            <div className=" col-lg-6 ">
          <h2>  الطلبات الجاهزة</h2>
</div>
<div className=" col-lg-6 ">
<h2>قيد التجهيز</h2>
<Perpare />
<Perpare />

<Perpare />


</div>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
<div className="CurrentOrder"> 
<div>
<h2>T231</h2>
<p>في الخدمة الان</p></div></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WaittingList;
