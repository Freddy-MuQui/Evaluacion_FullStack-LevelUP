// src/components/Home/ProductCarousel.jsx
import React from 'react';
import { useCart } from '../../hooks/useCart';

/**
 * @function ProductCarousel
 * @description Muestra un carrusel de productos. Componente atómico/molécula de la interfaz.
 * @param {object} props
 * @param {string} props.title - Título del carrusel (ej. "Tendencias").
 * @param {Array<object>} props.products - Lista de productos a mostrar.
 */
const ProductCarousel = ({ title, products }) => {
  // Obtenemos la función para añadir al carrito del hook personalizado
  const { addProductToCart, formatoMoneda } = useCart();
  
  if (!products || products.length === 0) {
    return <h2 className="categories__title">{title} (No hay productos disponibles)</h2>;
  }

  // Generamos el identificador del carrusel basado en el título
  const carouselId = title.toLowerCase().replace(/\s/g, '-') + '-carousel';

  return (
    <React.Fragment>
      <h2 className="categories__title">{title}</h2>
      {/* La clase 'carousel' y 'carousel__container' usan estilos de estilos.css */}
      <section className="carousel">
        <div className="carousel__container" id={carouselId}>
          {products.map((product) => {
            const isPurchasable = product.precio > 0;
            
            // Cada producto es un "átomo" o "molécula" de la metodología Atomic Design [cite: 36, 39]
            return (
              <div className="carousel-item" key={product.id + '-' + title}>
                <img className="carousel-item__img" src={product.imagen} alt={product.nombre} />
                <div className="carousel-item__details">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    {/* Icono de Play */}
                    <img className="carousel-item__details--img" src="Imagenes/play-icon.png" alt="Play Icon" />
                    
                    {/* Botón de Añadir al Carrito (solo si es comprable) */}
                    {isPurchasable && (
                      <button 
                        className="add-to-cart-btn" 
                        aria-label={`Agregar ${product.nombre} al carrito`} 
                        onClick={() => addProductToCart(product)}
                      >
                        <img src="Imagenes/plus-icon.png" alt="Plus Icon" />
                      </button>
                    )}
                  </div>
                  <p className="carousel-item__details--title">{product.nombre}</p>
                  <p className="carousel-item__details--subtitle">{product.descripcion}</p>
                  {isPurchasable && (
                    <p className="carousel-item__details--price">
                      {formatoMoneda(product.precio)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductCarousel;