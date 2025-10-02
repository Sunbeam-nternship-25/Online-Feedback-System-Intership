import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="spacer"></div>
        <div className="logo">Online Feedback System</div>
        <ul className="nav-links">
          <li><Link to="/">Student</Link></li>
          <li><Link to="/teacherlogin">Teacher</Link></li>
           <li><Link to="/cocologin">Co-Coordinator</Link></li>
          <li><Link to="/adminlogin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
