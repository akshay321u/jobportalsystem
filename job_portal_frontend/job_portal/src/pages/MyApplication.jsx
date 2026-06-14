import { useEffect, useState } from "react";
import API from "../services/userService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (user?.id) {
      fetchMyApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/applications/user/${user.id}`);

      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      alert("Failed to load your applications.");
    } finally {
      setLoading(false);
    }
  };

  
  const formatSalary = (salary) => {
    if (!salary) return "Not disclosed";
    return `₹${salary.toLocaleString()}`;
  };

  
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "ACCEPTED":
        return "#16a34a";
      case "REJECTED":
        return "#dc2626";
      default:
        return "#2563eb";
    }
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading your applications...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <p>Please login to view your applications.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          My Applications
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "32px",
          }}
        >
          Track all jobs you have applied for.
        </p>

        {applications.length === 0 ? (
          <div className="card" style={{ padding: "32px" }}>
            <p
              style={{
                color: "#64748b",
                margin: 0,
              }}
            >
              You have not applied to any jobs yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "24px",
            }}
          >
            {applications.map((app) => (
              <div
                className="card"
                key={app.id}
                style={{
                  padding: "28px",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "24px",
                        fontWeight: "700",
                      }}
                    >
                      {app.jobTitle || `Job #${app.jobId}`}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "15px",
                      }}
                    >
                      {app.company || "Company not available"}
                    </p>
                  </div>

                  <span
                    style={{
                      background: `${getStatusColor(app.status)}15`,
                      color: getStatusColor(app.status),
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {app.status || "APPLIED"}
                  </span>
                </div>

                
                <div
                  style={{
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <strong>Location:</strong>
                    <br />
                    {app.location || "Not specified"}
                  </div>

                  <div>
                    <strong>Salary:</strong>
                    <br />
                    {formatSalary(app.salary)}
                  </div>

                  <div>
                    <strong>Applied On:</strong>
                    <br />
                    {app.appliedDate || "N/A"}
                  </div>
                </div>

                
                <div style={{ marginTop: "20px" }}>
                  <strong>Resume:</strong>{" "}
                  {app.resumeUrl ? (
                    <a
                      href={`http://localhost:7777${app.resumeUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resume
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;