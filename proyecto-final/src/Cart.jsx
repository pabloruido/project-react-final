import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const Cart = () => {
  const { user } = useContext(AuthContext);

  console.log("Nombre del usuario:", user ? user.name : "No disponible");
  console.log("Rol del usuario:", user ? user.role : "No disponible");

 
};

export default Cart;