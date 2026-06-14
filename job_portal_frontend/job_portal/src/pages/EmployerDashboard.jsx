import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/userService";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/jobs");
      
      
      setJobs(res.data);

    } catch (err) {
      console.log(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading your posted jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">

     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2>Employer Dashboard</h2>

        <button onClick={() => navigate("/add-job")}>
          + Post New Job
        </button>
      </div>

      
      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>
          <h3>No jobs posted yet</h3>
          <p>Start hiring by posting your first job.</p>

          <button onClick={() => navigate("/add-job")}>
            Post Job
          </button>
        </div>
      ) : (
        jobs.map((job) => (
          <div
            className="card"
            key={job.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <div>
              <h3>{job.title}</h3>
              <p style={{ color: "#64748b" }}>{job.company}</p>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: "10px" }}>

              <button
                onClick={() => navigate(`/employer/jobs/${job.id}/applicants`)}
                style={{ background: "#3b82f6" }}
              >
                View
              </button>
              {/* Add this Delete button inside your EmployerJobs.jsx card */}

<button
  onClick={async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/jobs/${job.id}`);

     
      setJobs((prevJobs) =>
        prevJobs.filter((j) => j.id !== job.id)
      );

      alert("Job deleted successfully");
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Failed to delete job");
    }
  }}
  style={{
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  Delete
</button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default EmployerDashboard;