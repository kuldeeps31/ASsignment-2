import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // ✅ Not logged in: redirect to "/"
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;
