import StaticCard from "../components/staticCard";
import comp from "../assets/comp.png";
import box from "../assets/box.png";
import cash from "../assets/cash.png";
import share from "../assets/share.png";
import first from "../assets/pngwing.com.png";
import seoncd from "../assets/2.png";
import third from "../assets/3.png";
import fourth from "../assets/4.png";
import { useEffect, useRef, useState } from "react";
import FoodCard from "../components/FoodCard";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import OrderCheckOut from "../components/orderCheckout";
import axios from "./../axios.js";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
const PosPage = () => {
  const [acitve, setactive] = useState(0);
  function changeActive(index) {
    setactive(index);
  }
  const [menu, setMenu] = useState([]);
  function addtoMenu(img, text, price) {
    let flag = true;
    let newMenu = [...menu];

    menu.forEach((item, index) => {
      if (item.text == text) {
        flag = false;
        newMenu[index].count++;
        setMenu(newMenu);
      }
    });

    if (flag) {
      setMenu([...menu, { img, text, price, count: 1 }]);
    }
    console.log(menu);
  }

  //scroll functions 

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const startX = useRef(0);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsScrolling(true);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (isScrolling) {
      const dx = e.clientX - startX.current;
      const newScrollX = scrollX - dx;

      containerRef.current.scrollLeft = newScrollX;
      setScrollX(newScrollX);
      startX.current = e.clientX;
    }
  };
  const [products,setproducts]=useState();
  const [productError,setproductError]=useState()
  //cateogry states
  const [categories, setCategories] = useState();
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  //session states
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    console.log(categories,products)
    axios
      .get("/categories")
      .then((req) => {
        setCategoriesLoading(false);
        setCategories(req.data.data);
      })
      .catch((err) => {
        toast.error("حدث خطأ ما");
      });



  }, []);
  useEffect(() => {

 if(categories)
 {
  axios.get(`/category/${categories[0].id}`).then((req)=>{
setproducts(req.data.data.product)
  })
 }
  },[categories])

  return (
    <div style={{ background: "#F8F9FD", padding: "30px", minHeight: "100vh" }}>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard
            loading={sessionLoading}
            img={comp}
            text={"2023-09-13 05:51:26"}
            title={"بدايه الجلسه"}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard
            img={box}
            text={"13"}
            title={" عدد الطلبات"}
            loading={sessionLoading}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard
            img={cash}
            text={"13"}
            title={" اجمالي الكاش     "}
            loading={sessionLoading}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard
            img={share}
            text={"13"}
            title={"  اجمالي الشبكه"}
            loading={sessionLoading}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 col-md-12 mt-3">
          <div className="searchBar">
            <input placeholder="بحث ..." />

            <div className="searchIcon"></div>
          </div>

          <div className=" overscrollMobile mt-3"  
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "100%"
      }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
            <div className="d-flex gap-5 mobileScroller">
              { categories&&!categoriesLoading&&categories.map((cate, index) => (
                <StaticCard
                  changeActive={changeActive}
                  active={acitve}
                  loading={categoriesLoading}
                  index={index}
                  title={cate.title}
                  text={`وجبة ${cate.products_count}`}
                  forCate
                  img={cate.image}
                  id={cate.id}
                  setproducts={setproducts}
                  setproductError={setproductError}
                />
              ))}
              {
                categoriesLoading && <>
               { [0,1,2,3].map(()=>                 <div  className={"staticCard formobile "}> 
                  <Skeleton  variant="rectangular" width={50} height={50} />
<div>
<Skeleton variant="text" width={30} height={20} />
<Skeleton variant="text" width={100} height={20} /> 

</div>
        </div>)}
 </>
              }
            </div>
          </div>
          <div className="row mt-3">
         {
          products && !productError &&
          products?.map((item,index)=>{
            return    <div className="col-lg-3 col-md-12 mt-3">
            <FoodCard
              addtoMenu={addtoMenu}
              img={item.image}
              text={item.title}
              price={item.price}
              
            />
          </div>
         })}
         {
          productError&& <h3 style={{color:'red'}}>{productError}</h3>
         }
        
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mt-3">
          <OrderCheckOut menu={menu} setMenu={setMenu} />
        </div>
      </div>
    </div>
  );
};

export default PosPage;
