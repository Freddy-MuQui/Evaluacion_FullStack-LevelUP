// src/components/Home/ProductCarousel.jsx
import React, { useState, useRef } from 'react';
import { useCart } from '../../hooks/useCart';

/**
 * @function ProductCarousel
 * @description Carrusel dinámico donde los productos aparecen al deslizar.
 * @param {object} props
 * @param {string} props.title - Título del carrusel (ej. "Tendencias").
 * @param {Array<object>} props.products - Lista de productos a mostrar.
 */
const ProductCarousel = ({ title, products }) => {
  const { addProductToCart, formatoMoneda } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const productsPerView = 4; // Número de productos visibles a la vez

  if (!products || products.length === 0) {
    return (
      <div className="w-100 my-4 px-4">
        <h2 className="text-white mb-3">{title} (No hay productos disponibles)</h2>
      </div>
    );
  }

  const handleScroll = (e) => {
    if (isScrolling) return;
    setIsScrolling(true);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const container = e.target;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollPercentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const newIndex = scrollPercentage * (products.length - productsPerView);
      setCurrentIndex(Math.max(0, Math.min(newIndex, products.length - productsPerView)));
      setIsScrolling(false);
    }, 100);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-100 my-4">
      <h2 className="text-white mb-3 px-4">{title}</h2>
      {/* Carrusel dinámico */}
      <div className="position-relative">
        {/* Contenedor deslizante */}
        <div
          ref={scrollContainerRef}
          className="d-flex overflow-x-auto scrollbar-hide carousel-netflix"
          style={{
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
          onScroll={handleScroll}
        >
          <div className="d-flex gap-3" style={{ minWidth: 'max-content' }}>
            {products.map((product, index) => {
              const isPurchasable = product.precio > 0;
              return (
                <div
                  key={product + '-' + title}
                  className="flex-shrink-0"
                  style={{
                    width: '300px'
                  }}
                >
                  <div className="card bg-dark text-white h-100 product-card" style={{ width: '300px' }}>
                    {/* Imagen del producto */}
                    <div className="position-relative">
                      <img
                        src={product.imagen}
                        className="card-img-top"
                        alt={product.nombre}
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                      {/* Botones de acción sobre la imagen */}
                      <div className="position-absolute top-0 end-0 p-2">
                        <div className="d-flex gap-2">
                          {isPurchasable && (
                            <button
                              className="btn btn-success btn-sm rounded-circle"
                              style={{ width: '35px', height: '35px' }}
                              title="Añadir al carrito"
                              onClick={() => addProductToCart(product)}
                            >
                              <img src="Imagenes/plus-icon.png" alt="Add" width="16" height="16" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Contenido de la tarjeta */}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.nombre}</h5>
                      <p
                        className="card-text text-white small flex-grow-1"
                        style={{ fontSize: '0.85rem', lineHeight: 1.3, whiteSpace: 'pre-line' }}
                      >
                        {product.descripcion}
                      </p>
                      {isPurchasable && (
                        <div className="mt-auto">
                          <p className="card-text text-success fw-bold">
                            {formatoMoneda(product.precio)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Controles de navegación */}
        <button
          className="btn carousel-nav-btn position-absolute top-50 start-0 translate-middle-y"
          onClick={scrollLeft}
          style={{
            zIndex: 10,
            left: '8px'
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="btn carousel-nav-btn position-absolute top-50 end-0 translate-middle-y"
          onClick={scrollRight}
          style={{
            zIndex: 10,
            right: '8px'
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
