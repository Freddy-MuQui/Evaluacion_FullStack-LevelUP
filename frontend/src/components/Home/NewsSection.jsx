// src/components/Home/NewsSection.jsx
import React from 'react';

/**
 * @function NewsSection
 * @description Sección de noticias y video con Bootstrap.
 */
const NewsSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-white mb-4">Noticias y Consejos Gamer</h2>
        <div className="row g-4">
          {/* Artículo de Noticias */}
          <div className="col-lg-6">
            <div className="card bg-dark text-white h-100">
              <div className="card-body">
                <h3 className="card-title text-success">El Futuro de los eSports: Más Allá de los Juegos</h3>
                <p className="card-text">
                  Los eSports están evolucionando rápidamente, trascendiendo el ámbito de los videojuegos para convertirse en un fenómeno cultural y económico. Con audiencias masivas y patrocinios millonarios, el futuro promete una integración aún mayor con la tecnología de realidad virtual y aumentada, ofreciendo experiencias inmersivas sin precedentes para jugadores y espectadores. Además, la profesionalización de los jugadores y la creación de ligas globales están consolidando a los eSports como una forma legítima de entretenimiento y competición.
                </p>
                <a href="#leer-mas" className="btn btn-success">
                  Leer más <i className="fas fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Video de YouTube */}
          <div className="col-lg-6">
            <div className="card bg-dark text-white h-100">
              <div className="card-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.youtube.com/embed/bscciyExg9I?si=Vq8JQcbWqxNBkMiI" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="rounded"
                  />
                </div>
                <div className="p-3">
                  <h5 className="card-title text-success">Presentación AMD FidelityFX</h5>
                  <p className="card-text small text-muted">
                    Descubre las últimas tecnologías de AMD para gaming
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;