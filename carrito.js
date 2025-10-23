const cuerpoTabla = document.getElementById("cuerpo-tabla");
const subtotalElem = document.getElementById("subtotal");
const costoEnvioElem = document.getElementById("costo-envio");
const descuentoElem = document.getElementById("descuento");
const totalPagarElem = document.getElementById("total-pagar");

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
    alert(`${productToAdd.nombre} ha sido añadido al carrito.`);
  } else {
    console.error("Producto no encontrado con ID:", productId);
  }
}

function formatoMoneda(num) {
  return "$" + num.toLocaleString("es-CL") + " CLP";
}

function renderizarTabla() {
  const cart = loadCart();
  cuerpoTabla.innerHTML = "";

  if (cart.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.textContent = "El carrito está vacío.";
    td.style.textAlign = "center";
    td.style.padding = "20px";
    tr.appendChild(td);
    cuerpoTabla.appendChild(tr);
    actualizarResumen();
    return;
  }

  cart.forEach((prod, index) => {
    const tr = document.createElement("tr");

    const tdItem = document.createElement("td");
    tdItem.className = "item-number";
    tdItem.textContent = index + 1;
    tr.appendChild(tdItem);

    const tdCodigo = document.createElement("td");
    tdCodigo.className = "codigo";
    tdCodigo.textContent = prod.codigo;
    tr.appendChild(tdCodigo);

    const tdArticulo = document.createElement("td");
    tdArticulo.className = "articulo";
    const nombreDiv = document.createElement("div");
    nombreDiv.className = "articulo-nombre";
    nombreDiv.textContent = prod.nombre;
    const img = document.createElement("img");
    img.src = prod.imagen;
    img.alt = prod.nombre + " - Imagen detallada mostrando el producto.";
    tdArticulo.appendChild(nombreDiv);
    tdArticulo.appendChild(img);
    tr.appendChild(tdArticulo);

    const tdPrecio = document.createElement("td");
    tdPrecio.className = "precio";
    tdPrecio.textContent = formatoMoneda(prod.precio);
    tr.appendChild(tdPrecio);

    const tdCantidad = document.createElement("td");
    tdCantidad.className = "cantidad";

    const cantidadBox = document.createElement("div");
    cantidadBox.className = "cantidad-box";

    const btnUp = document.createElement("div");
    btnUp.className = "btn-cantidad up";
    btnUp.textContent = "+";
    btnUp.title = "Agregar uno";

    const cantidadNum = document.createElement("div");
    cantidadNum.className = "cantidad-num";
    cantidadNum.textContent = prod.cantidad;

    const btnDown = document.createElement("div");
    btnDown.className = "btn-cantidad down";
    btnDown.textContent = "−";
    btnDown.title = "Quitar uno";

    cantidadBox.appendChild(btnUp);
    cantidadBox.appendChild(cantidadNum);
    cantidadBox.appendChild(btnDown);
    tdCantidad.appendChild(cantidadBox);
    tr.appendChild(tdCantidad);

    const tdTotal = document.createElement("td");
    tdTotal.className = "total";
    tdTotal.textContent = formatoMoneda(prod.precio * prod.cantidad);
    tr.appendChild(tdTotal);

    const tdAcciones = document.createElement("td");
    tdAcciones.className = "acciones";

    const btnBorrar = document.createElement("img");
    btnBorrar.src = "https://cdn-icons-png.flaticon.com/512/3096/3096673.png";
    btnBorrar.alt = "Borrar";
    btnBorrar.title = "Eliminar producto";
    btnBorrar.className = "btn-borrar";
    btnBorrar.style.userSelect = "none";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-llevar";
    checkbox.checked = prod.llevar;
    checkbox.title = "Seleccionar para llevar";

    tdAcciones.appendChild(btnBorrar);
    tdAcciones.appendChild(checkbox);
    tr.appendChild(tdAcciones);

    btnUp.addEventListener("click", () => {
      prod.cantidad++;
      cantidadNum.textContent = prod.cantidad;
      tdTotal.textContent = formatoMoneda(prod.cantidad * prod.precio);
      saveCart(cart);
      actualizarResumen();
    });
    btnDown.addEventListener("click", () => {
      if (prod.cantidad > 1) {
        prod.cantidad--;
        cantidadNum.textContent = prod.cantidad;
        tdTotal.textContent = formatoMoneda(prod.cantidad * prod.precio);
        saveCart(cart);
        actualizarResumen();
      }
    });

    btnBorrar.addEventListener("click", () => {
      const idx = cart.findIndex(p => p.id === prod.id);
      if (idx !== -1) {
        cart.splice(idx, 1);
        saveCart(cart);
        renderizarTabla();
        actualizarResumen();
      }
    });

    checkbox.addEventListener("change", () => {
      prod.llevar = checkbox.checked;
      saveCart(cart);
      actualizarResumen();
    });

    cuerpoTabla.appendChild(tr);
  });
}

function actualizarResumen() {
  const cart = loadCart();
  let subtotal = 0;
  cart.forEach(p => {
    if (p.llevar) {
      subtotal += p.precio * p.cantidad;
    }
  });
  const costoEnvio = 0;
  const descuento = 0;
  const total = subtotal + costoEnvio - descuento;

  subtotalElem.textContent = formatoMoneda(subtotal);
  costoEnvioElem.textContent = formatoMoneda(costoEnvio);
  descuentoElem.textContent = formatoMoneda(descuento);
  totalPagarElem.textContent = formatoMoneda(total);
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTabla();
  actualizarResumen();
});

document.getElementById("btn-pagar").addEventListener("click", () => {
  const cart = loadCart();
  const productosLlevar = cart.filter(p => p.llevar);
  if (productosLlevar.length === 0) {
    alert("No hay productos seleccionados para pagar.");
    return;
  }
  alert("Compra generada con éxito.\nTotal a pagar: " + totalPagarElem.textContent);
  saveCart([]);
  renderizarTabla();
});