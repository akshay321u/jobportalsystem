import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("currentUser"));


  if (!token) {
    return <Navigate to="/login" />;
  }

 
  if (allowedRoles && user?.role) {
    const hasAccess = allowedRoles.includes(user.role);

    if (!hasAccess) {
      return (
        <div className="container">
          <h2>403 - Unauthorized Access</h2>
          <p>You don't have permission to view this page.</p>
        </div>
      );
    }
  }


  return children;
};