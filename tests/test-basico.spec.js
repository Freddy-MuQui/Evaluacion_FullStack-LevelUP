describe('Test Básico de Funcionamiento', function() {
  
  beforeEach(function() {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  describe('Verificar funciones básicas', function() {
    it('debe formatear moneda correctamente', function() {
      expect(formatoMoneda(1000)).toBe("$1.000 CLP");
      expect(formatoMoneda(59990)).toBe("$59.990 CLP");
    });

    it('debe cargar carrito vacío', function() {
      const cart = loadCart();
      expect(Array.isArray(cart)).toBe(true);
      expect(cart.length).toBe(0);
    });

    it('debe guardar y cargar carrito', function() {
      const testCart = [{id: 1, nombre: "test", precio: 1000, cantidad: 1}];
      saveCart(testCart);
      const loaded = loadCart();
      expect(loaded.length).toBe(1);
      expect(loaded[0].nombre).toBe("test");
    });
  });

  describe('Verificar productos', function() {
    it('debe tener productos definidos', function() {
      expect(allProducts).toBeDefined();
      expect(Array.isArray(allProducts)).toBe(true);
      expect(allProducts.length).toBeGreaterThan(0);
    });

    it('debe tener productos con estructura correcta', function() {
      const producto = allProducts[0];
      expect(producto.id).toBeDefined();
      expect(producto.nombre).toBeDefined();
      expect(producto.precio).toBeDefined();
    });
  });

  describe('Test de funciones del carrito', function() {
    it('debe agregar producto al carrito', function() {
      const resultado = addProductToCart(1);
      expect(resultado.success).toBe(true);
      
      const cart = loadCart();
      expect(cart.length).toBe(1);
      expect(cart[0].id).toBe(1);
    });

    it('debe calcular subtotal correctamente', function() {
      const cart = [
        {precio: 1000, cantidad: 2, llevar: true},
        {precio: 500, cantidad: 3, llevar: true}
      ];
      expect(calcularSubtotal(cart)).toBe(3500);
    });

    it('debe calcular total correctamente', function() {
      const subtotal = 1000;
      const costoEnvio = 500;
      const descuento = 100;
      expect(calcularTotal(subtotal, costoEnvio, descuento)).toBe(1400);
    });

    it('debe eliminar producto del carrito', function() {
      const cart = [
        {id: 1, nombre: "Producto 1"},
        {id: 2, nombre: "Producto 2"}
      ];
      const nuevoCart = eliminarProducto(cart, 1);
      expect(nuevoCart.length).toBe(1);
      expect(nuevoCart[0].id).toBe(2);
    });

    it('debe actualizar cantidad de producto', function() {
      const cart = [
        {id: 1, nombre: "Producto 1", cantidad: 2}
      ];
      const nuevoCart = actualizarCantidad(cart, 1, 5);
      expect(nuevoCart[0].cantidad).toBe(5);
    });
  });
});
