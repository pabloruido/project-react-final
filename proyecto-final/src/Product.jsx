import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


export const Product = () => {
    const params = useParams();
    const [producto, setProducto] = useState (null);
    const [error, setError] = useState(null);

    const fetchProductoById = async () => {
         try {
             const response = await fetch (`https://api.escuelajs.co/api/v1/products/${params.productId}`);
             if (!response.ok) {
                 throw new Error ( 'la carga ha fallado. Intente nuevamente ');
             }
             const data = await response.json();
             setProducto (data);
         } catch (error) {
            setError(error.message);
             console.error (error);
         }
        };


    useEffect(() => {
        fetchProductoById ();
    }, [params.productId]);

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <Link to={`/`}>Volver al inicio</Link>
            </div>
        );
    }

    if (!producto) {
        return (
            <div>
                <p>Cargando...</p>
                <Link to={`/`}>Volver al inicio</Link>
            </div>
        );
    }

    console.log(producto.category.id)
    
    return (
        <div>
            <h1>Producto: {producto.title} </h1>
            <img 
            src= {producto.images} alt= {`Imagen de ${producto.title}`} />
            <p>Precio: ${producto.price} de contado efectivo </p>
            <p>Descripción { producto.description } </p>
            <p>Categoria: { producto.category.name } </p>
            <button>
            <Link to={`/products/updateproduct/${producto.id}`}>Actualizar Producto</Link>
            <br />
            <Link to={`/products/deleteproduct/${producto.id}`}>Eliminar Producto</Link>
            </button>
            
        </div>
    )
}