import { useState } from "react";
import API from "../services/userService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", user);

      const { id,token, role } = response.data;

     
      localStorage.setItem("token", token);
      console.log("TOKEN RECEIVED:", token);

console.log("TOKEN SAVED:", localStorage.getItem("token"));

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id,
          email: user.email,
          role: role
        })
      );

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "EMPLOYER") {
        navigate("/employer");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* EMAIL */}
      <input
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
        required
      />

      {/* PASSWORD */}
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        onChange={handleChange}
        required
      />

      {/* ERROR UI (cleaner) */}
      {error && (
        <p style={{
          color: "#ef4444",
          fontSize: "14px",
          marginTop: "8px"
        }}>
          {error}
        </p>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>
  );
}

export default LoginForm;