const Header = () => {
    const headerStyle = {
        color: "white",
        fontSize: "24px",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        backgroundColor: "#3f51b5",
        padding: "15px 0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "100%",
       // position: "fixed",
        top: 0,
        zIndex: 1000
    };

    return <h1 style={headerStyle}>Wayback Public Library</h1>;
};

export default Header;
