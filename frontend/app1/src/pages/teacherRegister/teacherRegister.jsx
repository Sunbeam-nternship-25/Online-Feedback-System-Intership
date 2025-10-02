
import Navbar from '../navbar/navbar';
import './teacherRegister.css'; // Reuse the same CSS as login page


 // You'll implement this API call
import { Link } from 'react-router-dom';

function TeacherRegister() {

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h2 className='page-header'>Teacher Registration</h2>
        <div className='login-form-container'>

          <div className='input-container'>
            <label>First Name</label>
            <input type='text' />
          </div>

          <div className='input-container'>
            <label>Last Name</label>
            <input type='text'  />
          </div>

          <div className='input-container'>
            <label>Email</label>
            <input type='email' />
          </div>

          <div className='input-container'>
            <label>Password</label>
            <input type='password' />
          </div>

          <div className='input-container'>
            <label>Confirm Password</label>
            <input type='password'  />
          </div>
      

          <div className='input-container'>
            <button  className='btn btn-success'>
              Register
            </button>
          </div>

         

        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
