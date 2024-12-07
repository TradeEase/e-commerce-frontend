import React from "react";
import { Navigate, useLocation } from "react-router-dom";



// Fetch token from localStorage
export const fetchToken = () => {
    
  return localStorage.getItem("token");
};

// Protect routes by checking the presence of the token
export function RequireToken({ children }) {
  const auth = fetchToken();
  console.log("Auth:", auth);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/Login" state={{ from: location }} />;
  }

  return <>{children}</>;
}
