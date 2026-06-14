// src/components/JobCard.jsx
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  // Prevent crash if job is undefined
  if (!job) {
    return null;
  }

  const handleApply = async (e) => {
    e.stopPropagation();

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      if (!currentUser) {
        alert("Please login first");
        return;
      }

      // Make sure user id exists
      if (!currentUser.id) {
        alert("User ID not found. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:7777/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            jobId: job.id,
            userId: currentUser.id,
            resumeUrl: "Resume Uploaded"
          })
        }
      );

      if (response.ok) {
        alert("Applied Successfully!");
      } else {
        const errorText = await response.text();
        console.log("Application Error:", errorText);
        alert("Application Failed");
      }
    } catch (error) {
      console.log("Application Error:", error);
      alert("Application Failed");
    }
  };

  return (
    <div
      className="job-card"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      {/* HEADER */}
      <div className="job-header">
        <div className="company-logo">
          {job.company?.charAt(0) || "J"}
        </div>

        <div>
          <h3>{job.title || "No Title"}</h3>
          <p className="company">
            {job.company || "No Company"}
          </p>
        </div>
      </div>

      {/* INFO */}
      <div className="job-info">
        <span>
          📍 {job.location || "Location not specified"}
        </span>

        <span>
          💰 ₹{job.salary || 0}
        </span>
      </div>

      {/* FOOTER */}
      <div className="job-footer">
        <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/apply/${job.id}`);
  }}
>
  Apply Now
</button>
      </div>
    </div>
  );
}

export default JobCard;