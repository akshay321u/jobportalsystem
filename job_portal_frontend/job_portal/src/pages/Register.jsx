import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-container">

      <div className="auth-card">

      
        <h1 className="auth-title">Create Account</h1>

        <p className="auth-subtitle">
          Join the Job Portal and find your dream job or hire talent
        </p>

        
        <RegisterForm />

        
        <div style={{ marginTop: "15px", textAlign: "center" }}>

          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Already have an account?
          </p>

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Login here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;