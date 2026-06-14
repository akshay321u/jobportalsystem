import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, {
  scheduleInterview,
} from "../services/userService";

export default function Applicants() {

  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  // INTERVIEW STATES
  const [showInterviewModal, setShowInterviewModal] =
    useState(false);

  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  const [interviewData, setInterviewData] =
    useState({
      interviewDate: "",
      interviewTime: "",
      meetingLink: "",
    });

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  // FETCH APPLICANTS
  const fetchApplicants = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/applications/job/${jobId}`
      );

      console.log("Applicants:", res.data);

      setApplicants(res.data || []);

    } catch (err) {

      console.error(
        "Failed to load applicants:",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      setUpdatingId(applicationId);

      const res = await API.put(
        `/applications/${applicationId}/status?status=${status}`
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                status: res.data.status,
              }
            : app
        )
      );

    } catch (err) {

      console.error(
        "Failed to update status:",
        err
      );

      alert(
        "Failed to update application status"
      );

    } finally {

      setUpdatingId(null);
    }
  };

  // OPEN INTERVIEW MODAL
  const openInterviewModal = (applicant) => {

    setSelectedApplicant(applicant);

    setShowInterviewModal(true);
  };

  // SCHEDULE INTERVIEW
  const handleScheduleInterview = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      await scheduleInterview({

        applicationId:
          selectedApplicant.id,

        employerId:
          currentUser.id,

        userId:
          selectedApplicant.userId,

        jobTitle: `Job #${jobId}`,

        interviewDate:
          interviewData.interviewDate,

        interviewTime:
          interviewData.interviewTime,

        meetingLink:
          interviewData.meetingLink,
      });

      alert("Interview Scheduled");

      setShowInterviewModal(false);

      setInterviewData({
        interviewDate: "",
        interviewTime: "",
        meetingLink: "",
      });

    } catch (err) {

      console.error(err);

      alert(
        "Failed to schedule interview"
      );
    }
  };

  if (loading) {

    return (
      <div className="container">
        <p>Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="container">

      <h2>
        Applicants for Job #{jobId}
      </h2>

      {applicants.length === 0 ? (

        <p>No applicants found.</p>

      ) : (

        applicants.map((app) => (

          <div
            key={app.id}
            className="card"
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >

            <p>
              <strong>
                Application ID:
              </strong>{" "}
              {app.id}
            </p>

            <p>
              <strong>User ID:</strong>{" "}
              {app.userId}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    app.status === "ACCEPTED"
                      ? "green"
                      : app.status ===
                        "REJECTED"
                      ? "red"
                      : "orange",
                }}
              >
                {app.status}
              </span>
            </p>

            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </p>

            <p>
              <strong>
                Cover Letter:
              </strong>{" "}
              {app.coverLetter}
            </p>

            {/* ACTION BUTTONS */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >

              {app.status === "APPLIED" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(
                        app.id,
                        "ACCEPTED"
                      )
                    }
                    disabled={
                      updatingId === app.id
                    }
                    style={{
                      backgroundColor:
                        "green",
                      color: "white",
                      border: "none",
                      padding:
                        "8px 16px",
                      borderRadius:
                        "6px",
                      cursor: "pointer",
                    }}
                  >
                    {updatingId === app.id
                      ? "Updating..."
                      : "Accept"}
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        app.id,
                        "REJECTED"
                      )
                    }
                    disabled={
                      updatingId === app.id
                    }
                    style={{
                      backgroundColor:
                        "red",
                      color: "white",
                      border: "none",
                      padding:
                        "8px 16px",
                      borderRadius:
                        "6px",
                      cursor: "pointer",
                    }}
                  >
                    {updatingId === app.id
                      ? "Updating..."
                      : "Reject"}
                  </button>
                </>
              )}

              {/* INTERVIEW BUTTON */}
              <button
                onClick={() =>
                  openInterviewModal(app)
                }
                style={{
                  backgroundColor:
                    "#2563eb",
                  color: "white",
                  border: "none",
                  padding:
                    "8px 16px",
                  borderRadius:
                    "6px",
                  cursor: "pointer",
                }}
              >
                Schedule Interview
              </button>
            </div>
          </div>
        ))
      )}

      {/* INTERVIEW MODAL */}
      {showInterviewModal && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >

          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "10px",
              width: "400px",
            }}
          >

            <h2>
              Schedule Interview
            </h2>

            <input
              type="date"
              value={
                interviewData.interviewDate
              }
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  interviewDate:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                marginBottom: "12px",
                padding: "10px",
              }}
            />

            <input
              type="time"
              value={
                interviewData.interviewTime
              }
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  interviewTime:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                marginBottom: "12px",
                padding: "10px",
              }}
            />

            <input
              type="text"
              placeholder="Meeting Link"
              value={
                interviewData.meetingLink
              }
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  meetingLink:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                marginBottom: "12px",
                padding: "10px",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                onClick={
                  handleScheduleInterview
                }
              >
                Confirm
              </button>

              <button
                onClick={() =>
                  setShowInterviewModal(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}