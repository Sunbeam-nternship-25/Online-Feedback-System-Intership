import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import "./studentregister.css"; // Reuse the same CSS as login page
import { toast } from "react-toastify";

// You'll implement this API call

import { registerStudent } from "../../service/student";
import { allCourse } from "../../service/course";
import { getGroupbycourse_nameStudent } from "../../service/group";
import { useNavigate } from "react-router-dom";

function StudentRegister() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [prn_no, setPrn_no] = useState("");
  const [course_name, setcourse_name] = useState("");
  const [group_name, setgroup_name] = useState("");

  const [courses, setCourses] = useState([]);

  const [groups, setGroup] = useState([]);

  
  const navigate = useNavigate()
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (course_name) {
      fetchGroupbyCourse();
    }
  }, [course_name]);

  const fetchCourses = async () => {
    try {
      const result = await allCourse();
      if (result["status"] === "success") {
        setCourses(result["data"]);
      } else {
        toast.error("Failed to load courses");
      }
    } catch (err) {
      toast.error("Error fetching courses", err);
    }
  };

  const fetchGroupbyCourse = async () => {
    try {
      const result = await getGroupbycourse_nameStudent(course_name);
      if (result["status"] === "success") {
        setGroup(result["data"]);
      } else {
        toast.error("Failed to load groups: " + result["message"]);
      }
    } catch (err) {
      toast.error("Error fetching groups", err);
    }
  };

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
    } else if (prn_no == 0) {
      toast.warn("Please Enter the PRN Number");
    } else if (course_name == 0) {
      toast.warn("Please Enter the Course Name");
    } else if (group_name == 0) {
      toast.warn("Please Enter the Group Name");
    } else {
      const result = await registerStudent(
        first_name,
        last_name,
        email,
        password,
        prn_no,
        course_name,
        group_name
      );
      
      if (result["status"]== "success") {
        toast.success("Student Registered Successfully");
        navigate(-1)
        
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="page-header">Student Registration</h2>
        <div className="login-form-container">
          <div className="input-container">
            <label>First Name</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Last Name</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>PRN Number</label>
            <input
              type="text"
              value={prn_no}
              onChange={(e) => setPrn_no(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Course Name</label>
            <select
              value={course_name}
              onChange={(e) => setcourse_name(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course, index) => (
                <option key={index} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <label>Group Name</label>
            <select
              value={group_name}
              onChange={(e) => setgroup_name(e.target.value)}
            >
              <option value="">-- Select Group --</option>
              {groups.map((group, index) => (
                <option key={index} value={group.group_id}>
                  {group.group_name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <button className="btn btn-success" onClick={onRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
