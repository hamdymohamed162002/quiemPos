import packge from '../assets/package.png'
import shop from '../assets/shop-outline.png'
const KitchenCard = ({ended}) => {
    return ( 
        <div className='KitchenCard mt-2'>
            <div className='KitchenCardHeader'>
<div className='KitchenCardHeaderImage d-flex'>
    <img src={packge}/>
    <div>
        <h4>إبراهيم خالد الزيني</h4>
        <p>رقم الطلب #3620</p>
    </div>
</div>
<div className='icon'>
    <img src={shop} />
    في المطعم
</div>
            </div>
            <div className='KitchenCardBody'>
                <div className='d-flex justify-content-between'>
                    <span>رقم الطاولة</span>
                    <span>3 </span>

                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <span> برامج التوصيل</span>
                    <span>3 </span>

                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <span>عدد الوجبات </span>
                    <span>3 </span>

                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <span>التكلفة </span>
                    <span>42 ر.س </span>

                </div>
                <div className={`${ended ?"SubmitBtn ended" :'SubmitBtn'}`}>

               {
                ended? "منتهي" :' بدأ الطبخ'
               }
                </div>
            </div>

        </div>
     );
}
 
export default KitchenCard;