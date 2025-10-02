import { useState, useEffect } from "react";
import  createFeedback  from "../../service/cocofeedback";
import { toast } from "react-toastify";
import "./createfeedback.css"
import { getTeacher } from "../../service/teacher";
import {  getModuleTypebyCourse } from "../../service/module";
import { getModuleType } from "../../service/module";
import { getGroupbycourse_nameCoco } from "../../service/group";
import { getCourses } from "../../service/course";
import Navbar from "../coconavbar/navbar";
import { useNavigate } from "react-router-dom";

function CreateFeedback() {
  const [form, setForm] = useState({
    teacher_id: "",
    module_id: "",
    module_type_id: "",
    group_id: "",
    course_id: "",
    start_time: "",
    end_time: "",
    is_active: 1,
  });

  const [teachers, setTeachers] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle course selection and fetch groups dynamically
const handleCourseChange = (e) => {
  const courseId = e.target.value;
  setForm({ ...form, course_id: courseId, group_id: "", module_id: "" }); // reset group and module

  if (courseId) {
    // Fetch groups
    getGroupbycourse_nameCoco(courseId)
      .then((result) => {
        if (result.status === "success") setGroups(result.data);
        else {
          setGroups([]);
          toast.error("Failed to load groups");
        }
      })
      .catch((err) => {
        setGroups([]);
        toast.error("Error fetching groups: " + err.message);
      });

    // Fetch modules
    getModuleTypebyCourse(courseId)
      .then((result) => {
        if (result.status === "success")
          { console.log(result.data)
            setModules(result.data);
          }
        else {
          setModules([]);
          console.log(result)
          toast.error("Failed to load modules");
        }
      })
      .catch((err) => {
        setModules([]);
        toast.error("Error fetching modules: " + err.message);
      });

  } else {
    setGroups([]);
    setModules([]);
  }
};







  // Format datetime-local for MySQL
  const formatDateTime = (datetime) => {
    if (!datetime) return null;
    return datetime.replace("T", " ") + ":00";
  };

  // Fetch initial data
  useEffect(() => {
    fetchTeachers();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.teacher_id ||
      !form.module_id ||
      !form.module_type_id ||
      !form.group_id ||
      !form.course_id ||
      !form.start_time ||
      !form.end_time
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (new Date(form.start_time) >= new Date(form.end_time)) {
      toast.warning("End time must be after start time");
      return;
    }

    try {
   const payload = {
  teacher_id: Number(form.teacher_id),
  module_id: Number(form.module_id),
  module_type_id: Number(form.module_type_id),
  group_id: Number(form.group_id),
  course_id: Number(form.course_id),
  start_time: formatDateTime(form.start_time),
  end_time: formatDateTime(form.end_time),
  is_active: 1,
};


      console.log("Payload before sending:", payload);

      const res = await createFeedback(payload);

      if (res.status === "success") {
        toast.success("Feedback schedule created successfully!");
        // Reset form
        setForm({
          teacher_id: "",
          module_id: "",
          module_type_id: "",
          group_id: "",
          course_id: "",
          start_time: "",
          end_time: "",
          is_active: 1,
        });
        setGroups([]);
        navigate("/CocoDashboard")
      } else {
        toast.error(res.error || "Failed to create feedback schedule");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while creating feedback schedule");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
      <form className="input-container" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold">Create Feedback Schedule</h2>

        {/* Teacher */}
        <div>
          <label>Teacher Name</label>
         <select name="teacher_id" value={form.teacher_id} onChange={handleChange}>
  <option value="">--      Select Teacher      --</option>
  {teachers.map((teacher) => (
    <option key={teacher.teacher_id} value={teacher.teacher_id}>
      {teacher.teacher_name}
    </option>
  ))}
</select>


        </div>



       {/* Course */}
        <div>
          <label>Course</label>
          <select name="course_id" value={form.course_id} onChange={handleCourseChange}>
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Group */}
        <div>
          <label>Group</label>
          <select name="group_id" value={form.group_id} onChange={handleChange}>
            <option value="">-- Select Group --</option>
            {groups.map((g) => (
              <option key={g.group_id} value={g.group_id}>
                {g.group_name}
              </option>
            ))}
          </select>
        </div>
        {/* Module */}
        <div>
          <label>Module</label>
          <select name="module_id" value={form.module_id} onChange={handleChange}>
            <option value="">-- Select Module --</option>
            {modules.map((module) => (
              <option key={module.module_id} value={module.module_id}>
                {module.module_name}
              </option>
            ))}
          </select>
        </div>

        {/* Module Type */}
        <div>
          <label>Module Type</label>
          <select name="module_type_id" value={form.module_type_id} onChange={handleChange}>
            <option value="">-- Select Module Type --</option>
            {moduleTypes.map((mt) => (
              <option key={mt.module_type_id} value={mt.module_type_id}>
                {mt.module_type_name}
              </option>
            ))}
          </select>
        </div>

 

        {/* Start Time */}
        <div>
          <label>Start Time</label>
          <input type="datetime-local" name="start_time" value={form.start_time} onChange={handleChange} />
        </div>

        {/* End Time */}
        <div>
          <label>End Time</label>
          <input type="datetime-local" name="end_time" value={form.end_time} onChange={handleChange} />
        </div>

        <button type="submit"  className="btn-view">
          Create
        </button>
      </form>
      </div>
      </div>
    
  );
}

export default CreateFeedback;


