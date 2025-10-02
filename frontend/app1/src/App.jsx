import { ToastContainer } from "react-toastify";
import AdminLogin from "./pages/adminlogin/adminlogin";
import CocoLogin from "./pages/cocologin/cocologin";
import StudentLogin from "./pages/Studentlogin/studentlogin";
import TeacherLogin from "./pages/teacherlogin/teacherlogin";
import { Route, Routes } from "react-router-dom";
import CocoRegister from "./pages/cocoregister/cocoregister";
import StudentDashboard from "./pages/StudentDashboard/dashboard";
import StudentRegister from "./pages/studentregister/StudentRegister";
import TeacherDashboard from "./pages/teacherDashboard/dasboard";
import TeacherRegister from "./pages/teacherRegister/teacherRegister";
import CocoDashboard from "./pages/CocoDashboard/CocoDashboard"
import CocoStudentFeedback from "./pages/cocostudentfeedack/CocoStudentFeedback";
import CreateFeedback from "./pages/createfeedback/CreateFeedback";
import AdminDashboard from "./pages/AdminDashboard/adminDashboard"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/cocologin" element={<CocoLogin />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/studentregister" element={<StudentRegister />} />
        <Route path="/teacherRegister" element={<TeacherRegister />} />
        <Route path="/cocoregister" element={<CocoRegister />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/CocoDashboard" element={<CocoDashboard />} />
        <Route path="/CocoStudentFeedbackStatus" element={<CocoStudentFeedback/>}/>
        <Route path='/students/:id' element={<CocoStudentFeedback/>}/>
        <Route path="/CreateFeedback" element={<CreateFeedback/>}/>
        <Route path ="/admindashboard" element={<AdminDashboard/>} />



       
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
