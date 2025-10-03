
import { useState } from 'react';
import { registerTeacher } from '../../service/teacher';
import Navbar from '../navbar/navbar';
import './teacherRegister.css'; // Reuse the same CSS as login page


 // You'll implement this API call
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TeacherRegister() {

    const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  
 const navigate = useNavigate();

 
  const onRegister = async () => {
    if (first_name.length == 0) {
      toast.warn("Please Enter the First name");
    } else if (last_name.length == 0) {
      toast.warn("Please Enter the Last name");
    } else if (email.length == 0) {
      toast.warn("Please Enter the Email");
    } else if (password.length == 0) {
      toast.warn("Please Enter the Password");
    } else if (confirm_password.length == 0) {
      toast.warn("Please Enter the Confirm Password");
    } else if (password != confirm_password) {
      toast.warn("Password does not match");
    }  else {
      const result = await registerTeacher(
        first_name,
        last_name,
        email,
        password
      );
      
      if (result["status"]== "success") {
        toast.success("Teacher Registered Successfully");
        navigate(-1)
        
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h2 className='page-header'>Teacher Registration</h2>
        <div className='login-form-container'>

          <div className='input-container'>
            <label>First Name</label>
            <input type='text' 
               value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </div>

          <div className='input-container'>
            <label>Last Name</label>
            <input type='text' 
            value={last_name}
              onChange={(e) => setLast_name(e.target.value)} />
          </div>

          <div className='input-container'>
            <label>Email</label>
            <input type='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='input-container'>
            <label>Password</label>
            <input type='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='input-container'>
            <label>Confirm Password</label>
            <input type='password' 
             value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)} />
          </div>
      

          <div className='input-container'>
            <button  className='btn btn-success'  onClick={onRegister}>
              Register
            </button>
          </div>

         

        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
