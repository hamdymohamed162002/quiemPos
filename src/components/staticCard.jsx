
const StaticCard = ({text,title,img,active,forCate}) => {
    return (
        <div className={forCate  ? active? "staticCard formobile active ":"staticCard formobile ":"staticCard"}> 
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