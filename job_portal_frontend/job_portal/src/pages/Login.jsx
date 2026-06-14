import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="auth-container">

      <div className="auth-card">

      
        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">
          Login to access jobs, apply and manage your profile
        </p>

       
        <LoginForm />

        
        <div style={{ marginTop: "15px", textAlign: "center" }}>

          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Don’t have an account?
          </p>

          <Link
            to="/register"
            style={{
              color: "#2563eb",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;