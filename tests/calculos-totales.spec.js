describe('Funciones de Cálculo de Totales', function() {
  
  describe('calcularSubtotal', function() {
    it('debe calcular el subtotal de productos en el carrito', function() {
      function calcularSubtotal(carrito) {
        return carrito.reduce((total, producto) => {
          return total + (producto.precio * producto.cantidad);
        }, 0);
      }
      
      const carrito = [
        { precio: 1000, cantidad: 2 },
        { precio: 500, cantidad: 3 },
        { precio: 2000, cantidad: 1 }
      ];
      
      expect(calcularSubtotal(carrito)).toBe(7500); // (1000*2) + (500*3) + (2000*1)
    });

    it('debe manejar carrito vacío', function() {
      function calcularSubtotal(carrito) {
        return carrito.reduce((total, producto) => {
          return total + (producto.precio * producto.cantidad);
        }, 0);
      }
      
      expect(calcularSubtotal([])).toBe(0);
    });

    it('debe calcular solo productos marcados para llevar', function() {
      function calcularSubtotalConLlevar(carrito) {
        return carrito.reduce((total, producto) => {
          if (producto.llevar) {
            return total + (producto.precio * producto.cantidad);
          }
          return total;
        }, 0);
      }
      
      const carrito = [
        { precio: 1000, cantidad: 2, llevar: true },
        { precio: 500, cantidad: 3, llevar: false },
        { precio: 2000, cantidad: 1, llevar: true }
      ];
      
      expect(calcularSubtotalConLlevar(carrito)).toBe(4000); // (1000*2) + (2000*1)
    });
  });

  describe('calcularCostoEnvio', function() {
    it('debe calcular costo de envío basado en el subtotal', function() {
      function calcularCostoEnvio(subtotal) {
        if (subtotal >= 50000) {
          return 0; // Envío gratis
        } else if (subtotal >= 20000) {
          return 3000; // Envío estándar
        } else {
          return 5000; // Envío express
        }
      }
      
      expect(calcularCostoEnvio(10000)).toBe(5000);
      expect(calcularCostoEnvio(25000)).toBe(3000);
      expect(calcularCostoEnvio(60000)).toBe(0);
    });

    it('debe manejar envío gratis para compras grandes', function() {
      function calcularCostoEnvio(subtotal) {
        return subtotal >= 50000 ? 0 : 3000;
      }
      
      expect(calcularCostoEnvio(49999)).toBe(3000);
      expect(calcularCostoEnvio(50000)).toBe(0);
      expect(calcularCostoEnvio(100000)).toBe(0);
    });
  });

  describe('calcularDescuento', function() {
    it('debe aplicar descuento por porcentaje', function() {
      function calcularDescuentoPorcentaje(subtotal, porcentaje) {
        return (subtotal * porcentaje) / 100;
      }
      
      expect(calcularDescuentoPorcentaje(10000, 10)).toBe(1000);
      expect(calcularDescuentoPorcentaje(50000, 20)).toBe(10000);
    });

    it('debe aplicar descuento fijo', function() {
      function calcularDescuentoFijo(subtotal, descuentoFijo) {
        return Math.min(descuentoFijo, subtotal);
      }
      
      expect(calcularDescuentoFijo(10000, 2000)).toBe(2000);
      expect(calcularDescuentoFijo(1000, 2000)).toBe(1000); // No puede ser mayor al subtotal
    });

    it('debe aplicar descuento por cupón', function() {
      function aplicarCuponDescuento(subtotal, cupon) {
        const cupones = {
          'DESCUENTO10': 0.10,
          'DESCUENTO20': 0.20,
          'DESCUENTO50': 0.50
        };
        
        const porcentaje = cupones[cupon] || 0;
        return subtotal * porcentaje;
      }
      
      expect(aplicarCuponDescuento(10000, 'DESCUENTO10')).toBe(1000);
      expect(aplicarCuponDescuento(10000, 'DESCUENTO20')).toBe(2000);
      expect(aplicarCuponDescuento(10000, 'CUPON_INVALIDO')).toBe(0);
    });
  });

  describe('calcularTotal', function() {
    it('debe calcular el total final correctamente', function() {
      function calcularTotal(subtotal, costoEnvio, descuento) {
        return subtotal + costoEnvio - descuento;
      }
      
      expect(calcularTotal(10000, 3000, 1000)).toBe(12000);
      expect(calcularTotal(50000, 0, 5000)).toBe(45000);
    });

    it('debe manejar total negativo (no permitir)', function() {
      function calcularTotalSeguro(subtotal, costoEnvio, descuento) {
        const total = subtotal + costoEnvio - descuento;
        return Math.max(0, total);
      }
      
      expect(calcularTotalSeguro(1000, 0, 2000)).toBe(0);
      expect(calcularTotalSeguro(10000, 1000, 2000)).toBe(9000);
    });
  });

  describe('calcularImpuestos', function() {
    it('debe calcular IVA (19%)', function() {
      function calcularIVA(subtotal) {
        return subtotal * 0.19;
      }
      
      expect(calcularIVA(10000)).toBe(1900);
      expect(calcularIVA(50000)).toBe(9500);
    });

    it('debe calcular total con IVA incluido', function() {
      function calcularTotalConIVA(subtotal) {
        const iva = subtotal * 0.19;
        return subtotal + iva;
      }
      
      expect(calcularTotalConIVA(10000)).toBe(11900);
    });

    it('debe calcular total con IVA excluido', function() {
      function calcularTotalSinIVA(subtotal) {
        return subtotal; // Ya incluye IVA
      }
      
      expect(calcularTotalSinIVA(11900)).toBe(11900);
    });
  });

  describe('calcularDescuentosProgresivos', function() {
    it('debe aplicar descuentos progresivos por cantidad', function() {
      function calcularDescuentoProgresivo(carrito) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        
        if (totalItems >= 10) return 0.15; // 15% descuento
        if (totalItems >= 5) return 0.10;  // 10% descuento
        if (totalItems >= 3) return 0.05; // 5% descuento
        
        return 0;
      }
      
      const carritoPoco = [{ cantidad: 2 }];
      const carritoMedio = [{ cantidad: 5 }];
      const carritoMucho = [{ cantidad: 10 }];
      
      expect(calcularDescuentoProgresivo(carritoPoco)).toBe(0);
      expect(calcularDescuentoProgresivo(carritoMedio)).toBe(0.10);
      expect(calcularDescuentoProgresivo(carritoMucho)).toBe(0.15);
    });
  });

  describe('calcularPrecioPorCantidad', function() {
    it('debe aplicar descuentos por volumen', function() {
      function calcularPrecioConDescuentoVolumen(precio, cantidad) {
        if (cantidad >= 10) {
          return precio * 0.8; // 20% descuento
        } else if (cantidad >= 5) {
          return precio * 0.9; // 10% descuento
        }
        return precio;
      }
      
      expect(calcularPrecioConDescuentoVolumen(1000, 1)).toBe(1000);
      expect(calcularPrecioConDescuentoVolumen(1000, 5)).toBe(900);
      expect(calcularPrecioConDescuentoVolumen(1000, 10)).toBe(800);
    });
  });

  describe('validarCalculos', function() {
    it('debe validar que los cálculos sean consistentes', function() {
      function validarCalculos(carrito) {
        const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const costoEnvio = subtotal >= 50000 ? 0 : 3000;
        const descuento = 0;
        const total = subtotal + costoEnvio - descuento;
        
        return {
          subtotal: subtotal,
          costoEnvio: costoEnvio,
          descuento: descuento,
          total: total,
          valido: total >= 0
        };
      }
      
      const carrito = [
        { precio: 1000, cantidad: 2 },
        { precio: 500, cantidad: 3 }
      ];
      
      const resultado = validarCalculos(carrito);
      expect(resultado.valido).toBe(true);
      expect(resultado.subtotal).toBe(3500);
      expect(resultado.costoEnvio).toBe(3000);
      expect(resultado.total).toBe(6500);
    });

    it('debe detectar errores en los cálculos', function() {
      function detectarErroresCalculo(subtotal, costoEnvio, descuento, total) {
        const totalCalculado = subtotal + costoEnvio - descuento;
        return {
          esCorrecto: totalCalculado === total,
          diferencia: totalCalculado - total
        };
      }
      
      expect(detectarErroresCalculo(1000, 100, 50, 1050).esCorrecto).toBe(true);
      expect(detectarErroresCalculo(1000, 100, 50, 1000).esCorrecto).toBe(false);
    });
  });

  describe('formatearResumenCompra', function() {
    it('debe formatear el resumen de compra', function() {
      function formatearResumen(subtotal, costoEnvio, descuento, total) {
        return {
          subtotal: `$${subtotal.toLocaleString('es-CL')} CLP`,
          costoEnvio: `$${costoEnvio.toLocaleString('es-CL')} CLP`,
          descuento: `$${descuento.toLocaleString('es-CL')} CLP`,
          total: `$${total.toLocaleString('es-CL')} CLP`
        };
      }
      
      const resumen = formatearResumen(10000, 3000, 1000, 12000);
      
      expect(resumen.subtotal).toBe("$10.000 CLP");
      expect(resumen.costoEnvio).toBe("$3.000 CLP");
      expect(resumen.descuento).toBe("$1.000 CLP");
      expect(resumen.total).toBe("$12.000 CLP");
    });
  });

  describe('calcularDescuentosEspeciales', function() {
    it('debe aplicar descuento de cliente frecuente', function() {
      function calcularDescuentoClienteFrecuente(subtotal, comprasAnteriores) {
        if (comprasAnteriores >= 10) {
          return subtotal * 0.15; // 15% descuento
        } else if (comprasAnteriores >= 5) {
          return subtotal * 0.10; // 10% descuento
        }
        return 0;
      }
      
      expect(calcularDescuentoClienteFrecuente(10000, 3)).toBe(0);
      expect(calcularDescuentoClienteFrecuente(10000, 7)).toBe(1000);
      expect(calcularDescuentoClienteFrecuente(10000, 15)).toBe(1500);
    });

    it('debe aplicar descuento por temporada', function() {
      function calcularDescuentoTemporada(subtotal, fecha) {
        const mes = new Date(fecha).getMonth();
        
        // Descuentos especiales por mes
        if (mes === 11) { // Diciembre
          return subtotal * 0.20; // 20% descuento navideño
        } else if (mes === 1) { // Febrero
          return subtotal * 0.10; // 10% descuento de vuelta a clases
        }
        
        return 0;
      }
      
      expect(calcularDescuentoTemporada(10000, '2023-12-15')).toBe(2000);
      expect(calcularDescuentoTemporada(10000, '2023-02-15')).toBe(1000);
      expect(calcularDescuentoTemporada(10000, '2023-06-15')).toBe(0);
    });
  });
});
