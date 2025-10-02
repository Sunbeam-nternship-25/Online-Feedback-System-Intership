import React, { useEffect, useState } from "react";
import StudentNavbar from "../studentNavbar/navbar";

import "./dashbord.css";
import { countSubmitted, feedbackInfo, remainingCountURL  } from "../../service/teacher";
import { getQ1, getQ2, getQ3, getQ4, getQ5 } from "../../service/question";


function TeacherDashboard() {
  const [info, setInfo] = useState({});
  const[count,setCount] = useState("")
  const[remainingCount,setremaininfCount] = useState("")
  const [q1, setQ1] = useState({});
const [q2, setQ2] = useState({});
const [q3, setQ3] = useState({});
const [q4, setQ4] = useState({});
const [q5, setQ5] = useState({});
  

useEffect(() => {
  const loadFeedbackSummary = async () => {
    const res1 = await getQ1();
    console.log(res1)
    const res2 = await getQ2();
    const res3 = await getQ3();
    const res4 = await getQ4();
    const res5 = await getQ5();

    if (res1.status === "success") {
      console.log(res1.data[0])
      setQ1(res1.data[0]);}
    if (res2.status === "success") setQ2(res2.data[0]);
    if (res3.status === "success") setQ3(res3.data[0]);
    if (res4.status === "success") setQ4(res4.data[0]);
    if (res5.status === "success") setQ5(res5.data[0]);
  };

  loadFeedbackSummary();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await feedbackInfo()
      if (result.status === "success" && result.data.length > 0) {
        setInfo(result.data[0]); 
      }
    };
    fetchData();
  }, []);
   

  useEffect(() => {
    const fetchCount = async () => {
      const result = await countSubmitted()  
      if (result.status === "success") {
        setCount(result.data[0].count); 
      }
    };
    fetchCount();
  }, []);


    useEffect(() => {
    const remainingCountofStudent = async () => {
      const result = await remainingCountURL()
      if (result.status === "success") {
        setremaininfCount(result.data); 
      }
    };
    remainingCountofStudent();
  }, []);

  

  

  return (
    <>
      <StudentNavbar />
      <div className="container">
      <div className="header">
  <h2 className="title">Feedback Report</h2>
 
</div>


        <div className="report-card">
          <div className="report-grid">
            <div>
              <p className="label">Module Type</p>
              <p>{info.module_type_name}</p>
            </div>
            <div>
              <p className="label">Course</p>
              <p>{info.course_name}</p>
            </div>
            <div>
              <p className="label">Date</p>
              <p>
                {new Date(info.start_time).toLocaleDateString()} to{" "}
                {new Date(info.end_time).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="label">Module</p>
              <p>{info.module_name}</p>
            </div>
            <div>
              <p className="label">#Feedback Submitted</p>
              <p>{count}</p>
            </div>
            <div>
              <p className="label">#Feedback Remaining</p>
              <p>{remainingCount}</p>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="card-content">
            <div className="header">
              <h2 className="subtitle">Faculty feedback summary</h2>
              <p className="label">
                Rating: <span className="highlight">3.44</span>
              </p>
            </div>
            <p className="label">Name: {info.first_name} {info.last_name}</p>

            <div className="table-container">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Excellent</th>
                    <th>Good</th>
                    <th>Satisfactory</th>
                    <th>Unsatisfactory</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Faculty initiative ...</td>
                  <td>{q1.q1_Excellent}</td>
                  <td>{q1.q1_Good}</td>
                  <td>{q1.q1_Satisfactory}</td>
                  <td>{q1.q1_unsatisfactory}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Faculty preparation for lectures ...</td>
                   <td>{q2.q2_Excellent}</td>
                   <td>{q2.q2_Good}</td>
                   <td>{q2.q2_Satisfactory}</td>
                   <td>{q2.q2_unsatisfactory}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Communication and presentation skills ...</td>
                  <td>{q3.q3_Excellent}</td>
                  <td>{q3.q3_Good}</td>
                  <td>{q3.q3_Satisfactory}</td>
                  <td>{q3.q3_unsatisfactory}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Ability to clear doubts and provide guidance ...</td>
                    <td>{q4.q4_Excellent}</td>
                     <td>{q4.q4_Good}</td>
                     <td>{q4.q4_Satisfactory}</td>
                     <td>{q4.q4_unsatisfactory}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Coverage of syllabus and pace of teaching ...</td>
                    <td>{q5.q5_Excellent}</td>
                   <td>{q5.q5_Good}</td>
                  <td>{q5.q5_Satisfactory}</td>
                   <td>{q5.q5_unsatisfactory}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
