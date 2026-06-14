


import { useEffect, useState } from "react";
import API from "../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    bio: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser) {
      setUser(savedUser);
      setForm({
        name: savedUser.name || "",
        phone: savedUser.phone || "",
        skills: savedUser.skills || "",
        bio: savedUser.bio || "",
        linkedin: savedUser.linkedin || "",
        github: savedUser.github || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const saveProfile = async () => {
    try {
      setLoading(true);

      const response = await API.put("/users/profile", {
        ...form,
        id: user.id,
      });

      const updatedUser = {
        ...user,
        ...response.data,
      };

      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

 
  const uploadProfileImage = async () => {
    if (!profileImage) {
      alert("Please select an image first");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("userId", user.id);

    try {
      setLoading(true);

      const response = await API.post(
        "/users/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...currentUser,
        ...response.data,
      };

      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setProfileImage(null);

       const input = document.getElementById("profileImageInput");
    if (input) {
      input.value = "";
    }
    
      alert("Profile picture uploaded successfully!");
    } catch (err) {
      console.error("PROFILE IMAGE ERROR:", err);
      alert("Profile image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      alert("Please select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("userId", user.id);

    try {
      setLoading(true);

      const response = await API.post(
        "/users/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...user,
        ...response.data,
      };

      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setResumeFile(null);

      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error("RESUME ERROR:", err);
      alert("Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <p>Loading profile...</p>
      </div>
    );
  }

  const imageUrl = user.profileImageUrl
    ? `http://localhost:7777${user.profileImageUrl}`
    : null;

  const initials = (form.name || user.email || "U")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="container">
      <div
        className="card"
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          overflow: "hidden",
          padding: 0,
        }}
      >
       
        <div
          style={{
            height: "180px",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          }}
        />

        <div style={{ padding: "0 40px 40px" }}>

          <div
            style={{
              marginTop: "-55px",
              position: "relative",
              display: "inline-block",
            }}
          >
            
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setProfileImage(selectedFile);
                }
              }}
            />

            <label
              htmlFor="profileImageInput"
              style={{
                cursor: "pointer",
                display: "block",
                position: "relative",
              }}
              title="Click to change profile picture"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "5px solid #fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #2563eb, #7c3aed)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    fontWeight: "700",
                    border: "5px solid #fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  {initials}
                </div>
              )}

             
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#2563eb",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  border: "2px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                📷
              </div>
            </label>

            
            {profileImage && (
              <div style={{ marginTop: "12px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  Selected: {profileImage.name}
                </p>

                <button
                  onClick={uploadProfileImage}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Save Photo"}
                </button>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: "20px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
                {form.name || "Your Name"}
              </h1>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "6px",
                }}
              >
                {user.email}
              </p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {user.role}
              </span>
            </div>

            <button
              onClick={() =>
                editing ? saveProfile() : setEditing(true)
              }
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editing
                ? "Save Profile"
                : "Edit Profile"}
            </button>
          </div>

       
          <div style={{ marginTop: "40px" }}>
            <h3>About</h3>

            {editing ? (
              <textarea
                name="bio"
                rows="4"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell recruiters about yourself..."
              />
            ) : (
              <p
                style={{
                  color: "#475569",
                  lineHeight: 1.8,
                }}
              >
                {form.bio || "No bio added yet."}
              </p>
            )}
          </div>

          
          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            <div className="card" style={{ padding: "24px" }}>
              <h3>Professional Details</h3>

              {editing ? (
                <>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                  />

                  <input
                    name="skills"
                    placeholder="Skills"
                    value={form.skills}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Phone:</strong> {form.phone || "Not added"}
                  </p>
                  <p>
                    <strong>Skills:</strong> {form.skills || "Not added"}
                  </p>
                </>
              )}
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3>Social Links</h3>

              {editing ? (
                <>
                  <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={form.linkedin}
                    onChange={handleChange}
                  />

                  <input
                    name="github"
                    placeholder="GitHub URL"
                    value={form.github}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    {form.linkedin ? (
                      <a
                        href={form.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Profile
                      </a>
                    ) : (
                      "Not added"
                    )}
                  </p>

                  <p>
                    <strong>GitHub:</strong>{" "}
                    {form.github ? (
                      <a
                        href={form.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Profile
                      </a>
                    ) : (
                      "Not added"
                    )}
                  </p>
                </>
              )}
            </div>
          </div>

         
          <div
            className="card"
            style={{
              marginTop: "32px",
              padding: "24px",
            }}
          >
            <h3>Resume</h3>

            {user.resumeUrl ? (
              <p>
                <a
                  href={`http://localhost:7777${user.resumeUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Uploaded Resume
                </a>
              </p>
            ) : (
              <p style={{ color: "#64748b" }}>
                No resume uploaded yet.
              </p>
            )}

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResumeFile(e.target.files[0])
              }
            />

            {resumeFile && (
              <p style={{ marginTop: "10px" }}>
                Selected: {resumeFile.name}
              </p>
            )}

            <button
              onClick={uploadResume}
              disabled={loading}
              style={{ marginTop: "12px" }}
            >
              {loading ? "Uploading..." : "Upload New Resume"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
