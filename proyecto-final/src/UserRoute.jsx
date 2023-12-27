import React, { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "./AuthContext";

export function UserRoute({ children }) {
  const { user } = useContext(AuthContext);
  const currentLocation = useLocation();
  let from = currentLocation.state?.from?.pathname || '/';

  const EstaLogueado = user !== null;
  console.log(currentLocation);

  return EstaLogueado ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: currentLocation }} replace />
  );
}