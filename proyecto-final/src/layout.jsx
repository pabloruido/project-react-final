import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';


export function Layout() {
  const { user, logout } = useAuth();
  const { cartItems, calcularCarrito } = useCart();

  

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/categories"> Categorias </Link>
              </li>
              <li>
                <Link to="/products"> Productos </Link>
              </li>
              <li>
                <Link to="/cart-detail"> 
                <div>
                  <span role="img" arial-label="Carrito de Compras">
                    🛒
                    </span>
                    <p>Productos en el carrito: {cartItems.length}</p>
                </div>
                </Link>
                <div>
                  <p>Suma Total: ${calcularCarrito().toFixed(2)}</p>
                </div>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login"> Inicia sesión </Link>
              </li>
              <li>
                <Link to="/register"> Registrate </Link>
              </li>
              <li>
                <Link to="/categories"> Categorias </Link>
              </li>
              <li>
                <Link to="/products"> Productos </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div >
  )
};