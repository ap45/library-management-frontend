import { Link } from "react-router-dom";

const Navigation = () => {

    const NavbarStyle = {
        listStyleType: "none",
        padding: "10 5, 5, 10"     
    } 

    return (
        <ul style={NavbarStyle}>
            <li>
                <Link to="/">Dashboard</Link>
            </li>
            <li>
                <Link to="/add-item">AddItem</Link>
            </li>
            <li>
                <Link to="/patrons">Patrons</Link>
            </li>
            <li>
                <Link to="/add-patron">AddPatron</Link>
            </li>
            <li>
                <Link to="/manage-fines">ManageFines</Link>
            </li>
            <li>
                <Link to="/checkout">Checkout</Link>
            </li>
            <li>
                <Link to="/checkin">Checkin</Link>
            </li>
        </ul>
    )
};

export default Navigation; 