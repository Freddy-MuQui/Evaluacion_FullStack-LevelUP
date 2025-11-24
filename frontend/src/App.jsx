// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import CartPage from './components/Cart/CartPage';
import RegisterPage from './components/Auth/RegisterPage';

/**
 * @function App
 * @description Componente principal de la aplicación.
 * Configura el enrutamiento (routing) para uso local y despliegue en la raíz (Vercel).
 */
const App = () => {
  // 💡 HERRAMIENTA CLAVE: Eliminamos el basename. 
  // Al no pasar la propiedad basename, BrowserRouter asume que la aplicación 
  // se sirve desde la raíz ('/'), lo que es correcto para 'npm start' y Vercel.
  return (
    // Utilizamos <Router> sin la propiedad 'basename'
    <Router> 
      <div className="App">
        {/* Las rutas internas siempre se mantienen con la barra inclinada simple ('/') */}
        <Routes>
          {/* Ruta de la página principal (Home), basada en tu estructura de carpetas: './components/Home/HomePage' */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta de la página del Carrito, basada en tu estructura: './components/Cart/CartPage' */}
          <Route path="/carrito" element={<CartPage />} />
          
          {/* Ruta de la página de Registro de Usuario, basada en tu estructura: './components/Auth/RegisterPage' */}
          <Route path="/registro" element={<RegisterPage />} />

          {/* Fallback 404. Es recomendable mantenerlo al final. */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;