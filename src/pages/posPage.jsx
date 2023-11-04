import StaticCard from "../components/staticCard";
import comp from "../assets/comp.png";
import box from "../assets/box.png";
import cash from "../assets/cash.png";
import share from "../assets/share.png";
import first from "../assets/pngwing.com.png";
import seoncd from "../assets/2.png";
import third from "../assets/3.png";
import fourth from "../assets/4.png";
import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import OrderCheckOut from "../components/orderCheckout";

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
    console.log(menu)
  }
  useEffect(() => {
    console.log(menu);
  }, [menu]);
  return (
    <div style={{ background: "#F8F9FD", padding: "30px", minHeight: "100vh" }}>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard

            img={comp}
            text={"2023-09-13 05:51:26"}
            title={"بدايه الجلسه"}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard img={box} text={"13"} title={" عدد الطلبات"} />
        </div>
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard img={cash} text={"13"} title={" اجمالي الكاش     "} />
        </div>
        <div className="col-lg-3 col-md-6 col-12 mt-2">
          <StaticCard img={share} text={"13"} title={"  اجمالي الشبكه"} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 col-md-12 mt-3">
          <div className="searchBar">
            <input placeholder="بحث ..." />
       
            <div className="searchIcon"></div>
          </div>

          <div className=" overscrollMobile mt-3">
            <div className="d-flex gap-5 mobileScroller">
              <StaticCard
              changeActive={changeActive}
active={acitve}

                index={0}
                title={"مشويات"}
                text={"8 وجبة"}
                forCate
                img={first}
              />
              <StaticCard
              changeActive={changeActive}
active={acitve}

               index={1}
                title={"فرايد تشيكن"}
                text={"8 وجبة"}
                forCate
                img={seoncd}
              />

              <StaticCard
              changeActive={changeActive}
              active={acitve}

                index={2}
                title={"برجر"}
                text={"8 وجبة"}
                forCate
                img={third}
              />
              <StaticCard
              changeActive={changeActive}
              active={acitve}

                index={3}
                title={"مشروبات"}
                text={"8 وجبة"}
                forCate
                img={fourth}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-3 col-md-12 mt-3">
              <FoodCard addtoMenu={addtoMenu} img={food1} text={"شاورما لحم"} price={6} />
            </div>
            <div className="col-lg-3 col-md-12 mt-3">
              <FoodCard addtoMenu={addtoMenu} img={food2} text={"شاورما فراخ"} price={12} />
            </div>
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
