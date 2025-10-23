describe('Funciones de localStorage', function() {
  let mockStorage;
  
  beforeEach(function() {
    // Crear mock de localStorage
    mockStorage = {};
    
    // Mock de localStorage
    spyOn(Storage.prototype, 'getItem').and.callFake(function(key) {
      return mockStorage[key] || null;
    });
    
    spyOn(Storage.prototype, 'setItem').and.callFake(function(key, value) {
      mockStorage[key] = value;
    });
    
    spyOn(Storage.prototype, 'removeItem').and.callFake(function(key) {
      delete mockStorage[key];
    });
    
    spyOn(Storage.prototype, 'clear').and.callFake(function() {
      mockStorage = {};
    });
  });

  afterEach(function() {
    mockStorage = {};
  });

  describe('guardarDatos', function() {
    it('debe guardar datos en localStorage', function() {
      function guardarDatos(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
      }
      
      const datos = { id: 1, nombre: "Test" };
      guardarDatos('testKey', datos);
      
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(datos));
    });

    it('debe manejar errores de serialización', function() {
      function guardarDatosSeguro(key, data) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
          return true;
        } catch (error) {
          console.error('Error al guardar datos:', error);
          return false;
        }
      }
      
      const datosValidos = { id: 1, nombre: "Test" };
      const datosInvalidos = { circular: {} };
      datosInvalidos.circular.self = datosInvalidos; // Referencia circular
      
      expect(guardarDatosSeguro('testKey', datosValidos)).toBe(true);
      expect(guardarDatosSeguro('testKey', datosInvalidos)).toBe(false);
    });
  });

  describe('cargarDatos', function() {
    it('debe cargar datos desde localStorage', function() {
      function cargarDatos(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      
      const datos = { id: 1, nombre: "Test" };
      mockStorage['testKey'] = JSON.stringify(datos);
      
      const resultado = cargarDatos('testKey');
      expect(resultado).toEqual(datos);
    });

    it('debe retornar null cuando no hay datos', function() {
      function cargarDatos(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      
      const resultado = cargarDatos('keyInexistente');
      expect(resultado).toBeNull();
    });

    it('debe manejar errores de deserialización', function() {
      function cargarDatosSeguro(key) {
        try {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        } catch (error) {
          console.error('Error al cargar datos:', error);
          return null;
        }
      }
      
      mockStorage['testKey'] = 'JSON inválido';
      const resultado = cargarDatosSeguro('testKey');
      expect(resultado).toBeNull();
    });
  });

  describe('verificarDisponibilidad', function() {
    it('debe verificar si localStorage está disponible', function() {
      function verificarLocalStorage() {
        try {
          const testKey = '__localStorage_test__';
          localStorage.setItem(testKey, 'test');
          localStorage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      
      expect(verificarLocalStorage()).toBe(true);
    });

    it('debe manejar localStorage en modo privado', function() {
      function verificarLocalStorageConManejo() {
        try {
          const testKey = '__localStorage_test__';
          localStorage.setItem(testKey, 'test');
          localStorage.removeItem(testKey);
          return true;
        } catch (error) {
          if (error.name === 'QuotaExceededError') {
            console.warn('LocalStorage lleno');
            return false;
          }
          if (error.name === 'SecurityError') {
            console.warn('LocalStorage no disponible en modo privado');
            return false;
          }
          return false;
        }
      }
      
      expect(verificarLocalStorageConManejo()).toBe(true);
    });
  });

  describe('limpiarDatos', function() {
    it('debe limpiar todos los datos del localStorage', function() {
      function limpiarTodo() {
        localStorage.clear();
      }
      
      // Agregar algunos datos primero
      mockStorage['key1'] = 'value1';
      mockStorage['key2'] = 'value2';
      
      limpiarTodo();
      expect(localStorage.clear).toHaveBeenCalled();
    });

    it('debe eliminar una clave específica', function() {
      function eliminarClave(key) {
        localStorage.removeItem(key);
      }
      
      mockStorage['testKey'] = 'testValue';
      eliminarClave('testKey');
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('gestionarCarrito', function() {
    it('debe guardar y cargar el carrito correctamente', function() {
      function guardarCarrito(carrito) {
        localStorage.setItem('shoppingCart', JSON.stringify(carrito));
      }
      
      function cargarCarrito() {
        const cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : [];
      }
      
      const carrito = [
        { id: 1, nombre: "Producto 1", cantidad: 2 },
        { id: 2, nombre: "Producto 2", cantidad: 1 }
      ];
      
      guardarCarrito(carrito);
      const carritoCargado = cargarCarrito();
      
      expect(carritoCargado).toEqual(carrito);
      expect(carritoCargado.length).toBe(2);
    });

    it('debe manejar carrito vacío', function() {
      function cargarCarrito() {
        const cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : [];
      }
      
      const carritoVacio = cargarCarrito();
      expect(carritoVacio).toEqual([]);
    });
  });

  describe('gestionarUsuario', function() {
    it('debe guardar datos de usuario', function() {
      function guardarUsuario(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
      }
      
      function cargarUsuario() {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
      }
      
      const usuario = {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@example.com",
        telefono: "123456789"
      };
      
      guardarUsuario(usuario);
      const usuarioCargado = cargarUsuario();
      
      expect(usuarioCargado).toEqual(usuario);
    });

    it('debe verificar si hay usuario logueado', function() {
      function hayUsuarioLogueado() {
        const usuario = localStorage.getItem('usuario');
        return usuario !== null;
      }
      
      expect(hayUsuarioLogueado()).toBe(false);
      
      mockStorage['usuario'] = JSON.stringify({ id: 1, nombre: "Test" });
      expect(hayUsuarioLogueado()).toBe(true);
    });
  });

  describe('gestionarConfiguracion', function() {
    it('debe guardar configuración de la aplicación', function() {
      function guardarConfiguracion(config) {
        localStorage.setItem('configuracion', JSON.stringify(config));
      }
      
      function cargarConfiguracion() {
        const config = localStorage.getItem('configuracion');
        return config ? JSON.parse(config) : {};
      }
      
      const configuracion = {
        tema: 'oscuro',
        idioma: 'es',
        notificaciones: true
      };
      
      guardarConfiguracion(configuracion);
      const configCargada = cargarConfiguracion();
      
      expect(configCargada).toEqual(configuracion);
    });

    it('debe usar configuración por defecto si no existe', function() {
      function cargarConfiguracionConDefectos() {
        const config = localStorage.getItem('configuracion');
        const configDefecto = {
          tema: 'claro',
          idioma: 'es',
          notificaciones: false
        };
        return config ? JSON.parse(config) : configDefecto;
      }
      
      const config = cargarConfiguracionConDefectos();
      expect(config.tema).toBe('claro');
      expect(config.idioma).toBe('es');
      expect(config.notificaciones).toBe(false);
    });
  });

  describe('gestionarFavoritos', function() {
    it('debe agregar y remover favoritos', function() {
      function agregarFavorito(productoId) {
        const favoritos = cargarFavoritos();
        if (!favoritos.includes(productoId)) {
          favoritos.push(productoId);
          localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
      }
      
      function removerFavorito(productoId) {
        const favoritos = cargarFavoritos();
        const index = favoritos.indexOf(productoId);
        if (index > -1) {
          favoritos.splice(index, 1);
          localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
      }
      
      function cargarFavoritos() {
        const favoritos = localStorage.getItem('favoritos');
        return favoritos ? JSON.parse(favoritos) : [];
      }
      
      agregarFavorito(1);
      agregarFavorito(2);
      let favoritos = cargarFavoritos();
      expect(favoritos).toEqual([1, 2]);
      
      removerFavorito(1);
      favoritos = cargarFavoritos();
      expect(favoritos).toEqual([2]);
    });

    it('debe verificar si un producto es favorito', function() {
      function esFavorito(productoId) {
        const favoritos = cargarFavoritos();
        return favoritos.includes(productoId);
      }
      
      function cargarFavoritos() {
        const favoritos = localStorage.getItem('favoritos');
        return favoritos ? JSON.parse(favoritos) : [];
      }
      
      mockStorage['favoritos'] = JSON.stringify([1, 3, 5]);
      
      expect(esFavorito(1)).toBe(true);
      expect(esFavorito(2)).toBe(false);
      expect(esFavorito(3)).toBe(true);
    });
  });
});
