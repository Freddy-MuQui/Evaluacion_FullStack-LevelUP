// src/components/Common/Footer.jsx
import React from 'react';

/**
 * @function Footer
 * @description Componente de pie de página (footer) de la tienda con Bootstrap.
 */
const Footer = () => {
  // Manejador simple para el botón de suscribir (simulación de lógica)
  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('.form-control').value;
    if (emailInput) {
      alert(`Suscripción registrada para: ${emailInput}`);
    } else {
      alert("Por favor, ingresa un correo.");
    }
  };

  return (
    <footer className="bg-dark text-light py-4 w-100">
      <div className="container-fluid px-4">
        <div className="row">
          {/* Soporte por Chat */}
          <div className="col-md-3 mb-3">
            <a href="#chat" className="text-light text-decoration-none">
              <i className="fas fa-comments me-2"></i> Soporte por Chat
            </a>
          </div>
          
          {/* Suscripción al boletín */}
          <div className="col-md-4 mb-3">
            <form onSubmit={handleSubscribe} className="d-flex">
              <input 
                type="email" 
                className="form-control me-2" 
                placeholder="Suscríbete al boletín" 
                required 
              />
              <button type="submit" className="btn btn-success">
                Suscribir
              </button>
            </form>
          </div>
          
          {/* Redes sociales */}
          <div className="col-md-3 mb-3">
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <img src="Imagenes/facebook-icon.png" alt="Facebook" width="30" height="30" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <img src="Imagenes/twitter-icon.png" alt="Twitter" width="30" height="30" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <img src="Imagenes/instagram-icon.png" alt="Instagram" width="30" height="30" />
              </a>
            </div>
          </div>
        </div>

        {/* Enlaces del footer */}
        <hr className="my-3" />
        <div className="row">
          <div className="col-12 text-center">
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <a href="#terminos" className="text-light text-decoration-none">Términos de uso</a>
              <a href="#privacidad" className="text-light text-decoration-none">Declaración de privacidad</a>
              <a href="#ayuda" className="text-light text-decoration-none">Centro de ayuda</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;