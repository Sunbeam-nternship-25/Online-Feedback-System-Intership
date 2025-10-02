import React, { useState, useEffect } from "react";
import api from "./api";
import "./adminDashboard.css";
import CourseForm from "./CourseForm";
import FeedbackScheduleForm from "./FeedbackForm";


import {
  FaUser,
  FaSchool,
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaClipboardList,
  
} from "react-icons/fa";

import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Logout from './../Logout/logout';


const menu = [
  // { label: "Dashboard", icon: <FaThList /> },
  { label: "Courses", icon: <FaBook /> },
  { label: "Groups", icon: <FaSchool /> },
  { label: "Teachers", icon: <FaUser /> },
  { label: "Students", icon: <FaUsers /> },
  { label: "Modules", icon: <FaClipboardList /> },
  { label: "Module Types", icon: <FaClipboardList /> },
  { label: "Feedback Schedules", icon: <FaCalendarAlt /> },
  {label :"Logout", icon : <RiLogoutBoxFill />}
  // { label: "Questions", icon: <FaQuestionCircle /> },
  // { label: "Feedback Reports", icon: <FaRegFileAlt /> },
];

// Utility function



export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Courses");

  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [activeFeedbacks, setActiveFeedbacks] = useState([]);
  const [inactiveFeedbacks, setInactiveFeedbacks] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [selectedStudentCourseId, setSelectedStudentCourseId] = useState("");
  const [teacherCount, setTeacherCount] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedModuleCourseName, setSelectedModuleCourseName] = useState("");


  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.clear();
    navigate("/adminlogin")
  }
  useEffect(() => {
    switch (activeSection) {
      case "Courses":
        fetchCourses();
        break;
      case "Groups":
        fetchGroups();
        break;
      case "Modules":
        fetchCourses();
        fetchModules();
        setSelectedModuleCourseName("");
        break;
      case "Module Types":
        fetchModuleTypes();
        break;
      case "Feedback Schedules":
        fetchFeedbacks();
        break;
      case "Students":
        fetchCourses();
        fetchStudentCount();
        fetchAllStudents();
        setSelectedStudentCourseId("");
        break;
      case "Teachers":
        fetchTeachers();
        fetchTeacherCount();
        break;
      default:
        break;
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "Modules") {
      fetchModules();
    }
  }, [selectedModuleCourseName]);

  // Fetch functions remain unchanged, example:
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/course/allCourses");
      console.log(res.data.data)
      setCourses(res.data.data || []);
    } catch {
      setCourses([]);
    }
    setLoading(false);
  };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await api.get("/courseGroup/allCourseGroup");
      console.log(res.data.data)
      setGroups(res.data.data || []);
    } catch {
      setGroups([]);
    }
    setLoading(false);
  };

  const fetchModules = async () => {
    setLoading(true);
    try {
      if (!selectedModuleCourseName) {
        const res = await api.get("/module/allModules");
        setModules(res.data.data || []);
      } else {
        const res = await api.get(
          `/module/allModulesbyCourse/${encodeURIComponent(selectedModuleCourseName)}`
        );
        setModules(res.data.data || []);
      }
    } catch {
      setModules([]);
    }
    setLoading(false);
  };

  const fetchModuleTypes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/moduleType/allModulesType");
      setModuleTypes(res.data.data || []);
    } catch {
      setModuleTypes([]);
    }
    setLoading(false);
  };

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const activeRes = await api.get("/feedbackSchedule/activeFeedback");
      const inactiveRes = await api.get("/feedbackSchedule/deActiveFeedback");
      console.log(inactiveRes.data.data)
      setActiveFeedbacks(activeRes.data.data || []);
      setInactiveFeedbacks(inactiveRes.data.data || []);
    } catch {
      setActiveFeedbacks([]);
      setInactiveFeedbacks([]);
    }
    setLoading(false);
  };

  const fetchStudentCount = async () => {
    try {
      const res = await api.get("/student/studentCount");
      setStudentCount(res.data.data.count || 0);
    } catch {
      setStudentCount(0);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const res = await api.get("/student/allStudents");
      setStudents(res.data.data || []);
    } catch {
      setStudents([]);
    }
  };

  const fetchStudentsByCourse = async (course_id) => {
    if (!course_id) {
      fetchAllStudents();
      return;
    }
    try {
      const res = await api.get(`/student/studentsByCourse?course_id=${course_id}`);
      setStudents(res.data.data || []);
    } catch {
      setStudents([]);
    }
  };

  const handleCourseFilterChange = (e) => {
    const value = e.target.value;
    setSelectedStudentCourseId(value);
    fetchStudentsByCourse(value);
  };

 // const handleModuleCourseFilterChange = (e) => {
 //   setSelectedModuleCourseName(e.target.value);
 // };


  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teacher/allTeachers");
      console.log(res.data.data || [])
      setTeachers(res.data.data || []);
    } catch {
      setTeachers([]);
    }
  };

  const fetchTeacherCount = async () => {
    try {
      const res = await api.get("/teacher/teacherCount");
      setTeacherCount(res.data.data.count || 0);
    } catch {
      setTeacherCount(0);
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  // Delete handlers for course, group, module, student, teacher

  const handleDeleteCourse = async (course_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete("/course/deleteCourse", { data: { course_id } });
      fetchCourses();
      alert("Deleted successfully");
    } catch {
      alert("Failed to delete course");
    }
  };

  const handleDeleteGroup = async (group_id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await api.delete(`/courseGroup/deleteGroup/${group_id}`);
      fetchGroups();
      alert("Group deleted successfully");
    } catch {
      alert("Failed to delete group");
    }
  };

  const handleDeleteModule = async (module_id) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      await api.delete("/module/deleteModule", { data: { module_id } });
      fetchModules();
      alert("Module deleted successfully");
    } catch {
      alert("Failed to delete module");
    }
  };

  const handleDeleteStudent = async (student_id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/student/deleteStudent/${student_id}`);
      fetchStudentsByCourse(selectedStudentCourseId);
      fetchStudentCount();
      alert("Student deleted successfully");
    } catch {
      alert("Failed to delete student");
    }
  };

  const handleDeleteTeacher = async (teacher_id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await api.delete(`/teacher/deleteTeacher/${teacher_id}`);
      fetchTeachers();
      fetchTeacherCount();
      alert("Teacher deleted successfully");
    } catch {
      alert("Failed to delete teacher");
    }
  };

  // Course form submit
  const handleCourseFormSubmit = async (formData) => {
    try {
      if (editingCourse) {
        await api.put("/course/updateCourse", { course_id: editingCourse.id, ...formData });
      } else {
        await api.post("/course/insertCourse", formData);
      }
      setShowCourseForm(false);
      setEditingCourse(null);
      fetchCourses();
    } catch {
      alert("Failed to save");
    }
  };

  // Feedback submit
  const handleFeedbackSubmit = async (formData) => {
    try {
      await api.post("/feedbackSchedule/createFeedback", {
        ...formData,
        teacher_id: Number(formData.teacher_id),
        course_id: Number(formData.course_id),
        module_id: Number(formData.module_id),
        module_type_id: Number(formData.module_type_id),
        group_id: Number(formData.group_id),
      });
      alert("Feedback created successfully");
      setShowFeedbackForm(false);
      fetchFeedbacks();
    } catch {
      alert("Failed to create feedback");
    }
  };

  return (
    <div className="admin-root">
      <div className="sidebar">
        <div className="sidebar-header">Menu</div>
        {menu.map(item => (
          <div
            key={item.label}
            className={`sidebar-item ${activeSection === item.label ? "active" : ""}`}
            onClick={() => {
                if(item.label === "Logout"){
                    handleLogout();
                }
                else {
                    setActiveSection(item.label)
                }
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="admin-content">
        <h1>Admin Dashboard</h1>

        {activeSection === "Courses" && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <span className="admin-table-title">Course List</span>
              {!showCourseForm && (
                <button className="table-btn add-btn" onClick={handleAddCourse}>
                  Add Course
                </button>
              )}
            </div>
            {showCourseForm && (
              <CourseForm
                initialData={editingCourse}
                onSubmit={handleCourseFormSubmit}
                onCancel={() => {
                  setShowCourseForm(false);
                  setEditingCourse(null);
                }}
              />
            )}
            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>Loading...</td>
                  </tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id || course.course_id}>
                      <td>{course.id || course.course_id}</td>
                      <td>{course.name || course.course_name}</td>
                      <td>
                        <button
                          className="table-btn edit-btn"
                          onClick={() => handleEditCourse(course)}
                        >
                          Edit
                        </button>
                        <button
                          className="table-btn delete-btn"
                          onClick={() =>
                            handleDeleteCourse(course.id || course.course_id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}


        {activeSection === "Groups" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>Group List</div>
            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Group ID</th>
                  <th>Group Name</th>
                  <th>Course Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3}>Loading...</td></tr>
                ) : (
                  groups.map(group => (
                    <tr key={group.group_id}>
                      <td>{group.group_id}</td>
                      <td>{group.group_name}</td>
                      <td>{group.course_name}</td>
                      <td>
                        <button className="table-btn delete-btn" onClick={() => handleDeleteGroup(group.group_id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Students" && (
          <div className="admin-table-card">
            <div style={{ marginBottom: 16 }}>
              <label>
                Filter by Course:
                <select
                  value={selectedStudentCourseId}
                  onChange={handleCourseFilterChange}
                  style={{ marginLeft: 12 }}
                >
                  <option value="">All</option>
                  {courses.map(c => (
                    <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Students - Total: {studentCount}
            </div>
            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>PRN No</th>
                  <th>Group ID</th>
                  <th>Course Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan={8}>No students found.</td></tr>
                ) : (
                  students.map(student => (
                    <tr key={student.student_id}>
                      <td>{student.student_id}</td>
                      <td>{student.first_name}</td>
                      <td>{student.last_name}</td>
                      <td>{student.email}</td>
                      <td>{student.prn_no}</td>
                      <td>{student.group_id}</td>
                      <td>{student.course_name || "-"}</td>
                      <td>
                        <button className="table-btn delete-btn" onClick={() => handleDeleteStudent(student.student_id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Teachers" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>Teachers - Total: {teacherCount}</div>
            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Teacher ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.length === 0 ? (
                  <tr><td colSpan={5}>No teachers found.</td></tr>
                ) : (
                  teachers.map(teacher => (
                    <tr key={teacher.teacher_id}>
                      <td>{teacher.teacher_id}</td>
                      <td>{teacher.first_name}</td>
                      <td>{teacher.last_name}</td>
                      <td>{teacher.email || "-"}</td>
                      <td>
                        <button className="table-btn delete-btn" onClick={() => handleDeleteTeacher(teacher.teacher_id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Modules" && (
          <div className="admin-table-card">
            <div style={{ marginBottom: 16 }}>
              <label>
                Filter by Course:
                <select
                  value={selectedModuleCourseName}
                  onChange={(e) => {
                    console.log("Filtering modules by course:", e.target.value);
                    setSelectedModuleCourseName(e.target.value);
                  }}
                  style={{ marginLeft: 12 }}
                >
                  <option value="">All</option>
                  {courses.map((c) => (
                    <option key={c.course_id} value={c.course_name}>
                      {c.course_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="admin-table-title" style={{ marginBottom: 18 }}>
              Module List
            </div>
            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Module ID</th>
                  <th>Module Name</th>
                  <th>Course Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                ) : modules.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No modules found.</td>
                  </tr>
                ) : (
                  modules.map((module) => (
                    <tr key={module.module_id}>
                      <td>{module.module_id}</td>
                      <td>{module.module_name}</td>
                      <td>{module.course_name ? module.course_name : <span style={{ color: "gray" }}>N/A</span>}</td>
                      <td>
                        <button
                          className="table-btn delete-btn"
                          onClick={() => handleDeleteModule(module.module_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}





        {activeSection === "Module Types" && (
          <div className="admin-table-card">
            <div className="admin-table-title" style={{ marginBottom: 18 }}>Module Types</div>
            <table className="admin-table" cellSpacing="0">
              <thead>
                <tr>
                  <th>Module Type ID</th>
                  <th>Module Type Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3}>Loading...</td>
                  </tr>
                ) : moduleTypes.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No module types found.</td>
                  </tr>
                ) : (
                  moduleTypes.map(type => (
                    <tr key={type.module_type_id}>
                      <td>{type.module_type_id}</td>
                      <td>{type.module_type_name}</td>
                      <td>
                        <button
                          className="table-btn delete-btn"
                          onClick={async () => {
                            if (!window.confirm("Are you sure you want to delete this module type?")) return;
                            try {
                              await api.delete(`/moduleType/deleteModuleType/${type.module_type_id}`);
                              fetchModuleTypes();
                              alert("Module type deleted successfully");
                            } catch {
                              alert("Failed to delete module type");
                            }
                          }}
                        >Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}


        {/* Feedback Schedules Section */}
{activeSection === "Feedback Schedules" && (
  <div>
    {!showFeedbackForm && (
      <>
        <button
          className="table-btn add-btn"
          onClick={() => setShowFeedbackForm(true)}
          style={{ marginBottom: 20 }}
        >
          Create Feedback Schedule
        </button>

        {/* Active Feedbacks */}
        <div style={{ marginBottom: 20 }}>
          <strong>Active Feedbacks</strong>
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              {activeFeedbacks.length === 0 ? (
                <p>No active feedback schedules.</p>
              ) : (
                <table className="feedback-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher</th>
                      <th>Module</th>
                      <th>Course</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeFeedbacks.map((fb, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{fb.teacher_name || `${fb.first_name} ${fb.last_name}`}</td>
                        <td>{fb.module_name}</td>
                        <td>{fb.course_name}</td>
                        <td>{new Date(fb.start_time).toLocaleString()}</td>
                        <td>{new Date(fb.end_time).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>

        {/* Inactive Feedbacks */}
        <div style={{ marginTop: 20 }}>
          <strong>Inactive Feedbacks</strong>
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              {inactiveFeedbacks.length === 0 ? (
                <p>No inactive feedback schedules.</p>
              ) : (
                <table className="feedback-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher</th>
                      <th>Module</th>
                      <th>Course</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inactiveFeedbacks.map((fb, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{fb.teacher_name || `${fb.first_name} ${fb.last_name}`}</td>
                        <td>{fb.module_name}</td>
                        <td>{fb.course_name}</td>
                        <td>{new Date(fb.start_time).toLocaleString()}</td>
                        <td>{new Date(fb.end_time).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </>
    )}

    {showFeedbackForm && (
      <FeedbackScheduleForm
        onSubmit={handleFeedbackSubmit}
        onCancel={() => setShowFeedbackForm(false)}
      />
    )}
  </div>
)}



      </div>
    </div>
  );
}
