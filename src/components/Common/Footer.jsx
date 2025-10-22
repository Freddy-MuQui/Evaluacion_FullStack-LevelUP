// src/components/Common/Footer.jsx
import React from 'react';
// Se importa el CSS original para mantener los estilos
import '../../styles/estilos.css'; 

/**
 * @function Footer
 * @description Componente de pie de página (footer) de la tienda.
 */
const Footer = () => {
  // Manejador simple para el botón de suscribir (simulación de lógica)
  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('.input-newsletter').value;
    if (emailInput) {
      alert(`Suscripción registrada para: ${emailInput}`);
    } else {
      alert("Por favor, ingresa un correo.");
    }
  };

  return (
    // La clase 'footer' proviene de estilos.css
    <footer className="footer">
      <div className="footer-section">
        <a href="#chat" className="chat-support">
          <i className="fas fa-comments"></i> Soporte por Chat
        </a>
      </div>
      
      {/* Sección de suscripción al boletín, manejada con lógica simple de React */}
      <form className="footer-section newsletter-subscribe" onSubmit={handleSubscribe}>
        <input type="email" placeholder="Suscríbete al boletín" className="input-newsletter" required />
        <button type="submit" className="btn-subscribe">Suscribir</button>
      </form>
      
      {/* Iconos de redes sociales. Las rutas de las imágenes deben ser relativas a la carpeta public/ */}
      <div className="footer-section social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="Imagenes/facebook-icon.png" alt="Facebook" /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="Imagenes/twitter-icon.png" alt="Twitter" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="Imagenes/instagram-icon.png" alt="Instagram" /></a>
      </div>

      <div className="footer-links">
        <a href="#terminos">Términos de uso</a>
        <a href="#privacidad">Declaración de privacidad</a>
        <a href="#ayuda">Centro de ayuda</a>
      </div>
    </footer>
  );
};

export default Footer;