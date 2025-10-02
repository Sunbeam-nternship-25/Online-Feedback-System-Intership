import axios from "axios";
import { config } from "./config";

export async function activeFeedback() {
  const url = `${config.studentServerBaseURL}/feedback/activeFeedback`;

  const token = localStorage.getItem("token"); 

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

console.log(response.data)

  return response.data;
}


export async function checkFeedback() {
  const url = `${config.studentServerBaseURL}/feedback/checkFeedback`;

  const token = localStorage.getItem("token"); 

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


  return response.data;
}


export async function addFeedback(q1, q2, q3, q4, q5, suggestion) {
  const url = `${config.studentServerBaseURL}/feedback/fillFeedback2`;

  const body = { q1, q2, q3, q4, q5, suggestion };

  const token = localStorage.getItem("token");

  const response = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
