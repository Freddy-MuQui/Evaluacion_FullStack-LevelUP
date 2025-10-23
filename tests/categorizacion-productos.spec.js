describe('Funciones de Categorización de Productos', function() {
  let mockProducts;
  
  beforeEach(function() {
    mockProducts = [
      {
        id: 1,
        codigo: "JM001",
        nombre: "Juegos de Mesa Catan",
        descripcion: "Un clásico juego de estrategia",
        precio: 29990,
        categoria: "Juegos de Mesa",
        category: "Mi lista",
        tags: ["estrategia", "familiar", "2-4 jugadores"]
      },
      {
        id: 2,
        codigo: "AC001",
        nombre: "Controlador Inalámbrico Xbox Series X",
        descripcion: "Controlador inalámbrico para Xbox",
        precio: 59990,
        categoria: "Accesorios",
        category: "Tendencias",
        tags: ["xbox", "inalámbrico", "gaming"]
      },
      {
        id: 3,
        codigo: "CO001",
        nombre: "PlayStation 5",
        descripcion: "Consola de última generación",
        precio: 549990,
        categoria: "Consolas",
        category: "Mi lista",
        tags: ["sony", "next-gen", "gaming"]
      },
      {
        id: 4,
        codigo: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        descripcion: "Mouse gaming de alta precisión",
        precio: 49990,
        categoria: "Accesorios",
        category: "Tendencias",
        tags: ["gaming", "precisión", "rgb"]
      }
    ];
  });

  describe('agruparPorCategoria', function() {
    it('debe agrupar productos por categoría', function() {
      function agruparPorCategoria(productos) {
        return productos.reduce((grupos, producto) => {
          const categoria = producto.categoria;
          if (!grupos[categoria]) {
            grupos[categoria] = [];
          }
          grupos[categoria].push(producto);
          return grupos;
        }, {});
      }
      
      const grupos = agruparPorCategoria(mockProducts);
      
      expect(Object.keys(grupos)).toContain("Juegos de Mesa");
      expect(Object.keys(grupos)).toContain("Accesorios");
      expect(Object.keys(grupos)).toContain("Consolas");
      expect(grupos["Accesorios"].length).toBe(2);
    });

    it('debe manejar productos sin categoría', function() {
      function agruparPorCategoria(productos) {
        return productos.reduce((grupos, producto) => {
          const categoria = producto.categoria || "Sin categoría";
          if (!grupos[categoria]) {
            grupos[categoria] = [];
          }
          grupos[categoria].push(producto);
          return grupos;
        }, {});
      }
      
      const productosSinCategoria = [
        { id: 1, nombre: "Producto 1" },
        { id: 2, nombre: "Producto 2", categoria: "Categoría A" }
      ];
      
      const grupos = agruparPorCategoria(productosSinCategoria);
      expect(grupos["Sin categoría"].length).toBe(1);
      expect(grupos["Categoría A"].length).toBe(1);
    });
  });

  describe('filtrarPorCategoria', function() {
    it('debe filtrar productos por categoría específica', function() {
      function filtrarPorCategoria(productos, categoria) {
        return productos.filter(producto => producto.categoria === categoria);
      }
      
      const accesorios = filtrarPorCategoria(mockProducts, "Accesorios");
      expect(accesorios.length).toBe(2);
      expect(accesorios.every(p => p.categoria === "Accesorios")).toBe(true);
    });

    it('debe retornar array vacío si no hay productos en la categoría', function() {
      function filtrarPorCategoria(productos, categoria) {
        return productos.filter(producto => producto.categoria === categoria);
      }
      
      const resultados = filtrarPorCategoria(mockProducts, "Categoría Inexistente");
      expect(resultados.length).toBe(0);
    });
  });

  describe('obtenerCategorias', function() {
    it('debe obtener lista única de categorías', function() {
      function obtenerCategorias(productos) {
        const categorias = productos.map(p => p.categoria);
        return [...new Set(categorias)];
      }
      
      const categorias = obtenerCategorias(mockProducts);
      expect(categorias).toContain("Juegos de Mesa");
      expect(categorias).toContain("Accesorios");
      expect(categorias).toContain("Consolas");
      expect(categorias.length).toBe(3);
    });

    it('debe ordenar categorías alfabéticamente', function() {
      function obtenerCategoriasOrdenadas(productos) {
        const categorias = productos.map(p => p.categoria);
        return [...new Set(categorias)].sort();
      }
      
      const categorias = obtenerCategoriasOrdenadas(mockProducts);
      expect(categorias[0]).toBe("Accesorios");
      expect(categorias[1]).toBe("Consolas");
      expect(categorias[2]).toBe("Juegos de Mesa");
    });
  });

  describe('contarProductosPorCategoria', function() {
    it('debe contar productos en cada categoría', function() {
      function contarProductosPorCategoria(productos) {
        return productos.reduce((contadores, producto) => {
          const categoria = producto.categoria;
          contadores[categoria] = (contadores[categoria] || 0) + 1;
          return contadores;
        }, {});
      }
      
      const contadores = contarProductosPorCategoria(mockProducts);
      expect(contadores["Accesorios"]).toBe(2);
      expect(contadores["Juegos de Mesa"]).toBe(1);
      expect(contadores["Consolas"]).toBe(1);
    });
  });

  describe('categorizarPorPrecio', function() {
    it('debe categorizar productos por rango de precio', function() {
      function categorizarPorPrecio(productos) {
        return productos.reduce((categorias, producto) => {
          let categoriaPrecio;
          if (producto.precio < 10000) {
            categoriaPrecio = "Económico";
          } else if (producto.precio < 100000) {
            categoriaPrecio = "Medio";
          } else {
            categoriaPrecio = "Premium";
          }
          
          if (!categorias[categoriaPrecio]) {
            categorias[categoriaPrecio] = [];
          }
          categorias[categoriaPrecio].push(producto);
          return categorias;
        }, {});
      }
      
      const categoriasPrecio = categorizarPorPrecio(mockProducts);
      expect(categoriasPrecio["Económico"].length).toBe(0);
      expect(categoriasPrecio["Medio"].length).toBe(3);
      expect(categoriasPrecio["Premium"].length).toBe(1);
    });
  });

  describe('categorizarPorTags', function() {
    it('debe agrupar productos por tags', function() {
      function agruparPorTags(productos) {
        const grupos = {};
        
        productos.forEach(producto => {
          if (producto.tags) {
            producto.tags.forEach(tag => {
              if (!grupos[tag]) {
                grupos[tag] = [];
              }
              grupos[tag].push(producto);
            });
          }
        });
        
        return grupos;
      }
      
      const gruposTags = agruparPorTags(mockProducts);
      expect(gruposTags["gaming"].length).toBe(2);
      expect(gruposTags["estrategia"].length).toBe(1);
    });
  });

  describe('categorizarPorDisponibilidad', function() {
    it('debe separar productos disponibles y no disponibles', function() {
      function categorizarPorDisponibilidad(productos) {
        return productos.reduce((categorias, producto) => {
          const disponible = producto.disponible !== false;
          const categoria = disponible ? "Disponible" : "No disponible";
          
          if (!categorias[categoria]) {
            categorias[categoria] = [];
          }
          categorias[categoria].push(producto);
          return categorias;
        }, {});
      }
      
      const productosConDisponibilidad = [
        { id: 1, nombre: "Producto 1", disponible: true },
        { id: 2, nombre: "Producto 2", disponible: false },
        { id: 3, nombre: "Producto 3" } // disponible por defecto
      ];
      
      const categorias = categorizarPorDisponibilidad(productosConDisponibilidad);
      expect(categorias["Disponible"].length).toBe(2);
      expect(categorias["No disponible"].length).toBe(1);
    });
  });

  describe('categorizarPorPopularidad', function() {
    it('debe categorizar productos por nivel de popularidad', function() {
      function categorizarPorPopularidad(productos) {
        return productos.reduce((categorias, producto) => {
          let categoriaPopularidad;
          const ventas = producto.ventas || 0;
          
          if (ventas >= 100) {
            categoriaPopularidad = "Muy Popular";
          } else if (ventas >= 50) {
            categoriaPopularidad = "Popular";
          } else if (ventas >= 10) {
            categoriaPopularidad = "Moderado";
          } else {
            categoriaPopularidad = "Nuevo";
          }
          
          if (!categorias[categoriaPopularidad]) {
            categorias[categoriaPopularidad] = [];
          }
          categorias[categoriaPopularidad].push(producto);
          return categorias;
        }, {});
      }
      
      const productosConVentas = [
        { id: 1, nombre: "Producto 1", ventas: 150 },
        { id: 2, nombre: "Producto 2", ventas: 75 },
        { id: 3, nombre: "Producto 3", ventas: 25 },
        { id: 4, nombre: "Producto 4", ventas: 5 }
      ];
      
      const categorias = categorizarPorPopularidad(productosConVentas);
      expect(categorias["Muy Popular"].length).toBe(1);
      expect(categorias["Popular"].length).toBe(1);
      expect(categorias["Moderado"].length).toBe(1);
      expect(categorias["Nuevo"].length).toBe(1);
    });
  });

  describe('categorizarPorEdad', function() {
    it('debe categorizar productos por rango de edad recomendado', function() {
      function categorizarPorEdad(productos) {
        return productos.reduce((categorias, producto) => {
          let categoriaEdad;
          const edadMinima = producto.edadMinima || 0;
          
          if (edadMinima >= 18) {
            categoriaEdad = "Adultos";
          } else if (edadMinima >= 13) {
            categoriaEdad = "Adolescentes";
          } else if (edadMinima >= 6) {
            categoriaEdad = "Niños";
          } else {
            categoriaEdad = "Todas las edades";
          }
          
          if (!categorias[categoriaEdad]) {
            categorias[categoriaEdad] = [];
          }
          categorias[categoriaEdad].push(producto);
          return categorias;
        }, {});
      }
      
      const productosConEdad = [
        { id: 1, nombre: "Juego Violento", edadMinima: 18 },
        { id: 2, nombre: "Juego Adolescente", edadMinima: 13 },
        { id: 3, nombre: "Juego Infantil", edadMinima: 6 },
        { id: 4, nombre: "Juego Familiar" }
      ];
      
      const categorias = categorizarPorEdad(productosConEdad);
      expect(categorias["Adultos"].length).toBe(1);
      expect(categorias["Adolescentes"].length).toBe(1);
      expect(categorias["Niños"].length).toBe(1);
      expect(categorias["Todas las edades"].length).toBe(1);
    });
  });

  describe('categorizarPorTemporada', function() {
    it('debe categorizar productos por temporada', function() {
      function categorizarPorTemporada(productos) {
        return productos.reduce((categorias, producto) => {
          let categoriaTemporada = "General";
          
          if (producto.temporada) {
            categoriaTemporada = producto.temporada;
          }
          
          if (!categorias[categoriaTemporada]) {
            categorias[categoriaTemporada] = [];
          }
          categorias[categoriaTemporada].push(producto);
          return categorias;
        }, {});
      }
      
      const productosConTemporada = [
        { id: 1, nombre: "Juego Navideño", temporada: "Navidad" },
        { id: 2, nombre: "Juego de Verano", temporada: "Verano" },
        { id: 3, nombre: "Juego General" }
      ];
      
      const categorias = categorizarPorTemporada(productosConTemporada);
      expect(categorias["Navidad"].length).toBe(1);
      expect(categorias["Verano"].length).toBe(1);
      expect(categorias["General"].length).toBe(1);
    });
  });

  describe('categorizarPorTipo', function() {
    it('debe categorizar productos por tipo de producto', function() {
      function categorizarPorTipo(productos) {
        return productos.reduce((categorias, producto) => {
          let tipo = "Otros";
          
          if (producto.nombre.toLowerCase().includes("juego")) {
            tipo = "Juegos";
          } else if (producto.nombre.toLowerCase().includes("controlador") || 
                     producto.nombre.toLowerCase().includes("mouse")) {
            tipo = "Periféricos";
          } else if (producto.nombre.toLowerCase().includes("playstation") || 
                     producto.nombre.toLowerCase().includes("xbox")) {
            tipo = "Consolas";
          }
          
          if (!categorias[tipo]) {
            categorias[tipo] = [];
          }
          categorias[tipo].push(producto);
          return categorias;
        }, {});
      }
      
      const categorias = categorizarPorTipo(mockProducts);
      expect(categorias["Juegos"].length).toBe(1);
      expect(categorias["Periféricos"].length).toBe(2);
      expect(categorias["Consolas"].length).toBe(1);
    });
  });

  describe('obtenerEstadisticasCategoria', function() {
    it('debe obtener estadísticas de cada categoría', function() {
      function obtenerEstadisticasCategoria(productos) {
        const categorias = {};
        
        productos.forEach(producto => {
          const categoria = producto.categoria;
          if (!categorias[categoria]) {
            categorias[categoria] = {
              total: 0,
              precioPromedio: 0,
              precioMinimo: Infinity,
              precioMaximo: 0,
              productos: []
            };
          }
          
          categorias[categoria].total++;
          categorias[categoria].precioMinimo = Math.min(categorias[categoria].precioMinimo, producto.precio);
          categorias[categoria].precioMaximo = Math.max(categorias[categoria].precioMaximo, producto.precio);
          categorias[categoria].productos.push(producto);
        });
        
        // Calcular precio promedio
        Object.keys(categorias).forEach(categoria => {
          const total = categorias[categoria].productos.reduce((sum, p) => sum + p.precio, 0);
          categorias[categoria].precioPromedio = total / categorias[categoria].total;
        });
        
        return categorias;
      }
      
      const estadisticas = obtenerEstadisticasCategoria(mockProducts);
      expect(estadisticas["Accesorios"].total).toBe(2);
      expect(estadisticas["Accesorios"].precioPromedio).toBe(54990);
      expect(estadisticas["Accesorios"].precioMinimo).toBe(49990);
      expect(estadisticas["Accesorios"].precioMaximo).toBe(59990);
    });
  });
});
