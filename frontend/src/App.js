// src/App.jsx (o App.js)
import React from 'react';
// Importamos el Router para la navegación entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importamos los componentes de página
import HomePage from './components/Home/HomePage';
import CartPage from './components/Cart/CartPage';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';

/**
 * @function App
 * @description Componente principal de la aplicación.
 * Configura el enrutamiento (routing) de la aplicación de una sola página (SPA).
 */
const App = () => {
  return (
    // <Router> permite al usuario navegar en la aplicación SPA
    <Router>
      <div className="App">
        {/* <Routes> contiene todas las definiciones de rutas de la aplicación */}
        <Routes>
          {/* Ruta de la página principal (Home) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta de la página del Carrito */}
          <Route path="/carrito" element={<CartPage />} />
          
          {/* Ruta de la página de Registro de Usuario */}
          <Route path="/registro" element={<RegisterPage />} />

          {/* Ruta de la página de Inicio de Usuario */}
          <Route path="/login" element={<LoginPage />} />

          {/* Puedes añadir una ruta de fallback 404 aquí */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;