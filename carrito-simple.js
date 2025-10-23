// Versión simplificada para testing - sin dependencias DOM
function loadCart() {
  const cart = localStorage.getItem('shoppingCart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function addProductToCart(productId) {
  let cart = loadCart();
  const productToAdd = allProducts.find(p => p.id === productId);

  if (productToAdd) {
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].cantidad++;
    } else {
      const newCartItem = { ...productToAdd, cantidad: 1, llevar: true };
      cart.push(newCartItem);
    }
    saveCart(cart);
    return { success: true, message: `${productToAdd.nombre} ha sido añadido al carrito.` };
  } else {
    return { success: false, message: "Producto no encontrado con ID: " + productId };
  }
}

function formatoMoneda(num) {
  return "$" + num.toLocaleString("es-CL") + " CLP";
}

function calcularSubtotal(cart) {
  return cart.reduce((total, item) => {
    if (item.llevar) {
      return total + (item.precio * item.cantidad);
    }
    return total;
  }, 0);
}

function calcularTotal(subtotal, costoEnvio, descuento) {
  return subtotal + costoEnvio - descuento;
}

function eliminarProducto(cart, productId) {
  return cart.filter(item => item.id !== productId);
}

function actualizarCantidad(cart, productId, nuevaCantidad) {
  return cart.map(item => {
    if (item.id === productId) {
      return { ...item, cantidad: nuevaCantidad };
    }
    return item;
  });
}
