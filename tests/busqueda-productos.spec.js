describe('Funciones de Búsqueda de Productos', function() {
  let mockProducts;
  
  beforeEach(function() {
    mockProducts = [
      {
        id: 1,
        codigo: "JM001",
        nombre: "Juegos de Mesa Catan",
        descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar",
        precio: 29990,
        categoria: "Juegos de Mesa",
        category: "Mi lista"
      },
      {
        id: 2,
        codigo: "AC001",
        nombre: "Controlador Inalámbrico Xbox Series X",
        descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables",
        precio: 59990,
        categoria: "Accesorios",
        category: "Tendencias"
      },
      {
        id: 3,
        codigo: "CO001",
        nombre: "PlayStation 5",
        descripcion: "La consola de última generación de Sony",
        precio: 549990,
        categoria: "Consolas",
        category: "Mi lista"
      },
      {
        id: 4,
        codigo: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        descripcion: "Con sensor de alta precisión y botones personalizables",
        precio: 49990,
        categoria: "Accesorios",
        category: "Tendencias"
      }
    ];
  });

  describe('buscarPorTexto', function() {
    it('debe buscar productos por nombre', function() {
      function buscarPorTexto(productos, termino) {
        const terminoLower = termino.toLowerCase();
        return productos.filter(producto => 
          producto.nombre.toLowerCase().includes(terminoLower) ||
          producto.descripcion.toLowerCase().includes(terminoLower)
        );
      }
      
      const resultados = buscarPorTexto(mockProducts, "xbox");
      expect(resultados.length).toBe(1);
      expect(resultados[0].nombre).toContain("Xbox");
    });

    it('debe buscar productos por descripción', function() {
      function buscarPorTexto(productos, termino) {
        const terminoLower = termino.toLowerCase();
        return productos.filter(producto => 
          producto.nombre.toLowerCase().includes(terminoLower) ||
          producto.descripcion.toLowerCase().includes(terminoLower)
        );
      }
      
      const resultados = buscarPorTexto(mockProducts, "estrategia");
      expect(resultados.length).toBe(1);
      expect(resultados[0].nombre).toContain("Catan");
    });

    it('debe retornar array vacío si no encuentra resultados', function() {
      function buscarPorTexto(productos, termino) {
        const terminoLower = termino.toLowerCase();
        return productos.filter(producto => 
          producto.nombre.toLowerCase().includes(terminoLower) ||
          producto.descripcion.toLowerCase().includes(terminoLower)
        );
      }
      
      const resultados = buscarPorTexto(mockProducts, "producto_inexistente");
      expect(resultados.length).toBe(0);
    });

    it('debe ser case-insensitive', function() {
      function buscarPorTexto(productos, termino) {
        const terminoLower = termino.toLowerCase();
        return productos.filter(producto => 
          producto.nombre.toLowerCase().includes(terminoLower) ||
          producto.descripcion.toLowerCase().includes(terminoLower)
        );
      }
      
      const resultados1 = buscarPorTexto(mockProducts, "PLAYSTATION");
      const resultados2 = buscarPorTexto(mockProducts, "playstation");
      const resultados3 = buscarPorTexto(mockProducts, "PlayStation");
      
      expect(resultados1.length).toBe(1);
      expect(resultados2.length).toBe(1);
      expect(resultados3.length).toBe(1);
    });
  });

  describe('buscarPorCategoria', function() {
    it('debe filtrar productos por categoría', function() {
      function buscarPorCategoria(productos, categoria) {
        return productos.filter(producto => producto.categoria === categoria);
      }
      
      const resultados = buscarPorCategoria(mockProducts, "Accesorios");
      expect(resultados.length).toBe(2);
      expect(resultados.every(p => p.categoria === "Accesorios")).toBe(true);
    });

    it('debe retornar todos los productos si no se especifica categoría', function() {
      function buscarPorCategoria(productos, categoria) {
        if (!categoria) return productos;
        return productos.filter(producto => producto.categoria === categoria);
      }
      
      const resultados = buscarPorCategoria(mockProducts, "");
      expect(resultados.length).toBe(mockProducts.length);
    });
  });

  describe('buscarPorPrecio', function() {
    it('debe filtrar productos por rango de precio', function() {
      function buscarPorPrecio(productos, precioMin, precioMax) {
        return productos.filter(producto => 
          producto.precio >= precioMin && producto.precio <= precioMax
        );
      }
      
      const resultados = buscarPorPrecio(mockProducts, 20000, 60000);
      expect(resultados.length).toBe(2);
      expect(resultados.every(p => p.precio >= 20000 && p.precio <= 60000)).toBe(true);
    });

    it('debe filtrar productos con precio mínimo', function() {
      function buscarPorPrecioMinimo(productos, precioMin) {
        return productos.filter(producto => producto.precio >= precioMin);
      }
      
      const resultados = buscarPorPrecioMinimo(mockProducts, 50000);
      expect(resultados.length).toBe(1);
      expect(resultados[0].precio).toBeGreaterThanOrEqual(50000);
    });

    it('debe filtrar productos con precio máximo', function() {
      function buscarPorPrecioMaximo(productos, precioMax) {
        return productos.filter(producto => producto.precio <= precioMax);
      }
      
      const resultados = buscarPorPrecioMaximo(mockProducts, 50000);
      expect(resultados.length).toBe(3);
      expect(resultados.every(p => p.precio <= 50000)).toBe(true);
    });
  });

  describe('buscarAvanzada', function() {
    it('debe combinar múltiples criterios de búsqueda', function() {
      function buscarAvanzada(productos, criterios) {
        return productos.filter(producto => {
          const coincideTexto = !criterios.texto || 
            producto.nombre.toLowerCase().includes(criterios.texto.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(criterios.texto.toLowerCase());
          
          const coincideCategoria = !criterios.categoria || 
            producto.categoria === criterios.categoria;
          
          const coincidePrecio = !criterios.precioMin || 
            producto.precio >= criterios.precioMin;
          
          const coincidePrecioMax = !criterios.precioMax || 
            producto.precio <= criterios.precioMax;
          
          return coincideTexto && coincideCategoria && coincidePrecio && coincidePrecioMax;
        });
      }
      
      const criterios = {
        texto: "gamer",
        categoria: "Accesorios",
        precioMin: 40000,
        precioMax: 60000
      };
      
      const resultados = buscarAvanzada(mockProducts, criterios);
      expect(resultados.length).toBe(1);
      expect(resultados[0].nombre).toContain("Mouse");
    });
  });

  describe('ordenarResultados', function() {
    it('debe ordenar por nombre alfabéticamente', function() {
      function ordenarPorNombre(productos, ascendente = true) {
        return productos.sort((a, b) => {
          const comparacion = a.nombre.localeCompare(b.nombre);
          return ascendente ? comparacion : -comparacion;
        });
      }
      
      const resultados = ordenarPorNombre(mockProducts);
      expect(resultados[0].nombre).toBe("Controlador Inalámbrico Xbox Series X");
      expect(resultados[resultados.length - 1].nombre).toBe("PlayStation 5");
    });

    it('debe ordenar por precio', function() {
      function ordenarPorPrecio(productos, ascendente = true) {
        return productos.sort((a, b) => {
          return ascendente ? a.precio - b.precio : b.precio - a.precio;
        });
      }
      
      const resultados = ordenarPorPrecio(mockProducts);
      expect(resultados[0].precio).toBe(29990);
      expect(resultados[resultados.length - 1].precio).toBe(549990);
    });

    it('debe ordenar por relevancia (búsqueda)', function() {
      function ordenarPorRelevancia(productos, termino) {
        return productos.sort((a, b) => {
          const scoreA = calcularRelevancia(a, termino);
          const scoreB = calcularRelevancia(b, termino);
          return scoreB - scoreA;
        });
      }
      
      function calcularRelevancia(producto, termino) {
        let score = 0;
        const terminoLower = termino.toLowerCase();
        
        if (producto.nombre.toLowerCase().includes(terminoLower)) score += 3;
        if (producto.descripcion.toLowerCase().includes(terminoLower)) score += 1;
        
        return score;
      }
      
      const resultados = ordenarPorRelevancia(mockProducts, "gamer");
      expect(resultados[0].nombre).toContain("Mouse");
    });
  });

  describe('buscarConAutocompletado', function() {
    it('debe sugerir productos mientras se escribe', function() {
      function obtenerSugerencias(productos, termino, limite = 5) {
        if (termino.length < 2) return [];
        
        const sugerencias = productos.filter(producto => 
          producto.nombre.toLowerCase().includes(termino.toLowerCase())
        ).slice(0, limite);
        
        return sugerencias.map(p => p.nombre);
      }
      
      const sugerencias = obtenerSugerencias(mockProducts, "xbox");
      expect(sugerencias.length).toBe(1);
      expect(sugerencias[0]).toContain("Xbox");
    });

    it('debe limitar el número de sugerencias', function() {
      function obtenerSugerencias(productos, termino, limite = 3) {
        if (termino.length < 2) return [];
        
        const sugerencias = productos.filter(producto => 
          producto.nombre.toLowerCase().includes(termino.toLowerCase())
        ).slice(0, limite);
        
        return sugerencias.map(p => p.nombre);
      }
      
      const sugerencias = obtenerSugerencias(mockProducts, "a", 2);
      expect(sugerencias.length).toBeLessThanOrEqual(2);
    });
  });

  describe('buscarConHistorial', function() {
    it('debe guardar términos de búsqueda en historial', function() {
      let historial = [];
      
      function agregarAlHistorial(termino) {
        if (termino && !historial.includes(termino)) {
          historial.unshift(termino);
          if (historial.length > 10) {
            historial = historial.slice(0, 10);
          }
        }
      }
      
      agregarAlHistorial("xbox");
      agregarAlHistorial("playstation");
      agregarAlHistorial("mouse");
      
      expect(historial.length).toBe(3);
      expect(historial[0]).toBe("mouse");
    });

    it('debe obtener historial de búsquedas', function() {
      let historial = ["xbox", "playstation", "mouse"];
      
      function obtenerHistorial() {
        return historial;
      }
      
      const historialObtenido = obtenerHistorial();
      expect(historialObtenido).toEqual(["xbox", "playstation", "mouse"]);
    });
  });

  describe('buscarConFiltros', function() {
    it('debe aplicar filtros múltiples', function() {
      function aplicarFiltros(productos, filtros) {
        return productos.filter(producto => {
          const coincideCategoria = !filtros.categoria || 
            producto.categoria === filtros.categoria;
          
          const coincidePrecio = !filtros.precioMin || 
            producto.precio >= filtros.precioMin;
          
          const coincideDisponibilidad = !filtros.disponible || 
            producto.disponible !== false;
          
          return coincideCategoria && coincidePrecio && coincideDisponibilidad;
        });
      }
      
      const filtros = {
        categoria: "Accesorios",
        precioMin: 40000
      };
      
      const resultados = aplicarFiltros(mockProducts, filtros);
      expect(resultados.length).toBe(2);
      expect(resultados.every(p => p.categoria === "Accesorios")).toBe(true);
    });
  });

  describe('buscarConPaginacion', function() {
    it('debe paginar resultados de búsqueda', function() {
      function paginarResultados(productos, pagina, elementosPorPagina) {
        const inicio = (pagina - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        return productos.slice(inicio, fin);
      }
      
      const resultados = paginarResultados(mockProducts, 1, 2);
      expect(resultados.length).toBe(2);
      
      const resultados2 = paginarResultados(mockProducts, 2, 2);
      expect(resultados2.length).toBe(2);
    });

    it('debe calcular total de páginas', function() {
      function calcularTotalPaginas(totalElementos, elementosPorPagina) {
        return Math.ceil(totalElementos / elementosPorPagina);
      }
      
      expect(calcularTotalPaginas(4, 2)).toBe(2);
      expect(calcularTotalPaginas(5, 2)).toBe(3);
      expect(calcularTotalPaginas(0, 2)).toBe(0);
    });
  });

  describe('validarBusqueda', function() {
    it('debe validar términos de búsqueda', function() {
      function validarTerminoBusqueda(termino) {
        if (!termino || termino.trim().length < 2) {
          return { valido: false, mensaje: "Mínimo 2 caracteres" };
        }
        
        if (termino.length > 50) {
          return { valido: false, mensaje: "Máximo 50 caracteres" };
        }
        
        return { valido: true, mensaje: "" };
      }
      
      expect(validarTerminoBusqueda("x")).valido.toBe(false);
      expect(validarTerminoBusqueda("xbox")).valido.toBe(true);
      expect(validarTerminoBusqueda("a".repeat(51))).valido.toBe(false);
    });
  });
});
