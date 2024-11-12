// import { blue } from "@mui/material/colors";


const Header = () => {
    const headerStyle = {
        color: "blue",
        fontSize: "24px",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        paddingBottom: "15px",
        position: "sticky",
        top: "0",
        left: "50%",
        width: "100vw",
        height: "35px",
        zIndex: "2",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <h1 style={headerStyle}>Wayback Pubic Library</h1>
    )
};

export default Header; 