// src/hooks/useCart.js
import { useState, useEffect, useCallback } from 'react';
import { formatoMoneda } from '../utils/currencyFormatter';

// Nombre de la clave en localStorage
const CART_KEY = 'shoppingCart';

/**
 * @function useCart
 * @description Hook personalizado para gestionar el estado y lógica del carrito de compras.
 * @returns {object} Funciones y estado del carrito (cart, addProductToCart, etc.).
 */
export const useCart = () => {
  // Estado para almacenar el carrito (inicialmente cargado de localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Error al cargar el carrito de localStorage:", e);
      return [];
    }
  });

  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Error al guardar el carrito en localStorage:", e);
    }
  }, [cart]);

  // Función para agregar un producto al carrito
const addProductToCart = useCallback((product) => {
    // Ya no buscamos en allProducts, confiamos en el producto que nos llega
    if (!product) return;

    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Aseguramos que tenga las propiedades iniciales
        const newCartItem = { ...product, cantidad: 1, llevar: true };
        return [...prevCart, newCartItem];
      }
    });

    alert(`${product.nombre} ha sido añadido al carrito.`);
  }, []);

  // Función para actualizar la cantidad
  const updateQuantity = useCallback((productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.cantidad + delta;
          return { ...item, cantidad: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      }).filter(item => item.cantidad > 0);
    });
  }, []);

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

  const removeItem = useCallback((productId) => {
    setCart(prevCart => {
      return prevCart.filter(item => item.id !== productId);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    alert("Compra generada con éxito.");
  }, []);

  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    cart.forEach(p => {
      if (p.llevar) {
        subtotal += p.precio * p.cantidad;
      }
    });
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
    formatoMoneda,
  };
};