// src/components/Blog/BlogPage.jsx
import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
// Se importa el CSS
import '../../styles/estilo_blog.css';
// Se importan los datos del blog
import { blogNews, blogEsports, blogOpinion, blogHardware } from '../../utils/blogData';

/**
 * @function BlogPage
 * @description Página de blog con secciones de noticias, esports, opinión y hardware
 */
const BlogPage = () => {
  console.log('BlogPage está siendo renderizado');
  console.log('Datos de noticias:', blogNews);
  
  return (
    <div className="blog-page" style={{ minHeight: '100vh', background: 'linear-gradient(#08AEEA, #2AF598)' }}>
      <Header />
      
      <div className="container blog-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Título principal */}
        <div className="text-center mb-5">
          <h1 className="blog-title" style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Blog Gaming
          </h1>
          <p className="blog-subtitle" style={{ color: 'white', fontSize: '1.25rem' }}>
            Todo lo que necesitas saber sobre el mundo gaming
          </p>
        </div>

        {/* Sección: Noticias del sector */}
        <section className="blog-section" style={{ marginBottom: '3rem' }}>
          <div className="blog-section-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <i className="fas fa-newspaper blog-section-icon" style={{ color: 'white', fontSize: '2rem', marginRight: '1rem' }}></i>
            <h2 className="blog-section-title" style={{ color: 'white', fontWeight: 'bold', marginBottom: 0, fontSize: '2rem' }}>
              Noticias del Sector
            </h2>
          </div>
          <p className="blog-section-description" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '2rem' }}>
            Lanza nuevas consolas, grandes actualizaciones de juegos, eventos y lanzamientos
          </p>
          
          <div className="row g-4">
            {blogNews && blogNews.length > 0 ? blogNews.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <div className="blog-card" style={{ backgroundColor: '#212529', color: 'white', height: '100%', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}>
                  <div className="blog-card-body" style={{ padding: '1.5rem' }}>
                    <h5 className="blog-card-title" style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.25rem' }}>
                      {article.title}
                    </h5>
                    <p className="blog-card-text" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {article.description}
                    </p>
                    <div className="mb-2">
                      <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        <i className="fas fa-calendar me-1"></i> {article.date} | 
                        <i className="fas fa-user ms-2 me-1"></i> {article.author}
                      </small>
                    </div>
                    <a href={`#noticia-${article.id}`} className="blog-btn" style={{ backgroundColor: '#28a745', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', textDecoration: 'none', display: 'inline-block' }}>
                      Leer más <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <p style={{ color: 'white' }}>Cargando noticias...</p>
              </div>
            )}
          </div>
        </section>

        {/* Sección: Esports y competencias */}
        <section className="blog-section" style={{ marginBottom: '3rem' }}>
          <div className="blog-section-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <i className="fas fa-trophy blog-section-icon" style={{ color: 'white', fontSize: '2rem', marginRight: '1rem' }}></i>
            <h2 className="blog-section-title" style={{ color: 'white', fontWeight: 'bold', marginBottom: 0, fontSize: '2rem' }}>
              Esports y Competencias
            </h2>
          </div>
          <p className="blog-section-description" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '2rem' }}>
            Cobertura de torneos, entrevistas con jugadores pro, resultados y próximos eventos
          </p>
          
          <div className="row g-4">
            {blogEsports && blogEsports.length > 0 ? blogEsports.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <div className="blog-card" style={{ backgroundColor: '#212529', color: 'white', height: '100%', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}>
                  <div className="blog-card-body" style={{ padding: '1.5rem' }}>
                    <h5 className="blog-card-title" style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.25rem' }}>
                      {article.title}
                    </h5>
                    <p className="blog-card-text" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {article.description}
                    </p>
                    <div className="mb-2">
                      <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        <i className="fas fa-calendar me-1"></i> {article.date} | 
                        <i className="fas fa-user ms-2 me-1"></i> {article.author}
                      </small>
                    </div>
                    <a href={`#esports-${article.id}`} className="blog-btn" style={{ backgroundColor: '#28a745', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', textDecoration: 'none', display: 'inline-block' }}>
                      Ver más <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <p style={{ color: 'white' }}>Cargando esports...</p>
              </div>
            )}
          </div>
        </section>

        {/* Sección: Opinión y comunidad */}
        <section className="blog-section" style={{ marginBottom: '3rem' }}>
          <div className="blog-section-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <i className="fas fa-comments blog-section-icon" style={{ color: 'white', fontSize: '2rem', marginRight: '1rem' }}></i>
            <h2 className="blog-section-title" style={{ color: 'white', fontWeight: 'bold', marginBottom: 0, fontSize: '2rem' }}>
              Opinión y Comunidad
            </h2>
          </div>
          <p className="blog-section-description" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '2rem' }}>
            Debates sobre tendencias, artículos editoriales, encuestas y rankings de los mejores juegos
          </p>
          
          <div className="row g-4">
            {blogOpinion && blogOpinion.length > 0 ? blogOpinion.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <div className="blog-card" style={{ backgroundColor: '#212529', color: 'white', height: '100%', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}>
                  <div className="blog-card-body" style={{ padding: '1.5rem' }}>
                    <h5 className="blog-card-title" style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.25rem' }}>
                      {article.title}
                    </h5>
                    <p className="blog-card-text" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {article.description}
                    </p>
                    <div className="mb-2">
                      <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        <i className="fas fa-calendar me-1"></i> {article.date} | 
                        <i className="fas fa-user ms-2 me-1"></i> {article.author}
                      </small>
                    </div>
                    <a href={`#opinion-${article.id}`} className="blog-btn" style={{ backgroundColor: '#28a745', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', textDecoration: 'none', display: 'inline-block' }}>
                      {article.title.includes('Encuesta') ? 'Participar' : article.title.includes('Top') ? 'Ver ranking' : 'Leer más'} <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <p style={{ color: 'white' }}>Cargando opiniones...</p>
              </div>
            )}
          </div>
        </section>

        {/* Sección: Hardware y tecnología */}
        <section className="blog-section" style={{ marginBottom: '3rem' }}>
          <div className="blog-section-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <i className="fas fa-microchip blog-section-icon" style={{ color: 'white', fontSize: '2rem', marginRight: '1rem' }}></i>
            <h2 className="blog-section-title" style={{ color: 'white', fontWeight: 'bold', marginBottom: 0, fontSize: '2rem' }}>
              Hardware y Tecnología
            </h2>
          </div>
          <p className="blog-section-description" style={{ color: 'white', fontSize: '1.25rem', marginBottom: '2rem' }}>
            Análisis de componentes, comparativas de periféricos, recomendaciones para armar PCs gamer o elegir consolas
          </p>
          
          <div className="row g-4">
            {blogHardware && blogHardware.length > 0 ? blogHardware.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <div className="blog-card" style={{ backgroundColor: '#212529', color: 'white', height: '100%', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.5rem' }}>
                  <div className="blog-card-body" style={{ padding: '1.5rem' }}>
                    <h5 className="blog-card-title" style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.25rem' }}>
                      {article.title}
                    </h5>
                    <p className="blog-card-text" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {article.description}
                    </p>
                    <div className="mb-2">
                      <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        <i className="fas fa-calendar me-1"></i> {article.date} | 
                        <i className="fas fa-user ms-2 me-1"></i> {article.author}
                      </small>
                    </div>
                    <a href={`#hardware-${article.id}`} className="blog-btn" style={{ backgroundColor: '#28a745', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', textDecoration: 'none', display: 'inline-block' }}>
                      {article.title.includes('Guía') ? 'Ver guía' : 'Ver comparativa'} <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12">
                <p style={{ color: 'white' }}>Cargando hardware...</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
