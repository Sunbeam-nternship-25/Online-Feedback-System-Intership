import axios from "axios";
import { config } from "./config";

export async function login(email, password) {
  try {
    const url = `${config.teacherServerBaseURL}/teacher/login`;

    const body = { email, password };
    const response = await axios.post(url, body);

    return response.data;
  } catch (ex) {
    console.log(`Exception :`, ex);
  }
}

export async function feedbackInfo() {
  const url = `${config.teacherServerBaseURL}/feedback/feedbackinfo`;

  const token = localStorage.getItem("token");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function countSubmitted() {
  const url = `${config.teacherServerBaseURL}/feedback/countfeedbacksubmitted`;

  const token = localStorage.getItem("token");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function remainingCountURL() {
  const url = `${config.teacherServerBaseURL}/feedback/countfeedbackRemaing`;

  console.log(url)

  const token = localStorage.getItem("token");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}


export async function getTeacher() {
  const token = localStorage.getItem("token");
  const url = `${config.cocoServerBaseURL}/teacher/teacher_name`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, // <-- add Bearer
    },
  });

  return response.data;
}


export async function getTeacherById() {
  const token = localStorage.getItem("token");
  const url = `${config.cocoServerBaseURL}/teacher/teacherbyid`;

  const response = await axios.post(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}



