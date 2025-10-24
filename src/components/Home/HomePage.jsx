// src/components/Home/HomePage.jsx
import React, { useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import ProductCarousel from './ProductCarousel';
import NewsSection from './NewsSection';
import { allProducts } from '../../utils/productsData';

//comando pa que funcione todo node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install

/**
 * @function HomePage
 * @description Componente principal de la página de inicio con Bootstrap.
 * Contiene el Header, la sección principal de búsqueda, los carruseles y el Footer.
 */
const HomePage = () => {
  // Estado para el input de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtramos los productos por categoría
  const miLista = allProducts.filter(p => p.category === "Mi lista");
  const tendencias = allProducts.filter(p => p.category === "Tendencias");

  // Manejador para la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Lógica futura: podrías filtrar los productos de los carruseles aquí
  };

  return (
    <div className="min-vh-100 w-100" style={{ background: 'linear-gradient(#08AEEA, #2AF598)', width: '100vw' }}>
      {/* Header */}
      <Header /> 
      
      {/* Sección principal de búsqueda */}
      <div className="w-100 my-5 px-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-center text-white">
              <h2 className="display-4 mb-4">¿Qué quieres comprar hoy?</h2>
              <div className="input-group input-group-lg">
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    border: '2px solid white',
                    color: 'white'
                  }}
                />
                <button className="btn btn-success btn-lg" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carruseles de productos */}
      <div className="flex-grow-1">
        <ProductCarousel title="Mi lista" products={miLista} />
        <ProductCarousel title="Tendencias" products={tendencias} />
      </div>

      {/* Sección de noticias */}
      <NewsSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;