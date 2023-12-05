import NavBar from "../components/navbar/navbar";

const LayOut = ({children}) => {
    return (  
        <div>
        <div
          style={{
            display: "",
            justifyContent: "space-between",
            backgroundColor: "#ECF0EE",
          }}
          className="resposive-container"
        >
          <div className="responsive-sideBar"></div>

          <div className="main-page" style={{ minHeight: "100vh" }}>
            <NavBar />
{children}
          </div>
        </div>
      </div>
    );
}
 
export default LayOut;