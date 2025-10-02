import { useState } from "react";
import Navbar from "../navbar/navbar";
import "./studentlogin.css";
import { toast } from "react-toastify";
import { login } from "../../service/student.js";
import { Link, useNavigate } from "react-router-dom";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

 const onLogin = async () => {
  if (email.length === 0) {
    toast.warn("Please enter email");
  } else if (password.length === 0) {
    toast.warn("Please enter password");
  } else {
    const result = await login(email, password);

    if (result["status"] === "success") {
      toast.success("Successfully Logged in");

      
      localStorage.setItem("token", result.data.token);
     
      navigate("/studentDashboard");
    } else {
      toast.error("Invalid Email or Password");
    }
  }
};

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="page-header">Student Login</h2>
        <div className="login-form-container">
          <div className="input-container">
            <label htmlFor="">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <div style={{ marginBottom: 20, color: "#6a6a6a" }}>
              Don't have account yet?
              <Link to="/studentregister">Register here</Link>
            </div>
            <button onClick={onLogin} className="btn btn-success">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
