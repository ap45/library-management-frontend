import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

const Layout = () => {

    const pageDivStyle = {
        display: "flex",
        height: "100vh"
    }

    const navDivStyle = {
        position: "fixed",
        left: "0",
        boxShadow: "0 0 0 2px rgba(160, 160, 160, 0.5)",
        minHeight: "100vh",
        zIndex: "1",
        backgroundColor: "white",
    }

    const contentDivStyle = {
        flex: "1",
        minHeight: "100vh",
        position: "relative",
        left: "200px", /* Matches sidebar width */
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
