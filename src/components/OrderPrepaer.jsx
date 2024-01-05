import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CountdownTimer from "./CountDownCLock";
const Perpare = ({second2}) => {
  const handleTimeout = () => {
    console.log("Timer expired!");
    // You can add any logic to handle the timeout event
  };
  return (
    <div className="d-flex gap-2 mt-3">
      <div className= {`${second2?"PreperOrder2":"PreperOrder"}`}>
        <TimerOutlinedIcon  sx={second2 && {color:"black"}}/>
       
        T270
      </div>
      <div className={`${second2?"theCLockContainer2":"theCLockContainer"}`}>
        <CountdownTimer minutes="5" seconds="0" onTimeout={handleTimeout} />
      </div>
    </div>
  );
};

export default Perpare;
