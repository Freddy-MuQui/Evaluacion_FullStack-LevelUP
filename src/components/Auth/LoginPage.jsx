// src/components/Auth/LoginPage.jsx
import React, { useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

/**
 * @function LoginPage
 * @description Componente de la página de inicio de sesión con Bootstrap.
 * Implementa un formulario de login con gestión de estado y validación.
 */
const LoginPage = () => {
  // Estado para gestionar los campos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({});

  // Manejador de cambios para actualizar el estado del formulario
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }));
  };

  // Lógica de validación del formulario
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Lógica de login exitoso (simulación)
      console.log('Datos de Login Válidos:', formData);
      alert('¡Inicio de sesión exitoso!');
      // Aquí se enviaría el fetch() a la API de backend
    } else {
      alert('Por favor, corrige los errores del formulario.');
    }
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(#08AEEA, #2AF598)' }}>
      <Header />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg">
              <div className="card-header text-white text-center" style={{ backgroundColor: '#08AEEA' }}>
                <h2 className="mb-0">Iniciar Sesión</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} id="loginForm">
                  {/* Correo Electrónico */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-dark fw-bold">Correo electrónico</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="tu@email.com" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark fw-bold">Contraseña</label>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Ingresa tu contraseña" 
                      required 
                      value={formData.password} 
                      onChange={handleChange} 
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* Recordar sesión */}
                  <div className="mb-3 form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label text-dark" htmlFor="rememberMe">
                      Recordar mi sesión
                    </label>
                  </div>

                  {/* Botón de envío */}
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-lg text-white" style={{ backgroundColor: '#2AF598', border: 'none' }}>
                      Iniciar Sesión
                    </button>
                  </div>

                  {/* Enlace de recuperar contraseña */}
                  <div className="text-center mb-3">
                    <a href="#forgot-password" className="text-decoration-none" style={{ color: '#08AEEA' }}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </form>

                {/* Sección de Redes Sociales */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-3">O inicia sesión con</p>
                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-danger" disabled>
                      <i className="fab fa-google me-2"></i>Google
                    </button>
                    <button className="btn btn-outline-primary" disabled>
                      <i className="fab fa-twitter me-2"></i>Twitter
                    </button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    ¿No tienes cuenta? <a href="/registro" className="text-decoration-none" style={{ color: '#08AEEA' }}>Regístrate aquí</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
