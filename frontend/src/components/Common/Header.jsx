// src/components/Common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Se importa el CSS original para mantener los estilos
import '../../styles/estilos.css'; 

/**
 * @function Header
 * @description Componente de encabezado que incluye navegación y menú de productos.
 * Utiliza Link de React Router para la navegación sin recargar la página.
 */
const Header = () => {
  return (
    // La clase 'header' proviene de estilos.css o disenioRegistro.css
    <header className="header">
      {/* Ruta a la imagen del logo. Se asume que está en public/Imagenes */}
      <img className="header__img" src="Imagenes/logo_level_up.png" alt="Level up logo" />
      
      {/* Menú de navegación principal. La clase 'header__nav-menu' le da estilo. */}
      <div className="header__nav-menu">
        <ul>
          {/* Usamos <Link> en lugar de <a> para React Router */}
          <li>
            <Link to="/">
              <i className="fas fa-house"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/carrito">
              <i className="fas fa-shopping-cart"></i> Carrito
            </Link>
          </li>
          <li>
            {/* Estos son enlaces placeholder */}
            <a href="#blogs"><i className="fas fa-news"> </i>Blogs</a>
          </li>
          <li>
            <Link to="/registro">
              <i className="fas fa-user"></i> Perfil
            </Link>
          </li>
        </ul>
      </div>

      {/* Menú desplegable de Productos. La lógica de :hover para el despliegue
          se mantiene en el CSS, haciendo este un componente funcional simple. */}
      <div className="header__menu header__menu--right">
        <div className="header__menu--profile">
          <p>Productos</p>
          <i className="fas fa-chevron-down"></i>
        </div>
        {/* Este <ul> se muestra con CSS en :hover del div padre */}
        <ul>
          <li><a href="#consolas">Consolas</a></li>
          <li><a href="#videojuegos">Videojuegos</a></li>
          <li><a href="#accesorios">Accesorios</a></li>
          <li><a href="#merchandising">Merchandising</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;