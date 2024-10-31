import { NavLink } from "react-router-dom";

function sideNavbar() {
    return (
        <nav className="side-navbar">
            <ul>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/add-item">AddItem</NavLink>
                </li>
                <li>
                    <NavLink to="/patrons">Patrons</NavLink>
                </li>
                <li>
                    <NavLink to="/add-patron">AddPatron</NavLink>
                </li>
                <li>
                    <NavLink to="/manage-fines">ManageFines</NavLink>
                </li>
                <li>
                    <NavLink to="/checkout">Checkout</NavLink>
                </li>
                <li>
                    <NavLink to="/checkin">Checkin</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default sideNavbar; 