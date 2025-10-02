import axios from "axios";
import { config } from "./config";

export async function login(email, password) {
  try {
    const url = `${config.studentServerBaseURL}/student/login`;

    const body = { email, password };
  
    const response = await axios.post(url, body);

    return response.data;
  } catch (ex) {
    console.log(`Exception :`, ex);
  }
}



export async function registerStudent(
  first_name,
  last_name,
  email,
  password,
  prn_no,
  course_name,
  group_name
) {
  try {
    const url = `${config.studentServerBaseURL}/student/newRegister`;
    const body = {
      first_name,
      last_name,
      email,
      password,
      prn_no,
      course_name,
      group_name,
    };

    const response = await axios.post(url, body);

    return response.data;
  } catch (ex) {
    console.log(`Exception :`, ex);
  }
}





export async function getStudentbyId() {
  const url = `${config.studentServerBaseURL}/student/studentbyid`;

  const token = localStorage.getItem("token"); 

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
}

