import { useState } from "react";
import API from "../services/userService";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    location: "",
    skills: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await API.post("/auth/register", user);

      setMessage("Registration successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      console.log(err);
      setMessage("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      
      <select name="role" onChange={handleChange}>
        <option value="USER">Job Seeker</option>
        <option value="EMPLOYER">Employer</option>
      </select>

     
      <input
        type="text"
        name="location"
        placeholder="Location (e.g. Bangalore)"
        onChange={handleChange}
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (e.g. Java, React)"
        onChange={handleChange}
      />

      
      <button
        type="submit"
        disabled={loading}
        style={{
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: message.includes("successful") ? "green" : "red"
          }}
        >
          {message}
        </p>
      )}

    </form>
  );
}

export default RegisterForm;