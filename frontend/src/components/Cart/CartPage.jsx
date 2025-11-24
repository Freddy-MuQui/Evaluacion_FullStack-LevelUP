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

    const currentPurchases = JSON.parse(localStorage.getItem('adminTotalPurchases')) || 0;
    
    // 2. Incrementamos el contador y lo guardamos de nuevo.
    const newTotalPurchases = currentPurchases + 1;
    localStorage.setItem('adminTotalPurchases', JSON.stringify(newTotalPurchases));

    // Lógica final de pago
    clearCart(); // Vacía el carrito después del pago
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(#08AEEA, #2AF598)' }}>
      <Header />
      
      <div className="container py-4">
        <div className="row justify-content-center">
          {/* Contenedor principal del carrito */}
          <div className="col-xl-8 col-lg-10">
            <div className="card shadow-lg">
              <div className="card-header text-white" style={{ backgroundColor: '#08AEEA' }}>
                <h3 className="mb-0 text-center">CARRITO</h3>
              </div>
              <div className="card-body p-0">
                {cart.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="text-muted">El carrito está vacío.</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                          <th className="text-dark fw-bold text-center">ITEM</th>
                          <th className="text-dark fw-bold text-center">CODIGO</th>
                          <th className="text-dark fw-bold text-center">ARTICULO</th>
                          <th className="text-dark fw-bold text-center">PRECIO</th>
                          <th className="text-dark fw-bold text-center">CANTIDAD</th>
                          <th className="text-dark fw-bold text-center">TOTAL</th>
                          <th className="text-dark fw-bold text-center">ACCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((prod, index) => {
                          const itemTotal = prod.precio * prod.cantidad;

                          return (
                            <tr key={prod.id}>
                              <td className="text-dark fw-bold text-center">{index + 1}</td>
                              <td className="text-dark text-center">{prod.codigo}</td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  <img 
                                    src={prod.imagen} 
                                    alt={prod.nombre} 
                                    className="me-3 rounded"
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                  />
                                  <div className="text-dark fw-bold text-center">{prod.nombre}</div>
                                </div>
                              </td>
                              <td className="text-center">
                                <span className="fw-bold" style={{ color: '#08AEEA' }}>{formatoMoneda(prod.precio)}</span>
                              </td>
                              <td className="text-center">
                                <div className="d-flex align-items-center justify-content-center">
                                  <button 
                                    className="btn btn-outline-secondary btn-sm me-2"
                                    onClick={() => updateQuantity(prod.id, -1)}
                                    disabled={prod.cantidad <= 1}
                                  >
                                    −
                                  </button>
                                  <span className="text-dark fw-bold mx-2">{prod.cantidad}</span>
                                  <button 
                                    className="btn btn-outline-secondary btn-sm ms-2"
                                    onClick={() => updateQuantity(prod.id, 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="text-center">
                                <span className="fw-bold" style={{ color: '#08AEEA' }}>{formatoMoneda(itemTotal)}</span>
                              </td>
                              <td className="text-center">
                                <div className="d-flex justify-content-center align-items-center gap-3">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => removeItem(prod.id)}
                                    title="Eliminar producto"
                                    style={{ width: '40px', height: '40px', padding: '8px' }}
                                  >
                                    <img 
                                      src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png" 
                                      alt="Eliminar" 
                                      style={{ width: '20px', height: '20px' }}
                                    />
                                  </button>
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      checked={prod.llevar}
                                      onChange={() => toggleLlevar(prod.id)}
                                      title="Seleccionar para llevar"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resumen de la compra */}
          <div className="col-xl-4 col-lg-10 mt-4 mt-xl-0">
            <div className="card shadow-lg">
              <div className="card-header text-white" style={{ backgroundColor: '#2AF598' }}>
                <h4 className="mb-0 text-center">Generar Compra</h4>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label text-dark fw-bold">Subtotal:</label>
                  </div>
                  <div className="col-6 text-end">
                    <span className="fw-bold" style={{ color: '#08AEEA' }}>{totals.subtotal}</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label text-dark fw-bold">Costo envío:</label>
                  </div>
                  <div className="col-6 text-end">
                    <span className="fw-bold" style={{ color: '#08AEEA' }}>{totals.costoEnvio}</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label text-dark fw-bold">Descuento:</label>
                  </div>
                  <div className="col-6 text-end">
                    <span className="fw-bold" style={{ color: '#08AEEA' }}>{totals.descuento}</span>
                  </div>
                </div>

                <hr />

                <div className="row mb-4">
                  <div className="col-6">
                    <label className="form-label text-dark fw-bold fs-5">Total a Pagar:</label>
                  </div>
                  <div className="col-6 text-end">
                    <span className="fw-bold fs-5" style={{ color: '#2AF598' }}>{totals.totalPagar}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button 
                    className="btn btn-lg text-white px-5" 
                    style={{ backgroundColor: '#2AF598', border: 'none' }}
                    onClick={handleCheckout}
                  >
                    PAGAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
      // ... Todo el resto del componente CartPage.jsx sigue igual, solo se actualizó handleCheckout
      <div className="min-vh-100" style={{ background: 'linear-gradient(#08AEEA, #2AF598)' }}>
        <Header />
        
        <div className="container py-4">
          {/* ... Contenido de la tabla del carrito ... */}
            {/* Resumen de la compra */}
            <div className="col-xl-4 col-lg-10 mt-4 mt-xl-0">
              <div className="card shadow-lg">
                <div className="card-header text-white" style={{ backgroundColor: '#2AF598' }}>
                  <h4 className="mb-0 text-center">Generar Compra</h4>
                </div>
                <div className="card-body">
                  {/* ... Totales ... */}
                  <div className="d-flex justify-content-center">
                    <button 
                      className="btn btn-lg text-white px-5" 
                      style={{ backgroundColor: '#2AF598', border: 'none' }}
                      onClick={handleCheckout} // manejador actualizado
                    >
                      PAGAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};


export default CartPage;