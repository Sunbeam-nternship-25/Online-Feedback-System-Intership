
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();
 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="spacer"></div>
        <div className="logo">Online Feedback System</div>
        <ul className="nav-links">
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
