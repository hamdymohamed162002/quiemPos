import { Skeleton } from "@mui/material";

 import axios from '../axios.js'
const StaticCard = ({text,title,img,active,forCate,index,changeActive,loading,setproducts,id,setproductError,disabled}) => {
    
    
    function ClickHandler(){
        changeActive(index, disabled)
      if(!disabled)
      {
        axios.get(`/pos/category/${id}`)
        .then(res=>{
        
        
        
            if(res.data.data.product.length==0)
            {
                setproductError("noProducts")
            }
            else if(res.data.data.product.length>0){
      
                setproducts(res.data.data.product)
                setproductError(null)

            }
        })
        .catch((err,req)=>{
console.log( err.response.status)
            setproducts([])
         
           
        })
      }
    }
    return (
        <div onClick={ClickHandler} className={forCate  ? active==index? "staticCard formobile active ":"staticCard formobile ":"staticCard"} style={disabled?{backgroundColor:"rgba(106,110, 131 , 46%)", cursor
        :'not-allowed'}:null}> 
<img src={img} />
<div>
    <h2 style={disabled?{color:'#6A6E83'}:null}> {title}</h2>
 {loading? <Skeleton variant="text" width={100} height={20} /> : <p>{text}</p>}

</div>
        </div>
      );
}
 
export default StaticCard;