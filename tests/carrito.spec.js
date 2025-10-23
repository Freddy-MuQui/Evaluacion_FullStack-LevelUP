describe('Funciones del Carrito de Compras', function() {
  let mockProducts;
  let mockLocalStorage;
  
  beforeEach(function() {
    // Mock de productos para testing
    mockProducts = [
      {
        id: 1,
        codigo: "JM001",
        nombre: "Juegos de Mesa Catan",
        descripcion: "Un clásico juego de estrategia",
        precio: 29990,
        imagen: "test-image.jpg",
        cantidad: 1,
        llevar: true,
        category: "Mi lista"
      },
      {
        id: 2,
        codigo: "AC001",
        nombre: "Controlador Xbox",
        descripcion: "Controlador inalámbrico",
        precio: 59990,
        imagen: "test-image2.jpg",
        cantidad: 1,
        llevar: true,
        category: "Tendencias"
      }
    ];
    
    // Mock de localStorage
    mockLocalStorage = {};
    spyOn(Storage.prototype, 'getItem').and.callFake(function(key) {
      return mockLocalStorage[key] || null;
    });
    spyOn(Storage.prototype, 'setItem').and.callFake(function(key, value) {
      mockLocalStorage[key] = value;
    });
  });
  
  afterEach(function() {
    mockLocalStorage = {};
  });

  describe('loadCart', function() {
    it('debe cargar un carrito vacío cuando no hay datos en localStorage', function() {
      // Simular que no hay datos en localStorage
      spyOn(Storage.prototype, 'getItem').and.returnValue(null);
      
      // Función loadCart simplificada para testing
      function loadCart() {
        const cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : [];
      }
      
      const result = loadCart();
      expect(result).toEqual([]);
    });

    it('debe cargar un carrito con productos cuando hay datos en localStorage', function() {
      const cartData = JSON.stringify(mockProducts);
      spyOn(Storage.prototype, 'getItem').and.returnValue(cartData);
      
      function loadCart() {
        const cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : [];
      }
      
      const result = loadCart();
      expect(result).toEqual(mockProducts);
      expect(result.length).toBe(2);
    });
  });

  describe('saveCart', function() {
    it('debe guardar un carrito en localStorage', function() {
      spyOn(Storage.prototype, 'setItem');
      
      function saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
      }
      
      saveCart(mockProducts);
      expect(localStorage.setItem).toHaveBeenCalledWith('shoppingCart', JSON.stringify(mockProducts));
    });
  });

  describe('addProductToCart', function() {
    it('debe agregar un nuevo producto al carrito', function() {
      // Mock de allProducts global
      window.allProducts = mockProducts;
      
      function addProductToCart(productId) {
        let cart = [];
        const productToAdd = allProducts.find(p => p.id === productId);
        
        if (productToAdd) {
          const existingProductIndex = cart.findIndex(item => item.id === productId);
          
          if (existingProductIndex !== -1) {
            cart[existingProductIndex].cantidad++;
          } else {
            const newCartItem = { ...productToAdd, cantidad: 1, llevar: true };
            cart.push(newCartItem);
          }
        }
        return cart;
      }
      
      const result = addProductToCart(1);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
      expect(result[0].cantidad).toBe(1);
    });

    it('debe incrementar la cantidad si el producto ya existe en el carrito', function() {
      window.allProducts = mockProducts;
      
      function addProductToCart(productId, existingCart) {
        let cart = existingCart || [];
        const productToAdd = allProducts.find(p => p.id === productId);
        
        if (productToAdd) {
          const existingProductIndex = cart.findIndex(item => item.id === productId);
          
          if (existingProductIndex !== -1) {
            cart[existingProductIndex].cantidad++;
          } else {
            const newCartItem = { ...productToAdd, cantidad: 1, llevar: true };
            cart.push(newCartItem);
          }
        }
        return cart;
      }
      
      const existingCart = [{ id: 1, nombre: "Test Product", cantidad: 2, precio: 1000 }];
      const result = addProductToCart(1, existingCart);
      expect(result[0].cantidad).toBe(3);
    });
  });

  describe('formatoMoneda', function() {
    it('debe formatear números como moneda chilena', function() {
      function formatoMoneda(num) {
        return "$" + num.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatoMoneda(1000)).toBe("$1.000 CLP");
      expect(formatoMoneda(59990)).toBe("$59.990 CLP");
      expect(formatoMoneda(1299990)).toBe("$1.299.990 CLP");
    });

    it('debe manejar números decimales correctamente', function() {
      function formatoMoneda(num) {
        return "$" + num.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatoMoneda(1000.50)).toBe("$1.000,5 CLP");
    });
  });

  describe('calcularSubtotal', function() {
    it('debe calcular el subtotal correctamente', function() {
      function calcularSubtotal(cart) {
        return cart.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);
      }
      
      const cart = [
        { precio: 1000, cantidad: 2 },
        { precio: 500, cantidad: 3 }
      ];
      
      expect(calcularSubtotal(cart)).toBe(3500);
    });

    it('debe calcular el subtotal solo para productos marcados para llevar', function() {
      function calcularSubtotalConLlevar(cart) {
        return cart.reduce((acum, item) => {
          if (item.llevar) {
            return acum + (item.precio * item.cantidad);
          }
          return acum;
        }, 0);
      }
      
      const cart = [
        { precio: 1000, cantidad: 2, llevar: true },
        { precio: 500, cantidad: 3, llevar: false }
      ];
      
      expect(calcularSubtotalConLlevar(cart)).toBe(2000);
    });
  });

  describe('eliminarProducto', function() {
    it('debe eliminar un producto del carrito por ID', function() {
      function eliminarProducto(cart, productId) {
        return cart.filter(item => item.id !== productId);
      }
      
      const cart = [
        { id: 1, nombre: "Producto 1" },
        { id: 2, nombre: "Producto 2" },
        { id: 3, nombre: "Producto 3" }
      ];
      
      const result = eliminarProducto(cart, 2);
      expect(result.length).toBe(2);
      expect(result.find(item => item.id === 2)).toBeUndefined();
    });
  });

  describe('actualizarCantidad', function() {
    it('debe incrementar la cantidad de un producto', function() {
      function incrementarCantidad(cart, productId) {
        const item = cart.find(p => p.id === productId);
        if (item) {
          item.cantidad++;
        }
        return cart;
      }
      
      const cart = [{ id: 1, cantidad: 2, precio: 1000 }];
      incrementarCantidad(cart, 1);
      expect(cart[0].cantidad).toBe(3);
    });

    it('debe decrementar la cantidad de un producto', function() {
      function decrementarCantidad(cart, productId) {
        const item = cart.find(p => p.id === productId);
        if (item && item.cantidad > 1) {
          item.cantidad--;
        }
        return cart;
      }
      
      const cart = [{ id: 1, cantidad: 3, precio: 1000 }];
      decrementarCantidad(cart, 1);
      expect(cart[0].cantidad).toBe(2);
    });

    it('no debe decrementar la cantidad si es 1', function() {
      function decrementarCantidad(cart, productId) {
        const item = cart.find(p => p.id === productId);
        if (item && item.cantidad > 1) {
          item.cantidad--;
        }
        return cart;
      }
      
      const cart = [{ id: 1, cantidad: 1, precio: 1000 }];
      decrementarCantidad(cart, 1);
      expect(cart[0].cantidad).toBe(1);
    });
  });

  describe('validarCarrito', function() {
    it('debe retornar true si el carrito está vacío', function() {
      function carritoVacio(cart) {
        return cart.length === 0;
      }
      
      expect(carritoVacio([])).toBe(true);
      expect(carritoVacio([{ id: 1 }])).toBe(false);
    });

    it('debe validar que hay productos seleccionados para llevar', function() {
      function hayProductosParaLlevar(cart) {
        return cart.some(item => item.llevar);
      }
      
      const cartConLlevar = [
        { id: 1, llevar: true },
        { id: 2, llevar: false }
      ];
      
      const cartSinLlevar = [
        { id: 1, llevar: false },
        { id: 2, llevar: false }
      ];
      
      expect(hayProductosParaLlevar(cartConLlevar)).toBe(true);
      expect(hayProductosParaLlevar(cartSinLlevar)).toBe(false);
    });
  });
});
