import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import ProductCarousel from './ProductCarousel';
import NewsSection from './NewsSection';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://backend-gamma-three-88.vercel.app/api';
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) throw new Error('Error al obtener datos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtrado
  const filteredProducts = products.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const miLista = filteredProducts.filter(p => p.category === "Mi lista");
  const tendencias = filteredProducts.filter(p => p.category === "Tendencias");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  if (loading) {
    return <div className="text-center text-white mt-5">Cargando...</div>;
  }

  return (
    <div className="min-vh-100 w-100 d-flex flex-column" style={{ background: 'linear-gradient(#08AEEA, #2AF598)' }}>
      <Header /> 
      
      {/* SECCIÓN DEL BUSCADOR CORREGIDA */}
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            {/* Título Grande y Centrado */}
            <h1 className="text-white fw-bold mb-4" style={{ fontSize: '3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
              ¿Qué quieres comprar hoy?
            </h1>
            
            {/* Barra de búsqueda estilizada */}
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control form-control-lg rounded-pill shadow-lg border-0 ps-4 py-3" 
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ fontSize: '1.2rem', color: '#333' }}
              />
              <button 
                className="btn position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle btn-success"
                style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <i className="fas fa-search text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow-1">
        <ProductCarousel title="Mi lista" products={miLista} />
        <ProductCarousel title="Tendencias" products={tendencias} />
      </div>

      <NewsSection />
      <Footer />
    </div>
  );
};

export default HomePage;