import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import './styles/layout.css';


export function Layout() {
  const { user, logout } = useAuth();
  const { cartItems, calcularCarrito } = useCart();


  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('title', search);
    navigate(`${location.pathname}?${queryParams}`);
  };

  return (
    <div id="content">
      <nav>
        <ul className="ul_navbar">
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
                <button onClick={logout}>Logout</button>
              </li>
              <li>
                <Link to="/cart-detail">
                  <div className="carrito_info">
                    <span role="img" arial-label="Carrito de Compras">
                      🛒
                      <p>Productos en el carrito: {cartItems.length}</p> </span>
                  </div>
                </Link>
                <div className="carrito_suma">
                  <p>Suma Total: ${calcularCarrito().toFixed(2)}</p>
                </div>
              </li>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={handleSearchChange}
                />
                <button type="submit">Buscar</button>
              </form>

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
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={handleSearchChange}
                />
                <button type="submit">Buscar</button>
              </form>

            </>
          )}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div >
  )
};