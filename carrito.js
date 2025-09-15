// Productos con código, nombre, descripción, precio, imagen (placeholder), cantidad y llevar
const productos = [
  {
    id: 1,
    codigo: "JM001",
    nombre: "Juegos de Mesa Catan",
    descripcion: `• Catan: Un clásico juego de estrategia donde los jugadores compiten por colonizar y
expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en
familia o con amigos.`,
    precio: 29990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1bc12204-4298-46d3-8ec8-5b5750c5a336.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 2,
    codigo: "JM002",
    nombre: "Juegos de Mesa Carcassonne",
    descripcion: `• Carcassonne: Un juego de colocación de fichas donde los jugadores construyen el paisaje
alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de
aprender.`,
    precio: 24990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/50c1966e-3b5c-4ed2-ad7b-2a7e89ecee87.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 3,
    codigo: "AC001",
    nombre: "Controlador Inalámbrico Xbox Series X",
    descripcion: `• Controlador Inalámbrico Xbox Series X: Ofrece una experiencia de juego cómoda con
botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.`,
    precio: 59990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a6a40f86-f1d6-4d23-9995-466635ff676a.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 4,
    codigo: "AC002",
    nombre: "Auriculares Gamer HyperX Cloud II",
    descripcion: `• Auriculares Gamer HyperX Cloud II: Proporcionan un sonido envolvente de calidad con un
micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad
durante largas sesiones de juego.`,
    precio: 79990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d386d3af-d744-4ca5-b72e-d4e0fc9b9895.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 5,
    codigo: "CO001",
    nombre: "PlayStation 5",
    descripcion: `• PlayStation 5: La consola de última generación de Sony, que ofrece gráficos
impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.`,
    precio: 549990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aa82af2f-80bb-455b-b05b-b69d6261dd46.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 6,
    codigo: "CG001",
    nombre: "PC Gamer ASUS ROG Strix",
    descripcion: `• PC Gamer ASUS ROG Strix: Un potente equipo diseñado para los gamers más exigentes,
equipado con los últimos componentes para ofrecer un rendimiento excepcional en
cualquier juego.`,
    precio: 1299990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1296346a-8302-401b-b0a5-39a7daf65879.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 7,
    codigo: "SG001",
    nombre: "Silla Gamer Secretlab Titan",
    descripcion: `• Silla Gamer Secretlab Titan: Diseñada para el máximo confort, esta silla ofrece un soporte
ergonómico y personalización ajustable para sesiones de juego prolongadas.`,
    precio: 349990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/01bcd8ea-bf27-472f-9b6e-2cb6f439281d.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 8,
    codigo: "MS001",
    nombre: "Mouse Gamer Logitech G502 HERO",
    descripcion: `• Mouse Gamer Logitech G502 HERO: Con sensor de alta precisión y botones
personalizables, este mouse es ideal para gamers que buscan un control preciso y
personalización.`,
    precio: 49990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6370aa11-9734-43dc-a728-e8db2c0007d5.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 9,
    codigo: "MP001",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    descripcion: `• Mousepad Razer Goliathus Extended Chroma: Ofrece un área de juego amplia con
iluminación RGB personalizable, asegurando una superficie suave y uniforme para el
movimiento del mouse.`,
    precio: 29990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c49ba455-2975-43df-83bd-71640c2ef011.png",
    cantidad: 1,
    llevar: true
  },
  {
    id: 10,
    codigo: "PP001",
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    descripcion: `• Polera Gamer Personalizada 'Level-Up': Una camiseta cómoda y estilizada, con la
posibilidad de personalizarla con tu gamer tag o diseño favorito.`,
    precio: 14990,
    imagen: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/441eccbc-9072-4c57-adee-8e68478d553e.png",
    cantidad: 1,
    llevar: true
  }
];

const cuerpoTabla = document.getElementById("cuerpo-tabla");
const subtotalElem = document.getElementById("subtotal");
const costoEnvioElem = document.getElementById("costo-envio");
const descuentoElem = document.getElementById("descuento");
const totalPagarElem = document.getElementById("total-pagar");

// Función para formatear números a moneda CLP con separador de miles
function formatoMoneda(num) {
  return "$" + num.toLocaleString("es-CL") + " CLP";
}

// Renderizar tabla con productos
function renderizarTabla() {
  cuerpoTabla.innerHTML = "";
  productos.forEach((prod, index) => {
    const tr = document.createElement("tr");

    // ITEM (número progresivo)
    const tdItem = document.createElement("td");
    tdItem.className = "item-number";
    tdItem.textContent = index + 1;
    tr.appendChild(tdItem);

    // CODIGO
    const tdCodigo = document.createElement("td");
    tdCodigo.className = "codigo";
    tdCodigo.textContent = prod.codigo;
    tr.appendChild(tdCodigo);

    // ARTICULO (nombre + imagen lado a lado)
    const tdArticulo = document.createElement("td");
    tdArticulo.className = "articulo";
    const nombreDiv = document.createElement("div");
    nombreDiv.className = "articulo-nombre";
    nombreDiv.textContent = prod.nombre;
    const img = document.createElement("img");
    img.src = prod.imagen;
    img.alt = prod.nombre + " - Imagen detallada mostrando el producto en un entorno moderno y atractivo, con colores vibrantes y diseño técnico avanzado, ideal para entusiastas de videojuegos.";
    tdArticulo.appendChild(nombreDiv);
    tdArticulo.appendChild(img);
    tr.appendChild(tdArticulo);

    // PRECIO
    const tdPrecio = document.createElement("td");
    tdPrecio.className = "precio";
    tdPrecio.textContent = formatoMoneda(prod.precio);
    tr.appendChild(tdPrecio);

    // CANTIDAD (con botones + y -)
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

    // TOTAL (precio * cantidad)
    const tdTotal = document.createElement("td");
    tdTotal.className = "total";
    tdTotal.textContent = formatoMoneda(prod.precio * prod.cantidad);
    tr.appendChild(tdTotal);

    // ACCIONES (borrar y checkbox)
    const tdAcciones = document.createElement("td");
    tdAcciones.className = "acciones";

    // Botón borrar (icono bote de basura)
    const btnBorrar = document.createElement("img");
    btnBorrar.src = "https://cdn-icons-png.flaticon.com/512/3096/3096673.png";
    btnBorrar.alt = "Borrar";
    btnBorrar.title = "Eliminar producto";
    btnBorrar.className = "btn-borrar";
    btnBorrar.style.userSelect = "none";

    // Checkbox círculo para seleccionar si se lleva o no
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-llevar";
    checkbox.checked = prod.llevar;
    checkbox.title = "Seleccionar para llevar";

    tdAcciones.appendChild(btnBorrar);
    tdAcciones.appendChild(checkbox);
    tr.appendChild(tdAcciones);

    // Eventos botones cantidad
    btnUp.addEventListener("click", () => {
      prod.cantidad++;
      cantidadNum.textContent = prod.cantidad;
      tdTotal.textContent = formatoMoneda(prod.cantidad * prod.precio);
      actualizarResumen();
    });
    btnDown.addEventListener("click", () => {
      if (prod.cantidad > 1) {
        prod.cantidad--;
        cantidadNum.textContent = prod.cantidad;
        tdTotal.textContent = formatoMoneda(prod.cantidad * prod.precio);
        actualizarResumen();
      }
    });

    // Evento borrar
    btnBorrar.addEventListener("click", () => {
      const idx = productos.findIndex(p => p.id === prod.id);
      if (idx !== -1) {
        productos.splice(idx, 1);
        renderizarTabla();
        actualizarResumen();
      }
    });

    // Evento checkbox
    checkbox.addEventListener("change", () => {
      prod.llevar = checkbox.checked;
      actualizarResumen();
    });

    cuerpoTabla.appendChild(tr);
  });
}

// Actualizar resumen de compra
function actualizarResumen() {
  // Subtotal: suma de (precio * cantidad) de productos marcados para llevar
  let subtotal = 0;
  productos.forEach(p => {
    if (p.llevar) {
      subtotal += p.precio * p.cantidad;
    }
  });
  // Costo envío (actualmente 0)
  const costoEnvio = 0;
  // Descuento (actualmente 0)
  const descuento = 0;
  // Total a pagar
  const total = subtotal + costoEnvio - descuento;

  subtotalElem.textContent = formatoMoneda(subtotal);
  costoEnvioElem.textContent = formatoMoneda(costoEnvio);
  descuentoElem.textContent = formatoMoneda(descuento);
  totalPagarElem.textContent = formatoMoneda(total);
}

// Inicializar
renderizarTabla();
actualizarResumen();

// Botón pagar (solo alerta por ahora)
document.getElementById("btn-pagar").addEventListener("click", () => {
  const productosLlevar = productos.filter(p => p.llevar);
  if (productosLlevar.length === 0) {
    alert("No hay productos seleccionados para pagar.");
    return;
  }
  alert("Compra generada con éxito.\nTotal a pagar: " + totalPagarElem.textContent);
});