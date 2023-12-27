import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const agregarAlCarrito = (product) => {
    const newItem = { ...product, key: uuidv4() };
    setCartItems((prevItems) => [...prevItems, newItem]);
};

const eliminarDelCarrito = (key) => {
  console.log('Eliminando elemento con clave:', key);
  setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
};

  const limpiarCarrito = () => {
    setCartItems([]);
  };

  const calcularCarrito = () => {
    return cartItems.reduce ((acumulador, item) => acumulador + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito, calcularCarrito }}>
      {children}
    </CartContext.Provider>
  );
};