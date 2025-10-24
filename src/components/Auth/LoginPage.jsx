// src/components/Auth/LoginPage.jsx
import React, { useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Link, useNavigate } from 'react-router-dom';

/**
 * @function LoginPage
 * @description Componente de la página de inicio de sesión con Bootstrap.
 * Implementa un formulario de login con gestión de estado y validación.
 */
const LoginPage = () => {
  const navigate = useNavigate(); 
  
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
    
    //cambiar el tipo de input y ajustar la validación aquí
    const isSpecialUser = formData.email.trim().toLowerCase() === 'admin';

    // Validación del Correo Electrónico
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
      isValid = false;
    } 
    //aplica la validación de formato de correo si NO es el usuario 'admin'
    else if (!isSpecialUser && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
      isValid = false;
    }

    // Validación de la Contraseña
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
      isValid = false;
    } else if (formData.password.length < 4) { 
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 2. Simulación de login de Administrador
      const isAdmin = formData.email.trim().toLowerCase() === 'admin' && formData.password === '1234';
      
      if (isAdmin) {
        console.log('Login de Administrador exitoso. Redirigiendo a Dashboard.');
        localStorage.setItem('userRole', 'admin'); 
        navigate('/admin/dashboard'); 
      } else {
        // 3. Simulación de login de Usuario Normal (aquí iría el fetch real)
        console.log('Datos de Login Válidos:', formData);
        localStorage.setItem('userRole', 'user'); 
        alert('¡Inicio de sesión exitoso!');
        navigate('/'); 
      }
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
                    <label htmlFor="email" className="form-label text-dark fw-bold">Correo electrónico / Usuario</label>
                    <input 
                      id="email" 
                      name="email" 
                      // tipo a 'text' para evitar la validación nativa del navegador
                      type="text" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="tu@email.com o admin" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Contraseña (sin cambios) */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark fw-bold">Contraseña</label>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Ingresa tu contraseña (1234 para admin)" 
                      required 
                      value={formData.password} 
                      onChange={handleChange} 
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* Resto del formulario... */}
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

                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-lg text-white" style={{ backgroundColor: '#2AF598', border: 'none' }}>
                      Iniciar Sesión
                    </button>
                  </div>

                  <div className="text-center mb-3">
                    <a href="#forgot-password" className="text-decoration-none" style={{ color: '#08AEEA' }}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </form>

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
                    ¿No tienes cuenta? 
                    <Link to="/registro" className="text-decoration-none" style={{ color: '#08AEEA' }}>
                      Regístrate aquí
                    </Link>
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