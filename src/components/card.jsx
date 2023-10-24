import { useNavigate } from 'react-router';
import image from'../assets/burger.png'
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import { useState } from 'react';
const ProductCard = ({text,price,img,cart,num}) => {
  const [count, setcount] = useState(1);


    const router=useNavigate()
    return ( 

        <div className={`${num?'':'col-lg-6'} col-md-12`}>
        <div className="product-food-card  " onClick={()=>{if(!cart && !num){
            router('/order')
        }}}>
            <div className="food-image ">
                <img src={image}/>
            </div>
            <div className="food-text ">
                <h2>كلاسيك  </h2>
                <p className="mb-0">قطعة برجر لحم بقري مشوي ، خس ، مخلل ومايونيز
تقدم مع البطاطس المقلية </p>
              
               <div className="d-flex food-card-actions justify-content-between">
                    <a className="" style={{color:'black'}}> 995 ر.س</a>
       {cart &&   <div className="d-flex addMinus">
                <span
                  onClick={() => {
                    if (count > 0) {
                      setcount(count - 1);
                      settotalPrice(totalPrice - price);
                    }
                  }}
                >
                  <img src={minus} />
                </span>
                <span>{count}</span>

                <span
                  onClick={() => {
                    setcount(count + 1);
                    settotalPrice(totalPrice + price);
                  }}
                >
                  <img src={plus} />
                </span>
              </div> }
              {
                num && <div>x {num} </div>
              }
                </div>
                
            </div>
          
        </div>

    </div>
     );
}
 
export default ProductCard;