import axios from "axios";
import { config } from "./config";

export async function getModules() {
  const token = localStorage.getItem("token");
  try {
    const url = `${config.cocoServerBaseURL}/module/modules`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching modules:", err);
    return { status: "error", error: err.message };
  }
}

export async function getModuleType() {
  const token = localStorage.getItem("token");
  try {
    const url = `${config.cocoServerBaseURL}/module_type/module_types`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching module types:", err);
    return { status: "error", error: err.message };
  }
}


export async function getModuleTypebyCourse(course_id) {
  const token = localStorage.getItem("token");

  try {
    const url = `${config.cocoServerBaseURL}/module/allModulesbyCourse/course_id`;
    const response = await axios.post(
      url,
      { course_id }, // send course_id in POST body
      { headers: { Authorization: `Bearer ${token}` } } // send token
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching module types:", err);
    return { status: "error", error: err.message };
  }
}

