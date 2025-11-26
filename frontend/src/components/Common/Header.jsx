// src/components/Common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 py-3">
      <div className="container px-4">
        {/* Logo a la izquierda */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/Imagenes/logo_level_up.png" 
            alt="Level up logo" 
            style={{ height: '80px', objectFit: 'contain' }} 
          />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* CAMBIO CLAVE: mx-auto centra los elementos, mb-2 ajusta margen en móvil */}
          <ul className="navbar-nav mx-auto align-items-center mb-2 mb-lg-0">
            <li className="nav-item mx-3"> {/* mx-3 da más espacio entre botones */}
              <Link className="nav-link fs-5" to="/">
                <i className="fas fa-house me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fs-5" to="/carrito">
                <i className="fas fa-shopping-cart me-1"></i> Carrito
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fs-5" to="/blog">
                <i className="fas fa-newspaper me-1"></i> Blogs
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fs-5" to="/registro">
                <i className="fas fa-user me-1"></i> Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;