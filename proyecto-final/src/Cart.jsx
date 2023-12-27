import React from 'react';
import { useCart } from './CartContext';

export const Cart = () => {
  const { cartItems, eliminarDelCarrito, limpiarCarrito } = useCart();

  return (
    <div>
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={limpiarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

