import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import JobDetails from "./components/JobDetails";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import AddJob from "./pages/AddJob";
import ApplyJob from "./pages/ApplyJob";
import Applicants from "./pages/Applicants";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MyApplications from "./pages/MyApplication";
import Notifications from "./components/Notifications";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

       
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/employer/jobs/:jobId/applicants" element={<Applicants />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/notifications" element={<Notifications />} />
       
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["USER", "EMPLOYER", "ADMIN"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/employer"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-job"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="*"
          element={
            <div className="container">
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;