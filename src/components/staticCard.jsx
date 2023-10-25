
const StaticCard = ({text,title,img,active,forCate,index,changeActive}) => {
    
    console.log(active)
    return (
        <div onClick={()=>changeActive(index)} className={forCate  ? active==index? "staticCard formobile active ":"staticCard formobile ":"staticCard"}> 
<img src={img} />
<div>
    <h2> {title}</h2>
    <p>
 {text}
    </p>

</div>
        </div>
      );
}
 
export default StaticCard;