describe('Funciones de Renderizado de Productos', function() {
  let mockProducts;
  let mockContainer;
  
  beforeEach(function() {
    // Mock de productos
    mockProducts = [
      {
        id: 1,
        codigo: "JM001",
        nombre: "Juegos de Mesa Catan",
        descripcion: "Un clásico juego de estrategia",
        precio: 29990,
        imagen: "https://example.com/catan.jpg",
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
        imagen: "https://example.com/xbox.jpg",
        cantidad: 1,
        llevar: true,
        category: "Tendencias"
      }
    ];
    
    // Mock del DOM
    mockContainer = {
      innerHTML: '',
      appendChild: jasmine.createSpy('appendChild'),
      querySelector: jasmine.createSpy('querySelector'),
      querySelectorAll: jasmine.createSpy('querySelectorAll')
    };
  });

  describe('crearElementoProducto', function() {
    it('debe crear un elemento de producto con datos correctos', function() {
      function crearElementoProducto(producto) {
        const elemento = document.createElement('div');
        elemento.className = 'producto-item';
        elemento.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <span class="precio">$${producto.precio.toLocaleString('es-CL')} CLP</span>
        `;
        return elemento;
      }
      
      const elemento = crearElementoProducto(mockProducts[0]);
      
      expect(elemento.className).toBe('producto-item');
      expect(elemento.innerHTML).toContain('Juegos de Mesa Catan');
      expect(elemento.innerHTML).toContain('$29.990 CLP');
    });

    it('debe crear elemento con botón de agregar al carrito', function() {
      function crearElementoProductoConBoton(producto) {
        const elemento = document.createElement('div');
        elemento.className = 'producto-item';
        elemento.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <span class="precio">$${producto.precio.toLocaleString('es-CL')} CLP</span>
          <button class="btn-agregar" data-product-id="${producto.id}">Agregar al Carrito</button>
        `;
        return elemento;
      }
      
      const elemento = crearElementoProductoConBoton(mockProducts[0]);
      const boton = elemento.querySelector('.btn-agregar');
      
      expect(boton).toBeTruthy();
      expect(boton.getAttribute('data-product-id')).toBe('1');
    });
  });

  describe('renderizarListaProductos', function() {
    it('debe renderizar una lista de productos', function() {
      function renderizarListaProductos(productos, container) {
        container.innerHTML = '';
        productos.forEach(producto => {
          const elemento = document.createElement('div');
          elemento.className = 'producto-item';
          elemento.innerHTML = `
            <h3>${producto.nombre}</h3>
            <span class="precio">$${producto.precio.toLocaleString('es-CL')} CLP</span>
          `;
          container.appendChild(elemento);
        });
      }
      
      renderizarListaProductos(mockProducts, mockContainer);
      
      expect(mockContainer.innerHTML).toBe('');
      expect(mockContainer.appendChild).toHaveBeenCalledTimes(2);
    });

    it('debe manejar lista vacía', function() {
      function renderizarListaProductos(productos, container) {
        if (productos.length === 0) {
          container.innerHTML = '<p>No hay productos disponibles</p>';
          return;
        }
        
        container.innerHTML = '';
        productos.forEach(producto => {
          const elemento = document.createElement('div');
          elemento.className = 'producto-item';
          elemento.innerHTML = `<h3>${producto.nombre}</h3>`;
          container.appendChild(elemento);
        });
      }
      
      renderizarListaProductos([], mockContainer);
      expect(mockContainer.innerHTML).toBe('<p>No hay productos disponibles</p>');
    });
  });

  describe('renderizarCarousel', function() {
    it('debe crear elementos de carousel', function() {
      function crearElementoCarousel(producto) {
        const elemento = document.createElement('div');
        elemento.className = 'carousel-item';
        elemento.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="carousel-item__details">
            <p class="carousel-item__details--title">${producto.nombre}</p>
            <p class="carousel-item__details--subtitle">${producto.descripcion}</p>
            <p class="carousel-item__details--price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
          </div>
        `;
        return elemento;
      }
      
      const elemento = crearElementoCarousel(mockProducts[0]);
      
      expect(elemento.className).toBe('carousel-item');
      expect(elemento.innerHTML).toContain('carousel-item__details');
    });

    it('debe renderizar carousel con navegación', function() {
      function renderizarCarouselConNavegacion(productos, container) {
        container.innerHTML = `
          <div class="carousel-container">
            <button class="carousel-prev">‹</button>
            <div class="carousel-items"></div>
            <button class="carousel-next">›</button>
          </div>
        `;
        
        const itemsContainer = container.querySelector('.carousel-items');
        productos.forEach(producto => {
          const elemento = document.createElement('div');
          elemento.className = 'carousel-item';
          elemento.innerHTML = `<h3>${producto.nombre}</h3>`;
          itemsContainer.appendChild(elemento);
        });
      }
      
      renderizarCarouselConNavegacion(mockProducts, mockContainer);
      
      expect(mockContainer.innerHTML).toContain('carousel-container');
      expect(mockContainer.innerHTML).toContain('carousel-prev');
      expect(mockContainer.innerHTML).toContain('carousel-next');
    });
  });

  describe('renderizarTablaCarrito', function() {
    it('debe crear fila de tabla para producto en carrito', function() {
      function crearFilaCarrito(producto, index) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td class="item-number">${index + 1}</td>
          <td class="codigo">${producto.codigo}</td>
          <td class="articulo">
            <div class="articulo-nombre">${producto.nombre}</div>
            <img src="${producto.imagen}" alt="${producto.nombre}">
          </td>
          <td class="precio">$${producto.precio.toLocaleString('es-CL')} CLP</td>
          <td class="cantidad">
            <div class="cantidad-box">
              <button class="btn-cantidad up">+</button>
              <span class="cantidad-num">${producto.cantidad}</span>
              <button class="btn-cantidad down">−</button>
            </div>
          </td>
          <td class="total">$${(producto.precio * producto.cantidad).toLocaleString('es-CL')} CLP</td>
          <td class="acciones">
            <button class="btn-borrar">Eliminar</button>
            <input type="checkbox" class="checkbox-llevar" ${producto.llevar ? 'checked' : ''}>
          </td>
        `;
        return fila;
      }
      
      const fila = crearFilaCarrito(mockProducts[0], 0);
      
      expect(fila.innerHTML).toContain('JM001');
      expect(fila.innerHTML).toContain('Juegos de Mesa Catan');
      expect(fila.innerHTML).toContain('$29.990 CLP');
      expect(fila.innerHTML).toContain('cantidad-box');
    });

    it('debe renderizar mensaje de carrito vacío', function() {
      function renderizarCarritoVacio(container) {
        container.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center; padding: 20px;">
              El carrito está vacío.
            </td>
          </tr>
        `;
      }
      
      renderizarCarritoVacio(mockContainer);
      
      expect(mockContainer.innerHTML).toContain('El carrito está vacío');
      expect(mockContainer.innerHTML).toContain('colspan="7"');
    });
  });

  describe('renderizarResumenCompra', function() {
    it('debe renderizar resumen de compra', function() {
      function renderizarResumen(subtotal, costoEnvio, descuento, total, container) {
        container.innerHTML = `
          <div class="resumen-compra">
            <h2>Resumen de Compra</h2>
            <div class="resumen-item">
              <span>Subtotal:</span>
              <span>$${subtotal.toLocaleString('es-CL')} CLP</span>
            </div>
            <div class="resumen-item">
              <span>Costo envío:</span>
              <span>$${costoEnvio.toLocaleString('es-CL')} CLP</span>
            </div>
            <div class="resumen-item">
              <span>Descuento:</span>
              <span>$${descuento.toLocaleString('es-CL')} CLP</span>
            </div>
            <div class="resumen-item total">
              <span>Total a Pagar:</span>
              <span>$${total.toLocaleString('es-CL')} CLP</span>
            </div>
            <button class="btn-pagar">PAGAR</button>
          </div>
        `;
      }
      
      renderizarResumen(10000, 3000, 1000, 12000, mockContainer);
      
      expect(mockContainer.innerHTML).toContain('Resumen de Compra');
      expect(mockContainer.innerHTML).toContain('$10.000 CLP');
      expect(mockContainer.innerHTML).toContain('btn-pagar');
    });
  });

  describe('renderizarFiltros', function() {
    it('debe renderizar filtros de productos', function() {
      function renderizarFiltros(container) {
        container.innerHTML = `
          <div class="filtros">
            <select class="filtro-categoria">
              <option value="">Todas las categorías</option>
              <option value="Mi lista">Mi lista</option>
              <option value="Tendencias">Tendencias</option>
            </select>
            <select class="filtro-precio">
              <option value="">Todos los precios</option>
              <option value="0-10000">$0 - $10.000</option>
              <option value="10000-50000">$10.000 - $50.000</option>
              <option value="50000+">$50.000+</option>
            </select>
            <input type="text" class="filtro-busqueda" placeholder="Buscar productos...">
          </div>
        `;
      }
      
      renderizarFiltros(mockContainer);
      
      expect(mockContainer.innerHTML).toContain('filtros');
      expect(mockContainer.innerHTML).toContain('filtro-categoria');
      expect(mockContainer.innerHTML).toContain('filtro-precio');
      expect(mockContainer.innerHTML).toContain('filtro-busqueda');
    });
  });

  describe('renderizarPaginacion', function() {
    it('debe renderizar controles de paginación', function() {
      function renderizarPaginacion(paginaActual, totalPaginas, container) {
        container.innerHTML = `
          <div class="paginacion">
            <button class="btn-pagina prev" ${paginaActual === 1 ? 'disabled' : ''}>‹ Anterior</button>
            <span class="info-pagina">Página ${paginaActual} de ${totalPaginas}</span>
            <button class="btn-pagina next" ${paginaActual === totalPaginas ? 'disabled' : ''}>Siguiente ›</button>
          </div>
        `;
      }
      
      renderizarPaginacion(2, 5, mockContainer);
      
      expect(mockContainer.innerHTML).toContain('Página 2 de 5');
      expect(mockContainer.innerHTML).toContain('btn-pagina');
    });
  });

  describe('renderizarEstados', function() {
    it('debe renderizar estado de carga', function() {
      function renderizarCarga(container) {
        container.innerHTML = `
          <div class="estado-carga">
            <div class="spinner"></div>
            <p>Cargando productos...</p>
          </div>
        `;
      }
      
      renderizarCarga(mockContainer);
      
      expect(mockContainer.innerHTML).toContain('estado-carga');
      expect(mockContainer.innerHTML).toContain('Cargando productos');
    });

    it('debe renderizar estado de error', function() {
      function renderizarError(mensaje, container) {
        container.innerHTML = `
          <div class="estado-error">
            <p>Error: ${mensaje}</p>
            <button class="btn-reintentar">Reintentar</button>
          </div>
        `;
      }
      
      renderizarError('No se pudieron cargar los productos', mockContainer);
      
      expect(mockContainer.innerHTML).toContain('estado-error');
      expect(mockContainer.innerHTML).toContain('No se pudieron cargar los productos');
      expect(mockContainer.innerHTML).toContain('btn-reintentar');
    });
  });

  describe('optimizarRenderizado', function() {
    it('debe usar document fragment para renderizado eficiente', function() {
      function renderizarConFragment(productos, container) {
        const fragment = document.createDocumentFragment();
        
        productos.forEach(producto => {
          const elemento = document.createElement('div');
          elemento.className = 'producto-item';
          elemento.innerHTML = `<h3>${producto.nombre}</h3>`;
          fragment.appendChild(elemento);
        });
        
        container.appendChild(fragment);
      }
      
      // Mock de createDocumentFragment
      const mockFragment = {
        appendChild: jasmine.createSpy('appendChild')
      };
      spyOn(document, 'createDocumentFragment').and.returnValue(mockFragment);
      
      renderizarConFragment(mockProducts, mockContainer);
      
      expect(document.createDocumentFragment).toHaveBeenCalled();
      expect(mockFragment.appendChild).toHaveBeenCalledTimes(2);
    });
  });
});
