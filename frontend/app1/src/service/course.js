import axios from "axios";
import { config } from "./config";


export async function allCourse() {

    const url = `${config.studentServerBaseURL}/course/allCourses`;

    const response = await axios.get(url);
    
    return response.data 
    
}


export async function getCourses() {
  const token = localStorage.getItem("token");
  try {
    const url = `${config.cocoServerBaseURL}/course/courses`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return { status: "error", error: err.message };
  }
}