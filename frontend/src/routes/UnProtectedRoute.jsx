import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((state) => state.auth);

  if (!authUser) return children;

  return <Navigate to={"/"} />;
};

export default UnProtectedRoute;
