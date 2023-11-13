import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CountdownTimer from './CountDownCLock';
const Perpare = () => {
    const handleTimeout = () => {
        console.log('Timer expired!');
        // You can add any logic to handle the timeout event
      };
    return ( 
        <div className='d-flex gap-2 mt-3'>
<div className='PreperOrder'>
    <TimerOutlinedIcon />
    T270
</div>
<div className='theCLockContainer'>
<CountdownTimer minutes="5" seconds="0" onTimeout={handleTimeout} />
</div>

        </div>
     );
}
 
export default Perpare;