import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const { currentUser, userDetails, isLoading } = useAuthContext();
  // if (isLoading) return <h1>Loading...</h1>
  return (
    // userDetails?.roles?.find(role => allowedRoles?.includes(role))
    currentUser
      ? <Outlet />
      // : currentUser
      //   ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;