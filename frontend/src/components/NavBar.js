import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <h1>PurpleWave Inquiry Form</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/">Form</Link>
          </li>
          <li>
            <Link to="/view">View</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
