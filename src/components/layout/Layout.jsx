import Navigation from "../navigation/Navigation";

const Layout = () => {
    const navDivStyle = {
        boxShadow: "0 0 0 2px rgba(160, 160, 160, 0.5)"
    }

    return (    
        <div>
            <div style={navDivStyle}>
                <Navigation /> 
            </div>
            <div>Content</div>
        </div>
    )
};

export default Layout; 