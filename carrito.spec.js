describe('formatoMoneda', function() {
  it('debe formatear correctamente como CLP', function() {
    function formatoMoneda(num) { return num.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'}); }
    expect(formatoMoneda(1000)).toBe('$1.000');
    expect(formatoMoneda(59990)).toBe('$59.990');
  });
});

describe('guardar y cargar carrito', function() {
  it('debe transformar array a JSON y viceversa', function() {
    function saveCart(cart) {
      return JSON.stringify(cart);
    }
    function loadCart(json) {
      return JSON.parse(json);
    }
    const carritoOriginal = [{id:1, nombre:'Pan', cantidad:2}];
    const json = saveCart(carritoOriginal);
    expect(typeof json).toBe('string');
    const carritoCargado = loadCart(json);
    expect(carritoCargado.length).toBe(1);
    expect(carritoCargado[0].nombre).toBe('Pan');
    expect(carritoCargado[0].cantidad).toBe(2);
  });
});

describe('agregar producto al carrito', function() {
  it('debe aumentar cantidad si ya existe', function() {
    function agregarProducto(cart, producto) {
      const idx = cart.findIndex(p => p.id === producto.id);
      if(idx !== -1) {
        cart[idx].cantidad += producto.cantidad;
      } else {
        cart.push(producto);
      }
    }
    const cart = [{id:1, nombre:'Pan', cantidad:1}];
    agregarProducto(cart, {id:1, nombre:'Pan', cantidad:2});
    expect(cart.length).toBe(1);
    expect(cart[0].cantidad).toBe(3); // 1+2=3

    agregarProducto(cart, {id:2, nombre:'Leche', cantidad:1});
    expect(cart.length).toBe(2);
    expect(cart[1].nombre).toBe('Leche');
  });
});


describe('borrar producto del carrito', function() {
  it('debe eliminar producto por id', function() {
    function borrarProducto(cart, id) {
      return cart.filter(p => p.id !== id);
    }
    const original = [{id:1, n:'Pan'}, {id:2, n:'Leche'}];
    const actualizado = borrarProducto(original, 1);
    expect(actualizado.length).toBe(1);
    expect(actualizado[0].id).toBe(2);
  });
});

describe('vaciar carrito', function() {
  it('debe dejar el array vacío', function() {
    let cart = [{id:1},{id:2}];
    cart = [];
    expect(cart.length).toBe(0);
  });
});

describe('calcular subtotal', function() {
  it('debe sumar los totales de los productos', function() {
    function calcularSubtotal(cart) {
      return cart.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
    }
    const cart = [{precio:1000, cantidad:2}, {precio:500, cantidad:3}];
    expect(calcularSubtotal(cart)).toBe(1000*2 + 500*3);
  });
});

describe('aplicar descuento', function() {
  it('debe descontar un 10%', function() {
    function aplicarDescuento(total, pct) {
      return total - (total * pct / 100);
    }
    expect(aplicarDescuento(1000, 10)).toBe(900);
  });
});

describe('carrito está vacío', function() {
  it('debe retornar true si no hay productos', function() {
    function estaVacio(cart) { return cart.length === 0; }
    expect(estaVacio([])).toBeTrue();
    expect(estaVacio([1])).toBeFalse();
  });
});

describe('incrementar cantidad', function() {
  it('debe sumar unidad si ya existe el producto', function() {
    function incrementar(cart, id) {
      const idx = cart.findIndex(p => p.id === id);
      if (idx !== -1) cart[idx].cantidad++;
    }
    const cart = [{id:1, cantidad:2}];
    incrementar(cart, 1);
    expect(cart[0].cantidad).toBe(3);
  });
});

describe('encontrar producto', function() {
  it('debe devolver el producto correcto por id', function() {
    function buscar(cart, id) {
      return cart.find(p => p.id === id);
    }
    const cart = [{id:1, n:"Pan"}, {id:2, n:"Leche"}];
    expect(buscar(cart, 2).n).toBe("Leche");
    expect(buscar(cart, 3)).toBeUndefined();
  });
});

