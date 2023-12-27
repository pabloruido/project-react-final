import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';





export const Products = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [errorCargaAPI, setErrorCargaAPI] = useState(false);
    const { user } = useAuth();
    const { agregarAlCarrito } = useCart();
    

    const fetchProductos = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products')
            if (!response.ok) {
                throw new Error('La carga ha fallado. Intente nuevamente')
            }
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
            setErrorCargaAPI(true);
        }
    }

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div>
            {errorCargaAPI && <p>{error}</p>}
            <h1> - Productos - </h1>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        <p>{producto.title}</p>
                        <img
                            src={producto.images}
                            alt={`Imagen de ${producto.title}`} />
                        <p>Precio: ${producto.price}</p>
                        <p>Descripción y caracteristicas {producto.description}</p>
                        <p>Categoria: {producto.category.name}</p>
                        <Link to={`/products/${producto.id}`}>Ver detalles. </Link>
                        {user?.role === 'admin' ? (
                            <Link to="/products/addproduct">
                                <button>Cargar nuevo producto </button>
                            </Link>) : ("")}
                        {user !== null ? (
                            <button onClick={() => agregarAlCarrito(producto)}>
                                Agregar producto al carrito
                            </button>
                        ) : (
                            <button>
                                <Link to={'/login'}> Debes estar logueado para comprar </Link>
                            </button>
                        )}
                        <hr></hr>

                    </li>
                )
                )}
            </ul>
        </div>
    )

};





