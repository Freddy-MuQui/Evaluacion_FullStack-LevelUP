// src/hooks/useCart.js
import { useState, useEffect, useCallback } from 'react';
import { allProducts } from '../utils/productsData';
import { formatoMoneda } from '../utils/currencyFormatter';

// Nombre de la clave en localStorage
const CART_KEY = 'shoppingCart';

/**
 * @function useCart
 * @description Hook personalizado para gestionar el estado y lógica del carrito de compras.
 * @returns {object} Funciones y estado del carrito (cart, addProductToCart, etc.).
 */
export const useCart = () => {
  // 1. Estado para almacenar el carrito (inicialmente cargado de localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Error al cargar el carrito de localStorage:", e);
      return [];
    }
  });

  // 2. Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Error al guardar el carrito en localStorage:", e);
    }
  }, [cart]);

  // 3. Función para agregar un producto al carrito
  const addProductToCart = useCallback((productId) => {
    const productToAdd = allProducts.find(p => p.id === productId);

    if (!productToAdd) {
      console.error("Producto no encontrado con ID:", productId);
      return;
    }

    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === productId);

      if (existingProductIndex !== -1) {
        // Si existe, incrementa la cantidad
        return prevCart.map((item, index) =>
          index === existingProductIndex ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Si no existe, añade el producto con cantidad 1
        const newCartItem = { ...productToAdd, cantidad: 1, llevar: true };
        return [...prevCart, newCartItem];
      }
    });

    alert(`${productToAdd.nombre} ha sido añadido al carrito.`);
  }, []);

  // 4. Función para actualizar la cantidad
  const updateQuantity = useCallback((productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.cantidad + delta;
          // Previene que la cantidad baje de 1, o que cambie si no hay delta.
          return { ...item, cantidad: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      }).filter(item => item.cantidad > 0); // Eliminar si la cantidad llega a 0 (aunque el botón down lo previene)
    });
  }, []);

  // 5. Función para alternar 'llevar' (seleccionar para compra)
  const toggleLlevar = useCallback((productId) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          return { ...item, llevar: !item.llevar };
        }
        return item;
      });
    });
  }, []);

  // 6. Función para eliminar un producto
  const removeItem = useCallback((productId) => {
    setCart(prevCart => {
      return prevCart.filter(item => item.id !== productId);
    });
  }, []);

  // 7. Función para vaciar el carrito (usado después de "PAGAR")
  const clearCart = useCallback(() => {
    setCart([]);
    alert("Compra generada con éxito.");
  }, []);

  // 8. Cálculo de totales (refactoriza 'actualizarResumen')
  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    cart.forEach(p => {
      if (p.llevar) {
        subtotal += p.precio * p.cantidad;
      }
    });
    // Costos/descuentos fijos según tu archivo original
    const costoEnvio = 0;
    const descuento = 0;
    const total = subtotal + costoEnvio - descuento;

    return {
      subtotal: formatoMoneda(subtotal),
      costoEnvio: formatoMoneda(costoEnvio),
      descuento: formatoMoneda(descuento),
      totalPagar: formatoMoneda(total),
      rawTotal: total,
    };
  }, [cart]);

  return {
    cart,
    addProductToCart,
    updateQuantity,
    toggleLlevar,
    removeItem,
    clearCart,
    calculateTotals,
    formatoMoneda, // Exportamos el formateador para usarlo en la UI
  };
};