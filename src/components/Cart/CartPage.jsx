// src/components/Cart/CartPage.jsx
import React from 'react';
import Header from '../Common/Header';
import { useCart } from '../../hooks/useCart';
// Se importa el CSS específico del carrito
import '../../styles/estilo_carrito.css'; 
import { formatoMoneda } from '../../utils/currencyFormatter';

/**
 * @function CartPage
 * @description Componente principal de la página del carrito (Migración de carrito.html).
 * Muestra la tabla de productos y el resumen de la compra.
 */
const CartPage = () => {
  // Obtenemos todo el estado y funciones del carrito
  const { 
    cart, 
    updateQuantity, 
    toggleLlevar, 
    removeItem, 
    clearCart,
    calculateTotals
  } = useCart();
  
  // Calculamos los totales cada vez que el carrito cambia
  const totals = calculateTotals();

  // 1. Manejador para el botón de "PAGAR"
  const handleCheckout = () => {
    const productosLlevar = cart.filter(p => p.llevar);
    if (productosLlevar.length === 0) {
      alert("No hay productos seleccionados para pagar.");
      return;
    }
    // Lógica final de pago
    alert("Compra generada con éxito.\nTotal a pagar: " + totals.totalPagar);
    clearCart(); // Vacía el carrito después del pago
  };

  return (
    <div className="App-container">
      <Header />
      
      <div className="main-wrapper">
        {/* 2. Contenedor principal del carrito */}
        <div className="carrito-container">
          <div className="carrito-titulo">CARRITO</div>
          <div className="productos-wrapper">
            <table id="tabla-carrito">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>CODIGO</th>
                  <th>ARTICULO</th>
                  <th>PRECIO</th>
                  <th>CANTIDAD</th>
                  <th>TOTAL</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody id="cuerpo-tabla">
                {/* Renderizado condicional si el carrito está vacío */}
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                      El carrito está vacío.
                    </td>
                  </tr>
                ) : (
                  // 3. Mapeo de los productos del carrito a filas de la tabla
                  cart.map((prod, index) => {
                    const itemTotal = prod.precio * prod.cantidad;

                    return (
                      <tr key={prod.id}>
                        <td className="item-number">{index + 1}</td>
                        <td className="codigo">{prod.codigo}</td>
                        <td className="articulo">
                          <div className="articulo-nombre">{prod.nombre}</div>
                          {/* Ruta a la imagen (asumimos que la URL en productsData es válida o relativa a public/) */}
                          <img src={prod.imagen} alt={prod.nombre} />
                        </td>
                        <td className="precio">{formatoMoneda(prod.precio)}</td>
                        <td className="cantidad">
                          {/* Controles de cantidad */}
                          <div className="cantidad-box">
                            <div className="btn-cantidad up" onClick={() => updateQuantity(prod.id, 1)}>+</div>
                            <div className="cantidad-num">{prod.cantidad}</div>
                            {/* Solo permitimos reducir si la cantidad es mayor a 1 */}
                            <div className="btn-cantidad down" onClick={() => updateQuantity(prod.id, -1)} disabled={prod.cantidad <= 1}>−</div>
                          </div>
                        </td>
                        <td className="total">{formatoMoneda(itemTotal)}</td>
                        <td className="acciones">
                          {/* Botón de borrar (usando una imagen placeholder) */}
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png" 
                            alt="Borrar" 
                            title="Eliminar producto"
                            className="btn-borrar"
                            onClick={() => removeItem(prod.id)}
                          />
                          {/* Checkbox para seleccionar si se lleva el producto */}
                          <input
                            type="checkbox"
                            className="checkbox-llevar"
                            checked={prod.llevar}
                            onChange={() => toggleLlevar(prod.id)}
                            title="Seleccionar para llevar"
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Resumen de la compra */}
        <div className="resumen-compra">
          <h2>Generar Compra</h2>
          <div className="resumen-label">Subtotal:</div>
          <div id="subtotal" className="resumen-valor">{totals.subtotal}</div>

          <div className="resumen-label">Costo envío:</div>
          <div id="costo-envio" className="resumen-valor">{totals.costoEnvio}</div>

          <div className="resumen-label">Descuento:</div>
          <div id="descuento" className="resumen-valor">{totals.descuento}</div>

          <div className="resumen-label">Total a Pagar:</div>
          <div id="total-pagar" className="resumen-valor">{totals.totalPagar}</div>

          <button className="btn-pagar" id="btn-pagar" onClick={handleCheckout}>PAGAR</button>
        </div>
      </div>
      
      {/* El carrito no tenía footer en el HTML original, pero en un SPA se recomienda ponerlo, o dejarlo sin nada */}
    </div>
  );
};

export default CartPage;