import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

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

    return (    
        <div style={pageDivStyle}>
            <div style={navDivStyle}>
                <Navigation /> 
            </div>
            <div style={contentDivStyle}>
                <Outlet />
            </div>
        </div>
    )
};

export default Layout; 