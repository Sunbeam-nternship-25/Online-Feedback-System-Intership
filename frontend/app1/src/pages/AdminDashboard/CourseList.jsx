import React, { useState, useEffect } from "react";
import api from "../api";
//import CourseForm from "./CourseForm";
import CourseForm from "./CourseForm";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/course/allCourses");
      setCourses(res.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load courses" + err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDeleteClick = async (course_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete("/course/deleteCourse", { data: { course_id } });
      fetchCourses();
    } catch (err) {
      alert("Failed to delete course" + err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCourse) {
        await api.put("/course/updateCourse", { 
          course_id: editingCourse.course_id, 
          course_name: formData.course_name 
        });
      } else {
        await api.post("/course/insertCourse", formData);
      }
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      alert("Failed to save course" + err);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h3>Courses</h3>
      {!showForm && (
        <button onClick={handleAddClick} className="btn btn-primary mb-2">Add New Course</button>
      )}

      {showForm && (
        <CourseForm
          initialData={editingCourse}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      <ul className="list">
        {courses.map((course) => (
          <li key={course.course_id} className="list-item">
            {course.course_name}
            <div>
              <button onClick={() => handleEditClick(course)} className="btn btn-sm btn-secondary mr-2">
                Edit
              </button>
              <button onClick={() => handleDeleteClick(course.course_id)} className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
