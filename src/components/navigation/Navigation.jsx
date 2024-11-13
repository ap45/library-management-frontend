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
