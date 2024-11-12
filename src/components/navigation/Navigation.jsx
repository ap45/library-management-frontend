import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../utils/constant';
import { useState, useEffect } from 'react';
import zIndex from '@mui/material/styles/zIndex';

const Navigation = () => {
  const [selectedPath, setSelectedPath] = useState(window.location.pathname); // Initial selected path
  const location = useLocation();

  useEffect(() => {
    // check if initial path is '/' and highlight dashboard
    if (location.pathname === "/") {
      setSelectedPath('/dashboard');
    }
    else {
      setSelectedPath(location.pathname);
    }
  }, [location.pathname]);

  const NavbarStyle = {
    listStyleType: 'none',
    padding: '0',
    paddingBottom: '10px',
    paddingLeft: '10px',
    textAlign: 'left',
    zIndex: "3",
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
    <ul style={NavbarStyle}>
      {menuItems.map(({ title, path }) => (
        <li
          key={path}
          style={{
            ...ListItemStyle,
            ...(selectedPath === path ? SelectedListItemStyle : {})
          }}
        >
          <Link to={path}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;