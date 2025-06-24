import { Navigate } from "react-router-dom";
//import { JSX } from "react";
//import { JSX } from "react/jsx-runtime";
import type { ReactElement } from "react";


const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    //  Not logged in: redirect to "/"
    return <Navigate to="/" replace />;
  }

  //  Logged in
  return children;
};

export default ProtectedRoute;
