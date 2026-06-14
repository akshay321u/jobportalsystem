import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import API from "../services/userService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const unreadCount = 3;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={() => navigate("/")}>
          JobNest
        </h2>

     
        <div className="nav-links">
          <Link className={isActive("/")} to="/">
            Home
          </Link>

          <Link className={isActive("/jobs")} to="/jobs">
            Jobs
          </Link>

          {token && (
            <Link className={isActive("/profile")} to="/profile">
              Profile
            </Link>
          )}

          {token && user?.role === "USER" && (
  <Link
    className={isActive("/my-applications")}
    to="/my-applications"
  >
    My Applications
  </Link>
)}

<Link
  to="/notifications"
  style={{
    position: "relative",
    color: "grey",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  }}
>
  <Bell size={24} />

  {unreadCount > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-8px",
        right: "-10px",
        color: "grey",
        borderRadius: "50%",
        minWidth: "18px",
        height: "18px",
        fontSize: "bold"}}>

        </span>
  )}
</Link>
          {user?.role === "ADMIN" && (
            <Link className={isActive("/admin")} to="/admin">
              Admin
            </Link>
          )}

          {user?.role === "EMPLOYER" && (
            <Link className={isActive("/employer")} to="/employer">
              Dashboard
            </Link>
          )}
        </div>
      </div>

     
      <div className="nav-right">
        {!token ? (
          <div className="nav-auth">
            <Link className={isActive("/login")} to="/login">
              Login
            </Link>

            <Link className={isActive("/register")} to="/register">
              Register
            </Link>
          </div>
        ) : (
          <div className="nav-user">
            {user && (
              <span className="user-tag">
                {user.email?.split("@")[0]}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;