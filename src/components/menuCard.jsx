import DeleteIcon from '@mui/icons-material/Delete';
const MenuCard = ({img,text,price,count,index,delte}) => {
    return ( 
        <div className="d-flex justify-content-between align-items-center mt-2" style={{borderBottom:'1px solid #A8B1CE', paddingBottom:'5px'}}>
            <div className="d-flex gap-2 align-items-center">

                <img src={img} style={{width:'59px',height:'59px' ,borderRadius:'5px'}}/>
                <div className="d-flex flex-column  ">
                    <span style={{fontSize:'16px' ,fontWeight:'600'}}>
                        {text}
                    </span>
                    <span style={{fontSize:'14px'}}>
                        {price } ر.س
                    </span>
                    <span style={{fontSize:'14px'}}>
                    الكمية : {count}
                    </span>
                </div>
                
            </div>
            <div onClick={()=>delte(index)} style={{display:'flex',justifyContent:'center',alignItems:'center' ,backgroundColor:'#E91D1D',padding:'5px',borderRadius:'5px'}}>
<DeleteIcon sx={{color:'white'}}/>
            </div>
        </div>
     );
}
 
export default MenuCard;