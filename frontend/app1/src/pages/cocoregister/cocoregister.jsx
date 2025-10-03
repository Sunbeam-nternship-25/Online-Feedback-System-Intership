import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { register } from "../../service/coco";
import Navbar from "../navbar/navbar";
import { getCourses } from "../../service/course";
import "./cocoregister.css"; // ✅ reuse login page css
import { useNavigate } from 'react-router-dom';

function CocoRegister() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    course_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate()

  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const result = await getCourses();
      if (result.status === "success") {
        setCourses(result.data);
      } else {
        toast.error("Failed to load courses");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const onRegister = async () => {
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.password ||
      !form.confirm_password
    ) {
      toast.warn("Please fill in all required fields");
      return;
    }

    if (form.password !== form.confirm_password) {
      toast.warn("Passwords do not match");
      return;
    }

    const result = await register(
      form.first_name,
      form.last_name,
      form.course_name,
      form.email,
      form.password
    );

    if (result.status === "success") {
      toast.success("Registration successful");
      setForm({
        first_name: "",
        last_name: "",
        course_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      navigate(-1)

    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="page-header">Course Coordinator Registration</h2>
        <div className="login-form-container">
          <div className="input-container">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label>Course Name</label>
            <select
              name="course_name"
              value={form.course_name}
              onChange={handleChange}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course, index) => (
                <option key={index} value={course.course_name}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <button onClick={onRegister} className="btn-success">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CocoRegister;
