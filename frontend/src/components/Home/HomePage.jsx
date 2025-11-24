// src/components/Home/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import ProductCarousel from './ProductCarousel';
import NewsSection from './NewsSection';
// Se importa el CSS principal
import '../../styles/estilos.css'; 

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. Estado para guardar los productos que vienen de la API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar "Cargando..."

  console.log("URL de la API:", process.env.REACT_APP_API_URL);
  console.log("Estado de productos:", products);

  // 2. useEffect para llamar a la API al cargar la página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Usamos la variable de entorno
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        if (!response.ok) throw new Error('Error al obtener datos');
        const data = await response.json();
        setProducts(data); // Guardamos los datos de Azure en el estado
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 3. Filtramos los productos del ESTADO (no del archivo)
  // Nota: Asegúrate que en tu BD las categorías sean exactas ("Mi lista", "Tendencias")
  const miLista = products.filter(p => p.category === "Mi lista");
  const tendencias = products.filter(p => p.category === "Tendencias");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Cargando productos desde Azure... ☁️</div>;
  }

  return (
    <div className="App-container">
      <Header /> 
      
      <section className="main">
        <h2 className="main__title">¿Qué quieres comprar hoy?</h2>
        <input 
          type="text" 
          className="input1" 
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </section>

      {/* Pasamos los productos cargados dinámicamente */}
      <ProductCarousel title="Mi lista" products={miLista} />
      <ProductCarousel title="Productos" products={tendencias} />

      <NewsSection />
      
      <Footer />
    </div>
  );
};

export default HomePage;