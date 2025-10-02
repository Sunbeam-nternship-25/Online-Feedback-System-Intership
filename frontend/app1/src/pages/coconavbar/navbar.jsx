import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="spacer"></div>
        <div className="logo">Online Feedback System</div>
        <ul className="nav-links">
          <li><Link to="/CocoDashboard">Dashboard</Link></li>
          <li><Link to="/CreateFeedback">Create Feedback</Link></li>
          <li><Link to="/">Log Out</Link></li>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
