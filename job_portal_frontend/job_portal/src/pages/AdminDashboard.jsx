import { useEffect, useState } from "react";
import API from "../services/userService";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
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

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading admin dashboard...</p>
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

      <h2>Admin Dashboard</h2>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
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

            
            <button
              onClick={() => handleDelete(job.id)}
              style={{
                background: "#ef4444"
              }}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default AdminDashboard;