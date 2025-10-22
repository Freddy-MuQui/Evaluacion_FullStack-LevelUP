// src/components/Home/HomePage.jsx
import React, { useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import ProductCarousel from './ProductCarousel';
import NewsSection from './NewsSection';
import { allProducts } from '../../utils/productsData';
// Se importa el CSS principal
import '../../styles/estilos.css'; 

/**
 * @function HomePage
 * @description Componente principal de la página de inicio (Migración de Master_v2.html).
 * Contiene el Header, la sección principal de búsqueda, los carruseles y el Footer.
 */
const HomePage = () => {
  // 1. Estado para el input de búsqueda (gestionando el estado del componente) [cite: 1172]
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. Filtramos los productos por categoría
  const miLista = allProducts.filter(p => p.category === "Mi lista");
  const tendencias = allProducts.filter(p => p.category === "Tendencias");

  // 3. Manejador para la búsqueda (ejemplo, no se usa en el carrusel en este ejemplo, pero se prepara)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Lógica futura: podrías filtrar los productos de los carruseles aquí
  };

  return (
    // Estructura de página con Header y Footer reutilizables
    <div className="App-container">
      
      {/* 2. VERIFICAR: Que el Header y la sección principal se carguen */}
      <Header /> 
      
      <section className="main">
        <h2 className="main__title">¿Qué quieres comprar hoy?</h2>
        <input 
          type="text" 
          className="input1" 
          placeholder="Buscar..."
          // ... (Props de estado y manejo de cambios)
        />
      </section>

      {/* 3. VERIFICAR: Que los carruseles estén llamando al componente */}
      <ProductCarousel title="Mi lista" products={miLista} />
      <ProductCarousel title="Productos" products={tendencias} />

      <NewsSection />
      
      <Footer />
    </div>
  );
};

export default HomePage;