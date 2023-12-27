import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';


export function Layout() {
  const { user, logout } = useAuth();
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
                <Link to="/cart-detail"> Carrito </Link>
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