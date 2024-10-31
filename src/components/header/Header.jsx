// import { blue } from "@mui/material/colors";

const Header = () => {
    const headerStyle = {
        color: "blue",
        fontSize: "24px",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        paddingBottom: "15px"
    };

    return (
        <h1 style={headerStyle}>Wayback Pubic Library</h1>
    )
};

export default Header; 