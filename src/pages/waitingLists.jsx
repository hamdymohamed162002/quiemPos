import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import image from "../assets/shahi.png";
import Clock from "../components/clock";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CountdownTimer from "../components/CountDownCLock";
import Perpare from "../components/OrderPrepaer";
import WaitingListBg from "../assets/WaitingListBg.png";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const WaittingList = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(params);
    axios
      .get(`https://bigerp.nour-projects.com/wakein/waiting/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="loader2"></span>
        </div>
      ) : data?.type === 1 ? (
        <div className="WaitingListContainer2">
          <div className="container">
            <div className="CurrentResturant">
              <div className="ResturantInfo d-flex">
                <img src={image} />
                <div className="d-flex flex-column  justify-content-center">
                  <h4> {data?.branch?.title} </h4>

                  <p>
                    {" "}
                    <FmdGoodOutlinedIcon /> {data?.branch?.address}
                  </p>
                </div>
              </div>
              <div className="CurrentTime2">
                <AccessTimeOutlinedIcon
                  sx={{ width: "50px", height: "50px" }}
                />
                <Clock />
              </div>
            </div>

            <div className="row text-center" style={{ color: "white" }}>
              <div className=" col-lg-3 ">
                <h2>الطلبات الجاهزة </h2>
                <h2> Ready Orders</h2>
                <div className="d-flex gap-2 mt-3">
                  <div
                    style={{
                      backgroundColor: "#FA4517",
                      color: "white",
                      width: "50%",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    رقم <br />
                    الطلب
                  </div>
                  <div
                    style={{
                      backgroundColor: "#FA4517",
                      color: "white",
                      width: "50%",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    الزمن
                    <br />
                    حتـــي الآن
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <div className={"PreperOrder2"}>T270</div>
                  <div className={"theCLockContainer2"}>02:58</div>
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center justify-content-center">
                <div className="CurrentOrder CureentTask">
                  <div>
                    <h2>T231</h2>
                    <p>في الخدمة الان</p>
                  </div>
                </div>
              </div>

              <div className=" col-lg-3 ">
                <h2>قيد التجهيز</h2>
                <h2>In Progress</h2>
                <div className="d-flex gap-2 mt-3">
                  <div
                    style={{
                      backgroundColor: "#FA4517",
                      color: "white",
                      width: "50%",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    رقم <br />
                    الطلب
                  </div>
                  <div
                    style={{
                      backgroundColor: "#FA4517",
                      color: "white",
                      width: "50%",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    الزمن
                    <br />
                    حتـــي الآن
                  </div>
                </div>
                <Perpare second2 />
                <Perpare second2 />

                <Perpare second2 />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="WaitingListContainer">
          <div className="container">
            <div className="CurrentResturant">
              <div className="ResturantInfo d-flex">
                <img src={image} />
                <div className="d-flex flex-column  justify-content-center">
                  <h4> {data?.branch?.title} </h4>
                  <p>
                    {" "}
                    <FmdGoodOutlinedIcon /> {data?.branch?.address}
                  </p>
                </div>
              </div>
              <div className="CurrentTime">
                <AccessTimeOutlinedIcon
                  sx={{ width: "50px", height: "50px" }}
                />
                <Clock />
              </div>
            </div>

            <div className="row text-center" style={{ color: "white" }}>
              <div className=" col-lg-7 row">
                <div className=" col-lg-6 ">
                  <h2> الطلبات الجاهزة</h2>
                </div>
                <div className=" col-lg-6 ">
                  <h2>قيد التجهيز</h2>
                  <Perpare />
                  <Perpare />

                  <Perpare />
                </div>
              </div>
              <div className="col-lg-5 d-flex align-items-center">
                <div className="CurrentOrder">
                  <div>
                    <h2>T231</h2>
                    <p>في الخدمة الان</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*  */}
    </>
  );
};

export default WaittingList;
