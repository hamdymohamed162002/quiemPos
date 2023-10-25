import AddIcon from '@mui/icons-material/Add';
const FoodCard = ( {img,addtoMenu,text,price}) => {
    return ( 
        <div className="foodCard">
            <img src={img}/>
            <div>
                <h3 className='mt-2'>{text}</h3>
                <div className="d-flex justify-content-between align-items-center">
                    <div onClick={()=> addtoMenu(img,text,price)} className="add-icon"> <AddIcon  sx={{color:'white',width:'26px',height:'26px'}}/></div>
                    <div> {price} ر.س</div>
                </div>
            </div>
        </div>
     );
}
 
export default FoodCard;