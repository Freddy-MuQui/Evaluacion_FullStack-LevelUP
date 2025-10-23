// src/components/Common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @function Header
 * @description Componente de encabezado con Bootstrap que incluye navegación y menú de productos.
 * Utiliza Link de React Router para la navegación sin recargar la página.
 */
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid px-4">
        {/* Logo arriba a la izquierda */}
        <Link className="navbar-brand" to="/">
          <img 
            src="Imagenes/logo_level_up.png" 
            alt="Level up logo" 
            height="40"
            className="me-2"
          />
          LEVEL-UP GAMER
        </Link>

        {/* Botón para colapsar en móviles */}
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

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-house me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="fas fa-shopping-cart me-1"></i> Carrito
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#blogs">
                <i className="fas fa-news me-1"></i> Blogs
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registro">
                <i className="fas fa-user me-1"></i> Perfil
              </Link>
            </li>
          </ul>

          {/* Menú desplegable de Productos */}
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle btn btn-link text-decoration-none" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                style={{ border: 'none', background: 'none', color: 'inherit' }}
              >
                <i className="fas fa-gamepad me-1"></i> Productos
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#consolas">Consolas</a></li>
                <li><a className="dropdown-item" href="#videojuegos">Videojuegos</a></li>
                <li><a className="dropdown-item" href="#accesorios">Accesorios</a></li>
                <li><a className="dropdown-item" href="#merchandising">Merchandising</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;