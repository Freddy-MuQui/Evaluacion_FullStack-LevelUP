describe('Validación de Formularios de Registro', function() {
  
  describe('validarNombre', function() {
    it('debe validar que el nombre no esté vacío', function() {
      function validarNombre(nombre) {
        return nombre && nombre.trim().length > 0;
      }
      
      expect(validarNombre("Juan Pérez")).toBe(true);
      expect(validarNombre("")).toBe(false);
      expect(validarNombre("   ")).toBe(false);
      expect(validarNombre(null)).toBe(false);
      expect(validarNombre(undefined)).toBe(false);
    });

    it('debe validar que el nombre tenga al menos 2 caracteres', function() {
      function validarNombreCompleto(nombre) {
        return nombre && nombre.trim().length >= 2;
      }
      
      expect(validarNombreCompleto("Juan")).toBe(true);
      expect(validarNombreCompleto("J")).toBe(false);
      expect(validarNombreCompleto("Juan Carlos")).toBe(true);
    });

    it('debe validar que el nombre solo contenga letras y espacios', function() {
      function validarFormatoNombre(nombre) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return regex.test(nombre);
      }
      
      expect(validarFormatoNombre("Juan Pérez")).toBe(true);
      expect(validarFormatoNombre("María José")).toBe(true);
      expect(validarFormatoNombre("Juan123")).toBe(false);
      expect(validarFormatoNombre("Juan@Pérez")).toBe(false);
    });
  });

  describe('validarEmail', function() {
    it('debe validar formato de email correcto', function() {
      function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
      
      expect(validarEmail("usuario@ejemplo.com")).toBe(true);
      expect(validarEmail("test@domain.co.uk")).toBe(true);
      expect(validarEmail("usuario@ejemplo")).toBe(false);
      expect(validarEmail("@ejemplo.com")).toBe(false);
      expect(validarEmail("usuario@")).toBe(false);
      expect(validarEmail("")).toBe(false);
    });

    it('debe validar que los emails coincidan', function() {
      function validarEmailsCoinciden(email, confirmEmail) {
        return email === confirmEmail && email !== "";
      }
      
      expect(validarEmailsCoinciden("test@ejemplo.com", "test@ejemplo.com")).toBe(true);
      expect(validarEmailsCoinciden("test@ejemplo.com", "test2@ejemplo.com")).toBe(false);
      expect(validarEmailsCoinciden("", "")).toBe(false);
    });
  });

  describe('validarPassword', function() {
    it('debe validar que la contraseña tenga al menos 8 caracteres', function() {
      function validarLongitudPassword(password) {
        return password && password.length >= 8;
      }
      
      expect(validarLongitudPassword("12345678")).toBe(true);
      expect(validarLongitudPassword("1234567")).toBe(false);
      expect(validarLongitudPassword("")).toBe(false);
    });

    it('debe validar que la contraseña contenga al menos una mayúscula', function() {
      function validarPasswordCompleja(password) {
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneNumero = /\d/.test(password);
        const longitudMinima = password.length >= 8;
        
        return tieneMayuscula && tieneMinuscula && tieneNumero && longitudMinima;
      }
      
      expect(validarPasswordCompleja("Password123")).toBe(true);
      expect(validarPasswordCompleja("password123")).toBe(false);
      expect(validarPasswordCompleja("PASSWORD123")).toBe(false);
      expect(validarPasswordCompleja("Password")).toBe(false);
    });

    it('debe validar que las contraseñas coincidan', function() {
      function validarPasswordsCoinciden(password, confirmPassword) {
        return password === confirmPassword && password !== "";
      }
      
      expect(validarPasswordsCoinciden("Password123", "Password123")).toBe(true);
      expect(validarPasswordsCoinciden("Password123", "Password456")).toBe(false);
      expect(validarPasswordsCoinciden("", "")).toBe(false);
    });
  });

  describe('validarTelefono', function() {
    it('debe validar formato de teléfono chileno', function() {
      function validarTelefonoChileno(telefono) {
        const regex = /^[0-9]{7,15}$/;
        return regex.test(telefono);
      }
      
      expect(validarTelefonoChileno("951999486")).toBe(true);
      expect(validarTelefonoChileno("1234567")).toBe(true);
      expect(validarTelefonoChileno("123456789012345")).toBe(true);
      expect(validarTelefonoChileno("123456")).toBe(false);
      expect(validarTelefonoChileno("1234567890123456")).toBe(false);
      expect(validarTelefonoChileno("abc123456")).toBe(false);
    });

    it('debe validar teléfono con código de país', function() {
      function validarTelefonoConCodigo(telefono) {
        const regex = /^(\+56|56)?[0-9]{8,9}$/;
        return regex.test(telefono);
      }
      
      expect(validarTelefonoConCodigo("+56951999486")).toBe(true);
      expect(validarTelefonoConCodigo("56951999486")).toBe(true);
      expect(validarTelefonoConCodigo("951999486")).toBe(true);
      expect(validarTelefonoConCodigo("+1234567890")).toBe(false);
    });
  });

  describe('validarRegion', function() {
    it('debe validar que se seleccione una región', function() {
      function validarRegion(region) {
        const regionesValidas = [
          'arica', 'tarapaca', 'antofagasta', 'atacama', 'coquimbo',
          'valparaiso', 'rm', 'ohiggins', 'maule', 'biobio',
          'araucania', 'losrios', 'loslagos', 'aysen', 'magallanes'
        ];
        return regionesValidas.includes(region);
      }
      
      expect(validarRegion("rm")).toBe(true);
      expect(validarRegion("valparaiso")).toBe(true);
      expect(validarRegion("")).toBe(false);
      expect(validarRegion("region_invalida")).toBe(false);
    });
  });

  describe('validarComuna', function() {
    it('debe validar que se seleccione una comuna', function() {
      function validarComuna(comuna) {
        const comunasValidas = [
          'santiago', 'puente_alto', 'maipu', 'las_condes', 'providencia',
          'valparaiso', 'concepcion', 'temuco', 'antofagasta'
        ];
        return comunasValidas.includes(comuna);
      }
      
      expect(validarComuna("santiago")).toBe(true);
      expect(validarComuna("las_condes")).toBe(true);
      expect(validarComuna("")).toBe(false);
      expect(validarComuna("comuna_invalida")).toBe(false);
    });
  });

  describe('validarDireccion', function() {
    it('debe validar que la dirección no esté vacía', function() {
      function validarDireccion(direccion) {
        return direccion && direccion.trim().length > 0;
      }
      
      expect(validarDireccion("Av. Principal 123")).toBe(true);
      expect(validarDireccion("")).toBe(false);
      expect(validarDireccion("   ")).toBe(false);
    });

    it('debe validar longitud mínima de dirección', function() {
      function validarDireccionCompleta(direccion) {
        return direccion && direccion.trim().length >= 10;
      }
      
      expect(validarDireccionCompleta("Av. Principal 123, Depto 45")).toBe(true);
      expect(validarDireccionCompleta("Calle 1")).toBe(false);
    });
  });

  describe('validarFormularioCompleto', function() {
    it('debe validar todos los campos del formulario', function() {
      function validarFormularioCompleto(datos) {
        const errores = [];
        
        if (!datos.nombre || datos.nombre.trim().length < 2) {
          errores.push("Nombre inválido");
        }
        
        if (!datos.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
          errores.push("Email inválido");
        }
        
        if (datos.email !== datos.confirmEmail) {
          errores.push("Los emails no coinciden");
        }
        
        if (!datos.password || datos.password.length < 8) {
          errores.push("Contraseña inválida");
        }
        
        if (datos.password !== datos.confirmPassword) {
          errores.push("Las contraseñas no coinciden");
        }
        
        if (!datos.telefono || !/^[0-9]{7,15}$/.test(datos.telefono)) {
          errores.push("Teléfono inválido");
        }
        
        if (!datos.region) {
          errores.push("Debe seleccionar una región");
        }
        
        if (!datos.comuna) {
          errores.push("Debe seleccionar una comuna");
        }
        
        if (!datos.direccion || datos.direccion.trim().length < 10) {
          errores.push("Dirección inválida");
        }
        
        return {
          esValido: errores.length === 0,
          errores: errores
        };
      }
      
      const datosValidos = {
        nombre: "Juan Pérez",
        email: "juan@ejemplo.com",
        confirmEmail: "juan@ejemplo.com",
        password: "Password123",
        confirmPassword: "Password123",
        telefono: "951999486",
        region: "rm",
        comuna: "santiago",
        direccion: "Av. Principal 123, Depto 45"
      };
      
      const datosInvalidos = {
        nombre: "J",
        email: "email-invalido",
        confirmEmail: "otro@email.com",
        password: "123",
        confirmPassword: "456",
        telefono: "123",
        region: "",
        comuna: "",
        direccion: "Calle"
      };
      
      const resultadoValido = validarFormularioCompleto(datosValidos);
      const resultadoInvalido = validarFormularioCompleto(datosInvalidos);
      
      expect(resultadoValido.esValido).toBe(true);
      expect(resultadoValido.errores.length).toBe(0);
      
      expect(resultadoInvalido.esValido).toBe(false);
      expect(resultadoInvalido.errores.length).toBeGreaterThan(0);
    });
  });

  describe('sanitizarDatos', function() {
    it('debe sanitizar datos de entrada', function() {
      function sanitizarDatos(datos) {
        return {
          nombre: datos.nombre ? datos.nombre.trim() : "",
          email: datos.email ? datos.email.trim().toLowerCase() : "",
          telefono: datos.telefono ? datos.telefono.replace(/\D/g, '') : "",
          direccion: datos.direccion ? datos.direccion.trim() : ""
        };
      }
      
      const datosSinSanitizar = {
        nombre: "  Juan Pérez  ",
        email: "  JUAN@EJEMPLO.COM  ",
        telefono: "+56 9 5199 9486",
        direccion: "  Av. Principal 123  "
      };
      
      const datosSanitizados = sanitizarDatos(datosSinSanitizar);
      
      expect(datosSanitizados.nombre).toBe("Juan Pérez");
      expect(datosSanitizados.email).toBe("juan@ejemplo.com");
      expect(datosSanitizados.telefono).toBe("56951999486");
      expect(datosSanitizados.direccion).toBe("Av. Principal 123");
    });
  });

  describe('validarTerminos', function() {
    it('debe validar que se acepten los términos y condiciones', function() {
      function validarTerminos(aceptaTerminos) {
        return aceptaTerminos === true;
      }
      
      expect(validarTerminos(true)).toBe(true);
      expect(validarTerminos(false)).toBe(false);
      expect(validarTerminos(undefined)).toBe(false);
    });
  });

  describe('validarEdad', function() {
    it('debe validar que el usuario sea mayor de edad', function() {
      function validarEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        const edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
          return edad - 1 >= 18;
        }
        
        return edad >= 18;
      }
      
      const fechaMayor = new Date();
      fechaMayor.setFullYear(fechaMayor.getFullYear() - 20);
      
      const fechaMenor = new Date();
      fechaMenor.setFullYear(fechaMenor.getFullYear() - 16);
      
      expect(validarEdad(fechaMayor.toISOString().split('T')[0])).toBe(true);
      expect(validarEdad(fechaMenor.toISOString().split('T')[0])).toBe(false);
    });
  });
});
