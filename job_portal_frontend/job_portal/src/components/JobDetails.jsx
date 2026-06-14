import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/userService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      setLoading(true);

      await API.post(`/applications/${id}`);

      setApplied(true);

    } catch (err) {
      if (err.response?.status === 409) {
        setApplied(true);
        alert("Already applied");
      } else {
        alert("Failed to apply");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <div className="card">

        <h2>{job.title}</h2>
        <p>{job.company}</p>
        <p>{job.description}</p>

        <button
          onClick={handleApply}
          disabled={loading || applied}
          style={{
            background: applied ? "green" : "#2563eb"
          }}
        >
          {applied
            ? "Applied ✔"
            : loading
            ? "Applying..."
            : "Apply Now"}
        </button>

      </div>
    </div>
  );
}

export default JobDetails;