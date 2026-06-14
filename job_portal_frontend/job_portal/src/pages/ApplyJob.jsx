import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/userService";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [form, setForm] = useState({
    resumeUrl: "",
    coverLetter: ""
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

   const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load job details");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser?.id) {
      alert("Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await API.post("/applications", {
        jobId: Number(id),
        userId: currentUser.id,
        resumeUrl: form.resumeUrl,
        coverLetter: form.coverLetter
      });

      alert("Application submitted successfully!");
      navigate("/jobs");
        } catch (err) {
      console.error(err);
      alert("Application failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container">
        <p>Job not found.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "700px", margin: "40px auto" }}>
        <h2>Apply for {job.title}</h2>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          {job.company} • {job.location}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Resume URL</label>
          <input
            type="text"
            name="resumeUrl"
            placeholder="Paste your resume link"
       value={form.resumeUrl}
            onChange={handleChange}
            required
          />

          <label>Cover Letter</label>
          <textarea
            name="coverLetter"
            placeholder="Write a short cover letter"
            rows="6"
            value={form.coverLetter}
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <button
              type="button"
              className="secondary-btn"
                onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;