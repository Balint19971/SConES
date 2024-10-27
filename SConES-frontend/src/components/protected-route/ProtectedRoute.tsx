import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

interface ProtectedRouteProps {
  roles: string[];
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, element }) => {
  const { userRole } = useAuth();
  const location = useLocation();
  const localStorageUserRole = localStorage.getItem("userRole");
  console.log("User role:", localStorageUserRole);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  if (!roles.includes(localStorageUserRole || "")) {
    // console.log("User role:", localStorageUserRole);
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
