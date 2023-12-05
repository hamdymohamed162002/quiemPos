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
import ClientModal from "../components/addClientModal";
import Lottie from "react-lottie";
import FilterListIcon from '@mui/icons-material/FilterList';
import animaion from "../assets/falied.json";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion"
import { Modal, Button, Form } from "react-bootstrap"; // assuming you are using Bootstrap
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import TimeCounter from "../components/TimeCounter.jsx";
import KitchenCard from "../components/KitchenCard.jsx";
import KitchenCheckout from "../components/KitchenCheckout.jsx";
import {Dropdown } from "rsuite"
const Kitchen = () => {
  const [updated, setUpdated] = useState(false);
  const [showfirstModal, setShowFirst] = useState(false);
  const [firstTime, setFirstTime] = useState(true); // or false
  const [postSessionLoading, setPostSessionLoading] = useState(false); // or false
  const [sessionData, setSessionData] = useState(); // or false
  const [sessionDrawer, setSessionDrawer] = useState();
  const [acitve, setactive] = useState(0);
  const [checkout, setcheckout] = useState(0);
  function changeActive(index, disabled) {
    if (!disabled) {
      setactive(index);
    }
  }

  function handelfirstModalClose(temp) {
    if (sessionDrawer || temp) {
      setShowFirst(false);
    }
  }
  const validationSchema = Yup.object({
    number: Yup.string()
      .required("الرجاء إدخال المبلغ")
      .matches(/^\d+$/, "يجب أن يكون الرقم صحيحًا"),
  });

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      setSessionDrawer(values.number);
      setPostSessionLoading(true);
      axios
        .post("/session", { drawer: values.number })
        .then((res) => {
          console.log(res);
          setPostSessionLoading(false);
        })
        .catch((err) => {});
      // Close the modal
      handelfirstModalClose(values.number);
    },
  });

  const [menu, setMenu] = useState([]);
  function addtoMenu(img, text, price, extra, count, id) {
    let flag = true;
    let TempIndex;
    let newMenu = [...menu];
    const tempExtra = extra
      .filter((item) => item.count > 0)
      .map((item) => ({
        title: item.title,
        price: item.price,
        qty: item.count,
        id: item.id,
      }));
    menu.forEach((item, index) => {
      if (item.text == text) {
        flag = false;

        const newItem = [...menu];
        console.log(newItem[index], count);
        newItem[index] = {
          ...newItem[index],
          qty: newItem[index].qty + count,
          extra: [...tempExtra],
        };
        setMenu([...newItem]);
      }
    });

    if (flag) {
      setMenu([
        ...menu,
        { img, text, price, qty: count, extra: tempExtra, id: id },
      ]);
      let extraPrice = 0;
      tempExtra.forEach((item) => {
        extraPrice = extraPrice + item.price * item.count;
      });
    }
  }

  //scroll functions

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const startX = useRef(0);
  const containerRef = useRef(null);

  const [show, setShow] = useState(false);

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
  const [products, setproducts] = useState();
  const [productError, setproductError] = useState();
  //cateogry states
  const [categories, setCategories] = useState();
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  //session states
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    console.log(categories, products);
    axios
      .get("/categories")
      .then((req) => {
        setCategoriesLoading(false);
        const sortedData = req.data.data.sort(
          (a, b) => b.products_count - a.products_count
        );

        setCategories(sortedData);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    if (categories) {
      axios.get(`/category/${categories[0].id}`).then((req) => {
        setproducts(req.data.data.product);
      });
    }
  }, [categories]);
  useEffect(() => {
    if (firstTime) {
      axios
        .get("/session")
        .then((res) => {
          setSessionData(res.data);
          setSessionLoading(false);
          if (!Cookies.get("start")) {
            Cookies.set("start", moment().format("HH:mm:SS L"));
          }
        })
        .catch((err) => {
          setShowFirst(true);
          setFirstTime(false);
        });
    } else {
      if (!postSessionLoading) {
        axios
          .get("/session")
          .then((res) => {
            setSessionData(res.data);
            setSessionLoading(false);
            if (!Cookies.get("start")) {
              Cookies.set("start", moment().format("HH:mm:SS L"));
            }
          })
          .catch((err) => {});
      }
    }
  }, [sessionDrawer, firstTime, postSessionLoading]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animaion,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid ",
    },
  };

  return (
    <>
      {" "}
      <div
        style={{ background: "#F8F9FD", padding: "30px", minHeight: "100vh" }}
      >
  
        <div className="row mt-1">
          <div className="col-lg-9 col-md-12 mt-3">
            <div className="searchBar">
              <input placeholder="بحث ..." />

              <div className="searchIcon"></div>
            </div>
            <div className="row mt-3">
                <div className="forDesktop row p-0">
                    <div className="col-lg-4"> 
                    <div className="SelectCardStatus" style={{borderColor:'#1F81E2' ,color:'#1F81E2'}}>
                    طلبات جديدة
                    <div className="badge" style={{backgroundColor:'#1F81E2'}}>
                        7
                    </div>
                        </div> 
                        </div>
                    <div className="col-lg-4"> 
                    <div className="SelectCardStatus" style={{borderColor:'#E28D1F' ,color:'#E28D1F'}}>
                    جاري الطبخ
                    <div className="badge" style={{backgroundColor:'#E28D1F'}}>
                        7
                    </div>
                        </div> 
                      </div>

                    <div className="col-lg-4">
                    <div className="SelectCardStatus" style={{borderColor:'#29B84A' ,color:'#29B84A'}}>
                    تم التسليم
                    <div className="badge" style={{backgroundColor:'#29B84A'}}>
                        7
                    </div>
                        </div>   </div>

                </div>
            <div className="d-flex">
            <div className="forMobile">
            <Dropdown title="تصفية" icon={<FilterListIcon />}>
    <Dropdown.Item>          طلبات جديدة</Dropdown.Item>
    <Dropdown.Item>  جاري الطبخ</Dropdown.Item>
    <Dropdown.Item>     تم التسليم</Dropdown.Item>

  </Dropdown>
                </div>
            </div>
            </div>
<div className="row mt-2">
    <div className="col-lg-4">
<KitchenCard/>
<KitchenCard/>
<KitchenCard/>
    </div>
    <div className="col-lg-4">
<KitchenCard/>
<KitchenCard/>

    </div>
    <div className="col-lg-4">
<KitchenCard ended/>
    </div>
</div>
           
            
          </div>
          <div className="col-lg-3 col-md-12 mt-3">
            <KitchenCheckout
        
            />
          </div>
        </div>
      </div>
      <ClientModal show={show} setShow={setShow} setUpdated={setUpdated} />
      <Modal show={showfirstModal} onHide={handelfirstModalClose}>
        <Modal.Header closeButton>
          <Modal.Title> المبلغ الحالي</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formNumber">
              <Form.Label>الرقم</Form.Label>
              <Form.Control
                type="text"
                placeholder="ادخل المبلغ"
                name="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
                isInvalid={formik.touched.number && formik.errors.number}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.number}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              ادخال
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Kitchen;
