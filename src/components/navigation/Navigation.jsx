import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../utils/constant';
import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [selectedPath, setSelectedPath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedPath('/dashboard');
    } else {
      setSelectedPath(location.pathname);
    }
  }, [location.pathname]);

  const NavbarStyle = {
    listStyleType: 'none',
    padding: '0',
    paddingBottom: '10px',
    paddingLeft: '10px',
    textAlign: 'left',
  };

  const ListItemStyle = {
    margin: '10px',
    paddingBottom: '20px',
    paddingTop: '20px',
    paddingLeft: '10px',
    textDecoration: 'none',
    color: 'black',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s', // Add transition for smooth effect
  };

  const SelectedListItemStyle = {
    ...ListItemStyle, // Inherit styles from ListItemStyle
    backgroundColor: 'lightblue',
    color: 'white', // Set color to white for selected item
  };

  return (
    <nav className="navbar">
    <ul className="navbar-menu">
        {menuItems.map(({ title, path }) => (
            <li
                key={path}
                className={`navbar-item ${selectedPath === path ? 'selected' : ''}`}
            >
                <Link to={path} className="navbar-link">
                    {title}
                </Link>
            </li>
        ))}
    </ul>
</nav>
);
};

export default Navigation;
