import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Checkout from "../checkout/Checkout";

const Layout = () => {

    const pageDivStyle = {
        display: "flex",
        height: "100vh"
    
    }

    const navDivStyle = {
        flex: "1.8",
        boxShadow: "0 0 0 2px rgba(160, 160, 160, 0.5)",
        minHeight: "100vh"
    }

    const contentDivStyle = {
        flex: "10.2",
        minHeight: "100vh"
    }
    const checkoutDivStyle = { // this will be removed after we figure out why the routing is not working
        width: "100px", 
        minHeight: "100vh",
        padding: "10px", 
        backgroundColor: "#f9f9f9", 
        boxShadow: "0 0 0 2px rgba(160, 160, 160, 0.5)", 
        flex:"500",
        
    }

    return (    
        <div style={pageDivStyle}>
            <div style={navDivStyle}>
                <Navigation /> 
            </div>
            <div style={contentDivStyle}>
                <Outlet />
            </div>
            <div style = {checkoutDivStyle}>  {/* Remoove this div after we figure out the routing problem */}
                <Checkout />
            </div>
        </div>
    )
};

export default Layout; 