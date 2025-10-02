import React, { useState, useEffect } from "react";

function CourseForm({ initialData, onSubmit, onCancel }) {
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    if (initialData) {
      setCourseName(initialData.course_name || "");
    } else {
      setCourseName("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim()) {
      alert("Course name is required");
      return;
    }
    onSubmit({ course_name: courseName });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Course Name:
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
          required
        />
      </label>
      <div style={{ marginTop: "10px" }}>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CourseForm;
