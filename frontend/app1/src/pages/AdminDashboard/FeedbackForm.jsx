import { useEffect, useState } from "react";
import api from "./api";

function formatDateTime(dtLocal) {
  if (!dtLocal) return "";
  return dtLocal.replace("T", " ") + ":00";
}

function FeedbackScheduleForm({ onSubmit, onCancel }) {
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleTypes, setModuleTypes] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // form state
  const [teacherName, setTeacherName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [moduleTypeId, setModuleTypeId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 🔹 Fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teacher/allTeachers");
      setTeachers(res.data.data || []);
    } catch {
      setTeachers([]);
    }
  };

  // 🔹 Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/allCourses");
      setCourses(res.data.data || []);
    } catch {
      setCourses([]);
    }
  };

  // 🔹 Fetch groups for selected course
  const fetchGroups = async (selectedCourseId) => {
    console.log(selectedCourseId)
    if (!selectedCourseId) return;
    try {
      const res = await api.post("/courseGroup/groupbycourse/course_id", {
        course_id: selectedCourseId,
      });
      console.log(res.data.data)
      setGroups(res.data.data || []);
    } catch {
      setGroups([]);
    }
  };

  // 🔹 Fetch modules for selected course
  const fetchModules = async (selectedCourseId) => {
    console.log(selectedCourseId)
    if (!selectedCourseId) return;
    try {
      const res = await api.post("/module/allModulesbyCourse/course_id", {
        course_id: selectedCourseId,
      });
      setModules(res.data.data || []);
    } catch {
      setModules([]);
    }
  };

  // 🔹 Fetch module types
  const fetchModuleTypes = async () => {
    try {
      const res = await api.get("/moduleType/allModulesType");
      setModuleTypes(res.data.data || []);
    } catch {
      setModuleTypes([]);
    }
  };

  // ✅ Load base data on mount
  useEffect(() => {
    fetchCourses();
    fetchTeachers();
    fetchModuleTypes();
  }, []);

  // ✅ When courseId changes → fetch groups + modules
  useEffect(() => {
    if (courseId) {
      fetchGroups(courseId);
      fetchModules(courseId);
    } else {
      setGroups([]);
      setModules([]);
    }
  }, [courseId]);

  // 🔹 Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !teacherName.trim() ||
      !courseId ||
      !moduleId ||
      !moduleTypeId ||
      !groupId ||
      !startTime ||
      !endTime
    ) {
      alert("Please fill all fields.");
      return;
    }
    onSubmit({
      teacher_id: Number(teacherName),
      course_id: Number(courseId),
      module_id: Number(moduleId),
      module_type_id: Number(moduleTypeId),
      group_id: Number(groupId),
      start_time: formatDateTime(startTime),
      end_time: formatDateTime(endTime),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ marginBottom: 20 }}>
      <label>
        Teacher Name:
        <select
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.teacher_id} value={t.teacher_id}>
              {t.first_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Course:
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Select course</option>
          {courses.map((c) => (
            <option key={c.course_id} value={c.course_id}>
              {c.course_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Group:
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          required
        >
          <option value="">Select group</option>
          {groups.map((g) => (
            <option key={g.group_id} value={g.group_id}>
              {g.group_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Module:
        <select
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)}
          required
        >
          <option value="">Select module</option>
          {modules.map((m) => (
            <option key={m.module_id} value={m.module_id}>
              {m.module_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Module Type:
        <select
          value={moduleTypeId}
          onChange={(e) => setModuleTypeId(e.target.value)}
          required
        >
          <option value="">Select module type</option>
          {moduleTypes.map((mt) => (
            <option key={mt.module_type_id} value={mt.module_type_id}>
              {mt.module_type_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Time:
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label>
        End Time:
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginLeft: 8 }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FeedbackScheduleForm;
