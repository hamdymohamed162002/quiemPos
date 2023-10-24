const Tab = ( {active,text,index,click}) => {
 
    return (  <li className="nav-item" role="presentation">
                            <button  onClick={()=>click(index)} className={`nav-link ${active?'active':''}`} >{text}</button>
                        </li>
                  );
}
 
export default Tab;