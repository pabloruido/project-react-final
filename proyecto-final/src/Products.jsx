import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




export const Products = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [errorCargaAPI, setErrorCargaAPI] = useState(false);

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
                        <Link to={`/products/${producto.id}`}>Ver detalles</Link>
                        <Link to="/products/addproduct">
                        <button>Agregar producto </button>
                        </Link>
                        
                    </li>
                )
                )}
            </ul>
        </div>
    )

};





