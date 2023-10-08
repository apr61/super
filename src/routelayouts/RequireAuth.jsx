import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

function RequireAuth() {
  const location = useLocation();
  const { currentUser, isLoading } = useAuthContext();
  if (isLoading) return <Loader />
  return (
    // userDetails?.roles?.find(role => allowedRoles?.includes(role))
    currentUser
      ? <Outlet />
      // : currentUser
        // ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;