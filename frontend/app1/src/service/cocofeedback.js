import axios from "axios";
import { config } from "../service/config";

const BASE_URL = "http://localhost:4003/feedbackSchedule";


// Create new schedule (default export)
export default async function createFeedback(data) {
  const token = localStorage.getItem("token"); // JWT token
  try {
    console.log("Sending payload to backend:", data);
    const res = await axios.post(
      `${config.cocoServerBaseURL}/feedbackSchedule/createFeedback`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from backend:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error in createFeedback:", err);
    return { status: "error", error: err.message };
  }
}


// Get active schedules
export const getActiveFeedbacks = () => {
  return axios.get(`${BASE_URL}/activeFeedback`);
};


// Get deactive schedules
export const getDeactiveFeedbacks = () => {
  return axios.get(`${BASE_URL}/deActiveFeedback`);
};


// Update schedule
export const updateFeedback = (id, payload) => {
  return axios.put(
    `http://localhost:4003/feedbackSchedule/updateFeedback/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  .then(res => res.data)
  .catch(err => {
    console.error("Error updating feedback:", err);
    throw err;
  });
};


// Delete schedule
export const deleteFeedback = (id) => {
  return axios.delete(`${BASE_URL}/deleteFeedback/${id}`);
};
