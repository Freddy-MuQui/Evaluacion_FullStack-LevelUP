// src/components/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
// Se importa el CSS específico de registro
import '../../styles/disenioRegistro.css'; 

/**
 * @function RegisterPage
 * @description Componente de la página de registro de usuario (Migración de registrarUsuario.html).
 * Implementa un formulario con gestión de estado y validación simple.
 */
const RegisterPage = () => {
  // 1. Estado para gestionar todos los campos del formulario
  const [formData, setFormData] = useState({
    fullName: '', email: '', confirmEmail: '',
    password: '', confirmPassword: '', phone: '',
    region: '', comuna: '', address: '',
  });

  // 2. Estado para manejar errores de validación
  const [errors, setErrors] = useState({});

  // 3. Manejador de cambios para actualizar el estado del formulario
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
        // En un proyecto real, se mostraría un error más amigable para cada campo
        if (!isValid) continue; 
        newErrors[key] = 'Este campo es obligatorio.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // 5. Manejador del envío del formulario
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
    /* ... otras regiones ... */
  ];
  const comunas = [
    { value: "arica", label: "Arica", region: "arica" },
    { value: "camarones", label: "Camarones", region: "arica" },
    /* ... otras comunas de todas las regiones ... */
  ];

  // Filtramos las comunas basándonos en la región seleccionada (para mejor UX)
  const filteredComunas = comunas.filter(c => 
    !formData.region || c.region === formData.region
  );

  return (
    <div className="App-container">
      <Header />
      
      {/* La clase 'login' envuelve la sección del formulario de registro. */}
      <section className="login">
        {/* Clase 'login__container' para el contenedor del formulario. */}
        <section className="login__container">
          <h2>Registrar Usuario</h2>
          
          <form className="login__container--form" onSubmit={handleSubmit} id="registerForm">
            {/* Input Nombre Completo */}
            <input id="fullName" name="fullName" type="text" placeholder="Nombre completo" required className="input" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.fullName}</p>}

            {/* Input Correo Electrónico */}
            <input id="email" name="email" type="email" placeholder="Correo electrónico" required className="input" value={formData.email} onChange={handleChange} />
            {errors.email && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.email}</p>}

            {/* Input Confirmar Correo Electrónico */}
            <input id="confirmEmail" name="confirmEmail" type="email" placeholder="Confirmar correo electrónico" required className="input" value={formData.confirmEmail} onChange={handleChange} />
            {errors.confirmEmail && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.confirmEmail}</p>}

            {/* Input Contraseña */}
            <input id="password" name="password" type="password" placeholder="Contraseña" required className="input" value={formData.password} onChange={handleChange} />
            {errors.password && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.password}</p>}

            {/* Input Confirmar Contraseña */}
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirmar contraseña" required className="input" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.confirmPassword}</p>}
            
            {/* Input Teléfono */}
            <input id="phone" name="phone" type="tel" pattern="[0-9]{7,15}" placeholder="Teléfono (ej: 951999486)" required className="input" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.phone}</p>}

            {/* Selector de Región */}
            <select id="region" name="region" required className="input" value={formData.region} onChange={handleChange}>
              <option value="">Seleccione región</option>
              {/* Se necesita cargar la lista completa de regiones del HTML original */}
              <option value="arica">Arica y Parinacota</option>
              {/* ... Cargar el resto de <option> ... */}
            </select>
            {errors.region && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.region}</p>}

            {/* Selector de Comuna (deshabilitado si no hay región, aunque aquí lo simplificamos) */}
            <select id="comuna" name="comuna" required className="input" value={formData.comuna} onChange={handleChange} disabled={!formData.region}>
              <option value="">Seleccione comuna</option>
              {/* Se necesita cargar la lista completa de comunas del HTML original */}
              {/* Aquí se cargarían dinámicamente si implementáramos el filtro */}
              <option value="santiago">Santiago</option>
              {/* ... Cargar el resto de <option> ... */}
            </select>
            {errors.comuna && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.comuna}</p>}

            {/* Input Dirección */}
            <input id="address" name="address" type="text" placeholder="Dirección" required className="input" value={formData.address} onChange={handleChange} />
            {errors.address && <p style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{errors.address}</p>}

            <button type="submit" className="button">Registrarse</button>
          </form>

          {/* Sección de Redes Sociales (sin funcionalidad en el HTML original) */}
          <section className="login__container--social-media">
            <div style={{ cursor: 'default', opacity: 0.7, marginBottom: '10px' }}>
              Registrarse con Google
            </div>
            <div style={{ cursor: 'default', opacity: 0.7 }}>
              Registrarse con Twitter
            </div>
          </section>

          <p className="login__container--register">
            ¿Ya tienes una cuenta? <a href="login.html">Inicia sesión</a>
          </p>
        </section>
      </section>

      {/* El footer usado aquí es el de disenioRegistro.css, que es más simple,
          pero usaremos el componente Footer común para consistencia, adaptando la clase. */}
      <div style={{ backgroundColor: '#2AF598', display: 'flex', alignItems: 'center', height: '100px', width: '100%', justifyContent: 'center', gap: '30px' }}>
        <a href="#terminos" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Términos de uso</a>
        <a href="#privacidad" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Declaración de privacidad</a>
        <a href="#ayuda" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Centro de ayuda</a>
      </div>
    </div>
  );
};

export default RegisterPage;