import axios from "axios";
import { config} from "./config"; // base URL of backend


export async function getQ1() {
  const token = localStorage.getItem("token");
  const url = `${config.teacherServerBaseURL}/question/q1`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getQ2() {
  const token = localStorage.getItem("token");
  const url = `${config.teacherServerBaseURL}/question/q2`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}



export async function getQ3() {
  const token = localStorage.getItem("token");
  const url = `${config.teacherServerBaseURL}/question/q3`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}



export async function getQ4() {
  const token = localStorage.getItem("token");
  const url = `${config.teacherServerBaseURL}/question/q4`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}



export async function getQ5() {
  const token = localStorage.getItem("token");
  const url = `${config.teacherServerBaseURL}/question/q5`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

