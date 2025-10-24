// src/components/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
// Se importa el CSS 
import '../../styles/disenioRegistro.css'; 

/**
 * @function RegisterPage
 * @description Componente de la página de registro de usuario (Migración de registrarUsuario.html).
 * Implementa un formulario con gestión de estado y validación simple.
 */
const RegisterPage = () => {
  // Estado para gestionar todos los campos del formulario
  const [formData, setFormData] = useState({
    fullName: '', email: '', confirmEmail: '',
    password: '', confirmPassword: '', phone: '',
    region: '', comuna: '', address: '',
  });

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({});

  //Manejador de cambios para actualizar el estado del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // 4. Lógica de validación del formulario
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Los correos electrónicos no coinciden.';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      isValid = false;
    }
    // Validación simple de campos vacíos (el 'required' de HTML ayuda, pero validamos la lógica)
    for (const key in formData) {
      if (formData[key].trim() === '') {
        // se mostraría un error más amigable para cada campo
        if (!isValid) continue; 
        newErrors[key] = 'Este campo es obligatorio.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  //Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto de recarga
    
    if (validateForm()) {
      // Lógica de registro exitosa (simulación)
      console.log('Datos de Registro Válidos:', formData);
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      // Aquí se enviaría el fetch() a la API de backend
    } else {
      alert('Por favor, corrige los errores del formulario.');
    }
  };

  // Estructura y opciones de Comunas/Regiones (tomadas del HTML original)
  const regions = [
    { value: "arica", label: "Arica y Parinacota" }, 
    /*  otras regiones  */
  ];
  const comunas = [
    { value: "arica", label: "Arica", region: "arica" },
    { value: "camarones", label: "Camarones", region: "arica" },
    /*  otras comunas de todas las regiones  */
  ];

  // comunas basándonos en la región seleccionada (para mejor UX)
  const filteredComunas = comunas.filter(c => 
    !formData.region || c.region === formData.region
  );

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(#08AEEA, #2AF598)' }}>
      <Header />
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg">
              <div className="card-header text-white text-center" style={{ backgroundColor: '#08AEEA' }}>
                <h2 className="mb-0">Registrar Usuario</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} id="registerForm">
                  <div className="row">
                    {/* Nombre Completo */}
                    <div className="col-12 mb-3">
                      <label htmlFor="fullName" className="form-label text-dark fw-bold">Nombre completo</label>
                      <input 
                        id="fullName" 
                        name="fullName" 
                        type="text" 
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu nombre completo" 
                        required 
                        value={formData.fullName} 
                        onChange={handleChange} 
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    {/* Correo Electrónico */}
                    <div className="col-md-6 mb-3">
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

                    {/* Confirmar Correo */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmEmail" className="form-label text-dark fw-bold">Confirmar correo</label>
                      <input 
                        id="confirmEmail" 
                        name="confirmEmail" 
                        type="email" 
                        className={`form-control ${errors.confirmEmail ? 'is-invalid' : ''}`}
                        placeholder="Confirma tu correo" 
                        required 
                        value={formData.confirmEmail} 
                        onChange={handleChange} 
                      />
                      {errors.confirmEmail && <div className="invalid-feedback">{errors.confirmEmail}</div>}
                    </div>

                    {/* Contraseña */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label text-dark fw-bold">Contraseña</label>
                      <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Mínimo 6 caracteres" 
                        required 
                        value={formData.password} 
                        onChange={handleChange} 
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="form-label text-dark fw-bold">Confirmar contraseña</label>
                      <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirma tu contraseña" 
                        required 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    {/* Teléfono */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label text-dark fw-bold">Teléfono</label>
                      <input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="+56 9 1234 5678" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange} 
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    {/* Región */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="region" className="form-label text-dark fw-bold">Región</label>
                      <select 
                        id="region" 
                        name="region" 
                        required 
                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                        value={formData.region} 
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar región</option>
                        <option value="metropolitana">Región Metropolitana</option>
                        <option value="valparaiso">Región de Valparaíso</option>
                        <option value="biobio">Región del Biobío</option>
                        <option value="araucania">Región de La Araucanía</option>
                        <option value="loslagos">Región de Los Lagos</option>
                        <option value="antofagasta">Región de Antofagasta</option>
                        <option value="atacama">Región de Atacama</option>
                        <option value="coquimbo">Región de Coquimbo</option>
                        <option value="ohiggins">Región del Libertador General Bernardo O'Higgins</option>
                        <option value="maule">Región del Maule</option>
                        <option value="nuble">Región de Ñuble</option>
                        <option value="rios">Región de Los Ríos</option>
                        <option value="aysen">Región Aysén del General Carlos Ibáñez del Campo</option>
                        <option value="magallanes">Región de Magallanes y de la Antártica Chilena</option>
                        <option value="tarapaca">Región de Tarapacá</option>
                        <option value="arica">Región de Arica y Parinacota</option>
                      </select>
                      {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                    </div>

                    {/* Comuna */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="comuna" className="form-label text-dark fw-bold">Comuna</label>
                      <select 
                        id="comuna" 
                        name="comuna" 
                        required 
                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                        value={formData.comuna} 
                        onChange={handleChange} 
                        disabled={!formData.region}
                      >
                        <option value="">Seleccionar comuna</option>
                        {filteredComunas.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                    </div>

                    {/* Dirección */}
                    <div className="col-12 mb-4">
                      <label htmlFor="address" className="form-label text-dark fw-bold">Dirección</label>
                      <input 
                        id="address" 
                        name="address" 
                        type="text" 
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Calle, número, departamento" 
                        required 
                        value={formData.address} 
                        onChange={handleChange} 
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-lg text-white" style={{ backgroundColor: '#2AF598', border: 'none' }}>
                      Registrarse
                    </button>
                  </div>
                </form>

                {/* Sección de Redes Sociales */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-3">O regístrate con</p>
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
                    ¿Ya tienes una cuenta? 
                    {/*  navegar a la ruta '/login' sin recargar la página */}
                    <Link to="/login" className="text-decoration-none" style={{ color: '#08AEEA' }}>
                      Inicia sesión
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

export default RegisterPage;