// src/components/Home/NewsSection.jsx
import React from 'react';

/**
 * @function NewsSection
 * @description Muestra la sección de noticias y el video de YouTube (parte estática del Master_v2.html).
 */
const NewsSection = () => {
  return (
    // La clase 'gamer-news' proviene de estilos.css
    <section className="gamer-news">
      <h2 className="categories__title">Noticias y Consejos Gamer</h2>
      <div className="news-container">
        {/* Artículo de Noticias (Molécula/Organismo) */}
        <div className="news-article">
          <h3>El Futuro de los eSports: Más Allá de los Juegos</h3>
          <p>Los eSports están evolucionando rápidamente, trascendiendo el ámbito de los videojuegos para convertirse en un fenómeno cultural y económico. Con audiencias masivas y patrocinios millonarios, el futuro promete una integración aún mayor con la tecnología de realidad virtual y aumentada, ofreciendo experiencias inmersivas sin precedentes para jugadores y espectadores. Además, la profesionalización de los jugadores y la creación de ligas globales están consolidando a los eSports como una forma legítima de entretenimiento y competición.</p>
        </div>
        
        {/* Video de YouTube (Molécula/Organismo) */}
        <div className="youtube-video">
          {/* Se usa el iframe original, pero envuelto en el componente React */}
          <iframe 
            src="https://www.youtube.com/embed/bscciyExg9I?si=Vq8JQcbWqxNBkMiI" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen 
          />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;