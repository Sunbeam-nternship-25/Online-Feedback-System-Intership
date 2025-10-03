import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../coconavbar/navbar";
import { useNavigate } from "react-router-dom";
import { updateFeedback } from "../../service/cocofeedback";
import { getTeacher } from "../../service/teacher"; 
import { getModules } from "../../service/module";
import { getModuleType } from "../../service/module";
import { getGroupbycourse_nameCoco } from "../../service/group";
import { getCourses } from "../../service/course";
import "./CocoDashboard.css"

import { config } from "../../service/config";

function FeedbackDashboard() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState(null); // store student data
  const [editSchedule, setEditSchedule] = useState(null); // store schedule being edited
  const navigate = useNavigate()

  const [teachers, setTeachers] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);

   useEffect(() => {
      fetchTeachers();
      fetchModules();
      fetchModuleTypes();
      fetchCourses();
    }, []);
  
    const fetchTeachers = async () => {
      try {
        const result = await getTeacher();
        if (result.status === "success") 
          {setTeachers(result.data);
        console.log(result.data)}
        else toast.error("Failed to load teachers");
      } catch (err) {
        toast.error("Error fetching teachers: " + err.message);
      }
    };
  
    const fetchModules = async () => {
      try {
        const result = await getModules();
        if (result.status === "success") setModules(result.data);
        else toast.error("Failed to load modules");
      } catch (err) {
        toast.error("Error fetching modules: " + err.message);
      }
    };
  
    const fetchModuleTypes = async () => {
      try {
        const result = await getModuleType();
        if (result.status === "success") setModuleTypes(result.data);
        else toast.error("Failed to load module types");
      } catch (err) {
        toast.error("Error fetching module types: " + err.message);
      }
    };
  
    const fetchCourses = async () => {
      try {
        const result = await getCourses();
        if (result.status === "success") setCourses(result.data);
        else toast.error("Failed to load courses");
      } catch (err) {
        toast.error("Error fetching courses: " + err.message);
      }
    };

    const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setEditSchedule({ ...editSchedule, course_id: courseId, group_id: "" }); // reset group

    if (courseId) {
      getGroupbycourse_nameCoco(courseId)
        .then((result) => {
          if (result.status === "success") {
            setGroups(result.data);
          } else {
            setGroups([]);
            toast.error("Failed to load groups");
          }
        })
        .catch((err) => {
          setGroups([]);
          toast.error("Error fetching groups: " + err.message);
        });
    } else {
      setGroups([]);
    }
  };


  useEffect(() => {
    fetchSchedules();
  }, []);


  const fetchSchedules = () => {
    axios
      .get(`${config.cocoServerBaseURL}/feedbackSchedule/feedbackSchedules`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res.data)
        setSchedules(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schedules:", err);
        setLoading(false);
      });
  };

  //  View Students
  const handleView = (scheduleId) => {
    axios
       navigate(`/students/${scheduleId}`);
      };

  //  Edit Schedule
  const handleEdit = (schedule) => {
    setEditSchedule(schedule); // open modal with schedule details
  };


 const handleSaveEdit = async () => {
  try {
    if (
      !editSchedule.teacher_id ||
      !editSchedule.module_id ||
      !editSchedule.module_type_id ||
      !editSchedule.group_id ||
      !editSchedule.course_id ||
      !editSchedule.start_time ||
      !editSchedule.end_time
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (new Date(editSchedule.start_time) >= new Date(editSchedule.end_time)) {
      toast.warning("End time must be after start time");
      return;
    }

    // Format datetime for MySQL
    const formatDateTime = (datetime) =>
      datetime.replace("T", " ") + ":00";

    const payload = {
      teacher_id: Number(editSchedule.teacher_id),
      module_id: Number(editSchedule.module_id),
      module_type_id: Number(editSchedule.module_type_id),
      group_id: Number(editSchedule.group_id),
      course_id: Number(editSchedule.course_id),
      start_time: formatDateTime(editSchedule.start_time),
      end_time: formatDateTime(editSchedule.end_time),
    };

    const res = await updateFeedback(editSchedule.feedback_schedule_id, payload);

    if (res.status === "success") {
      toast.success("Schedule updated successfully");
      setEditSchedule(null);
      fetchSchedules(); // refresh table
    } else {
      toast.error(res.error || "Failed to update schedule");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error while updating schedule");
  }
};

  // Cancel schedule
 const handleCancel = (id) => {
  if (window.confirm("Are you sure you want to cancel this feedback schedule?")) {
    axios
      .delete(`${config.cocoServerBaseURL}/feedbackSchedule/deleteFeedback/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        fetchSchedules(); // refresh list
      })
      .catch((err) => console.error("Error deleting schedule:", err));
  }
};

if (loading) return <p>Loading schedules...</p>;
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Feedback Schedules</h2>

        {schedules.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Teacher</th>
                <th>Module</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((sch,i) => (
                <tr key={i}>
                  <td>{i +1 }</td>
                  <td>{sch.teacher_name}</td>
                  <td>{sch.module_name}</td>
                  <td>{new Date(sch.start_time).toLocaleString()}</td>
                  <td>{new Date(sch.end_time).toLocaleString()}</td>
                  <td className={sch.status === "Active" ? "status-active" : "status-inactive"}>
                    {sch.status}
                  </td>
                  <td colSpan={10}>
                    <button className="btn-view" onClick={() => handleView(sch.feedback_schedule_id)}>
                      View
                    </button>
                    <button className="btn-edit" onClick={() => handleEdit(sch)}>
                      Edit
                    </button>
                    <button
                     className="btn-cancel"
                     onClick={() => handleCancel(sch.feedback_schedule_id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No schedules found</p>
        )}
      </div>


      {/*  View Modal */}
      {viewData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Students Feedback Status</h3>
            <h4>  Submitted  </h4>
            <ul>
              {viewData.submitted.map((s) => (
                <li key={s.student_id}>{s.first_name} {s.last_name} ({s.email})</li>
              ))}
            </ul>
            <h4>  Not Submitted  </h4>
            <ul>
              {viewData.notSubmitted.map((s) => (
                <li key={s.student_id}>{s.first_name} {s.last_name} ({s.email})</li>
              ))}
            </ul>
            <button onClick={() => setViewData(null)}>Close</button>
          </div>
        </div>
      )}


      
{/* Edit Modal */}

{editSchedule && (
  <div className="modal">
    <div className="modal-content">
      <h3>Edit Schedule</h3>

      {/* Teacher */}
      <label>Teacher:</label>
      <select
        value={editSchedule.teacher_id}
        onChange={(e) =>
          setEditSchedule({ ...editSchedule, teacher_id: Number(e.target.value) })
        }
      >
        <option value="">-- Select Teacher --</option>
        {teachers.map((t) => (
          <option key={t.teacher_id} value={t.teacher_id}>
            {t.teacher_name}
          </option>
        ))}
      </select>

      {/* Module */}
      <label>Module:</label>
      <select
        value={editSchedule.module_id}
        onChange={(e) =>
          setEditSchedule({ ...editSchedule, module_id: Number(e.target.value) })
        }
      >
        <option value="">-- Select Module --</option>
        {modules.map((m) => (
          <option key={m.module_id} value={m.module_id}>
            {m.module_name}
          </option>
        ))}
      </select>

      {/* Module Type */}
      <label>Module Type:</label>
      <select
        value={editSchedule.module_type_id}
        onChange={(e) =>
          setEditSchedule({ ...editSchedule, module_type_id: Number(e.target.value) })
        }
      >
        <option value="">-- Select Module Type --</option>
        {moduleTypes.map((mt) => (
          <option key={mt.module_type_id} value={mt.module_type_id}>
            {mt.module_type_name}
          </option>
        ))}
      </select>

      {/* Course */}
              <div>
          <label>Course</label>
          <select name="course_id" value={editSchedule.course_id} onChange={handleCourseChange}>
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

      {/* Group */}
      <label>Group:</label>
      <select
        value={editSchedule.group_id}
        onChange={(e) =>
          setEditSchedule({ ...editSchedule, group_id: Number(e.target.value) })
        }
      >
        <option value="">-- Select Group --</option>
        {groups.map((g) => (
          <option key={g.group_id} value={g.group_id}>
            {g.group_name}
          </option>
        ))}
      </select>

      {/* Start Time */}
      <label>Start Time:</label>
      <input
        type="datetime-local"
        value={editSchedule.start_time.slice(0,16)}
        onChange={(e) =>
          setEditSchedule({ ...editSchedule, start_time: e.target.value })
        }
      />

      {/* End Time */}
      <label>End Time:</label>
      <input
        type="datetime-local"
        value={editSchedule.end_time.slice(0,16)}
        onChange={(e) =>
          setEditSchedule({ ...editSchedule, end_time: e.target.value })
        }
      />

      <button onClick={handleSaveEdit}>Save</button>
      <button onClick={() => setEditSchedule(null)}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
}

export default FeedbackDashboard;
