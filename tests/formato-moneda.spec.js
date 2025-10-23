describe('Funciones de Formato de Moneda', function() {
  
  describe('formatoMoneda', function() {
    it('debe formatear números enteros correctamente', function() {
      function formatoMoneda(num) {
        return "$" + num.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatoMoneda(1000)).toBe("$1.000 CLP");
      expect(formatoMoneda(59990)).toBe("$59.990 CLP");
      expect(formatoMoneda(1299990)).toBe("$1.299.990 CLP");
      expect(formatoMoneda(0)).toBe("$0 CLP");
    });

    it('debe manejar números decimales correctamente', function() {
      function formatoMoneda(num) {
        return "$" + num.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatoMoneda(1000.50)).toBe("$1.000,5 CLP");
      expect(formatoMoneda(59990.99)).toBe("$59.990,99 CLP");
    });

    it('debe manejar números negativos', function() {
      function formatoMoneda(num) {
        return "$" + num.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatoMoneda(-1000)).toBe("-$1.000 CLP");
      expect(formatoMoneda(-59990)).toBe("-$59.990 CLP");
    });

    it('debe manejar números muy grandes', function() {
      function formatoMoneda(num) {
        return "$" + num.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatoMoneda(1000000)).toBe("$1.000.000 CLP");
      expect(formatoMoneda(10000000)).toBe("$10.000.000 CLP");
    });
  });

  describe('formatoMonedaAlternativo', function() {
    it('debe formatear usando toLocaleString con opciones de moneda', function() {
      function formatoMonedaAlternativo(num) {
        return num.toLocaleString('es-CL', {
          style: 'currency',
          currency: 'CLP'
        });
      }
      
      expect(formatoMonedaAlternativo(1000)).toBe("$1.000");
      expect(formatoMonedaAlternativo(59990)).toBe("$59.990");
    });

    it('debe manejar diferentes configuraciones regionales', function() {
      function formatoMonedaConOpciones(num, locale = 'es-CL') {
        return num.toLocaleString(locale, {
          style: 'currency',
          currency: 'CLP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      }
      
      expect(formatoMonedaConOpciones(1000)).toBe("$1.000");
      expect(formatoMonedaConOpciones(1000, 'en-US')).toBe("CLP1,000");
    });
  });

  describe('validarFormatoMoneda', function() {
    it('debe validar que el formato contiene símbolo de peso', function() {
      function validarFormatoMoneda(formato) {
        return formato.includes('$');
      }
      
      expect(validarFormatoMoneda("$1.000 CLP")).toBe(true);
      expect(validarFormatoMoneda("1000 CLP")).toBe(false);
    });

    it('debe validar que el formato contiene CLP', function() {
      function validarFormatoMoneda(formato) {
        return formato.includes('CLP');
      }
      
      expect(validarFormatoMoneda("$1.000 CLP")).toBe(true);
      expect(validarFormatoMoneda("$1.000")).toBe(false);
    });

    it('debe validar formato completo de moneda chilena', function() {
      function validarFormatoCompleto(formato) {
        const regex = /^\$\d{1,3}(\.\d{3})* CLP$/;
        return regex.test(formato);
      }
      
      expect(validarFormatoCompleto("$1.000 CLP")).toBe(true);
      expect(validarFormatoCompleto("$59.990 CLP")).toBe(true);
      expect(validarFormatoCompleto("$1.299.990 CLP")).toBe(true);
      expect(validarFormatoCompleto("1000 CLP")).toBe(false);
      expect(validarFormatoCompleto("$1000")).toBe(false);
    });
  });

  describe('convertirFormatoMoneda', function() {
    it('debe convertir string de moneda a número', function() {
      function convertirStringANumero(formato) {
        // Remover símbolos y espacios, luego convertir a número
        const numero = formato.replace(/[$\sCLP]/g, '').replace(/\./g, '');
        return parseInt(numero);
      }
      
      expect(convertirStringANumero("$1.000 CLP")).toBe(1000);
      expect(convertirStringANumero("$59.990 CLP")).toBe(59990);
      expect(convertirStringANumero("$1.299.990 CLP")).toBe(1299990);
    });

    it('debe manejar errores en conversión', function() {
      function convertirStringANumeroSeguro(formato) {
        try {
          const numero = formato.replace(/[$\sCLP]/g, '').replace(/\./g, '');
          const resultado = parseInt(numero);
          return isNaN(resultado) ? 0 : resultado;
        } catch (error) {
          return 0;
        }
      }
      
      expect(convertirStringANumeroSeguro("$1.000 CLP")).toBe(1000);
      expect(convertirStringANumeroSeguro("formato inválido")).toBe(0);
      expect(convertirStringANumeroSeguro("")).toBe(0);
    });
  });

  describe('formatearPrecioConDescuento', function() {
    it('debe calcular y formatear precio con descuento', function() {
      function formatearPrecioConDescuento(precio, descuentoPorcentaje) {
        const precioConDescuento = precio * (1 - descuentoPorcentaje / 100);
        return "$" + precioConDescuento.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatearPrecioConDescuento(1000, 10)).toBe("$900 CLP");
      expect(formatearPrecioConDescuento(59990, 20)).toBe("$47.992 CLP");
    });

    it('debe manejar descuentos de 0%', function() {
      function formatearPrecioConDescuento(precio, descuentoPorcentaje) {
        const precioConDescuento = precio * (1 - descuentoPorcentaje / 100);
        return "$" + precioConDescuento.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatearPrecioConDescuento(1000, 0)).toBe("$1.000 CLP");
    });

    it('debe manejar descuentos de 100%', function() {
      function formatearPrecioConDescuento(precio, descuentoPorcentaje) {
        const precioConDescuento = precio * (1 - descuentoPorcentaje / 100);
        return "$" + precioConDescuento.toLocaleString("es-CL") + " CLP";
      }
      
      expect(formatearPrecioConDescuento(1000, 100)).toBe("$0 CLP");
    });
  });

  describe('formatearRangoPrecios', function() {
    it('debe formatear un rango de precios', function() {
      function formatearRangoPrecios(precioMin, precioMax) {
        const formatoMin = "$" + precioMin.toLocaleString("es-CL") + " CLP";
        const formatoMax = "$" + precioMax.toLocaleString("es-CL") + " CLP";
        return `${formatoMin} - ${formatoMax}`;
      }
      
      expect(formatearRangoPrecios(1000, 5000)).toBe("$1.000 CLP - $5.000 CLP");
      expect(formatearRangoPrecios(29990, 59990)).toBe("$29.990 CLP - $59.990 CLP");
    });

    it('debe manejar precios iguales', function() {
      function formatearRangoPrecios(precioMin, precioMax) {
        if (precioMin === precioMax) {
          return "$" + precioMin.toLocaleString("es-CL") + " CLP";
        }
        const formatoMin = "$" + precioMin.toLocaleString("es-CL") + " CLP";
        const formatoMax = "$" + precioMax.toLocaleString("es-CL") + " CLP";
        return `${formatoMin} - ${formatoMax}`;
      }
      
      expect(formatearRangoPrecios(1000, 1000)).toBe("$1.000 CLP");
    });
  });
});
