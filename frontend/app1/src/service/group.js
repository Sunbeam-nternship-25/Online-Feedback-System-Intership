import axios from "axios";
import { config } from "./config";


export async function getGroupbycourse_nameStudent(course_name) {

    const url = `${config.studentServerBaseURL}/group/groupbycourse/course_name`;

    const body = {course_name}

    const response = await axios.post(url,body);
    
    return response.data 
    
}




export const getGroupbycourse_nameCoco = async (course_id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${config.cocoServerBaseURL}/group/groupbycourse`,
      { course_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching groups:", err);
    return { status: "error", error: err.message };
  }
};
