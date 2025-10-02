import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.info("Logged out successfully");

    
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}

export default Logout;
