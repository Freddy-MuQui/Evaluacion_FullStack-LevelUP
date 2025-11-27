// src/utils/currencyFormatter.js
/**
 * @function formatoMoneda
 * @description Convierte un número a formato de moneda chilena (CLP).
 * @param {number} num - El número a formatear (precio).
 * @returns {string} El precio formateado con el símbolo '$' y 'CLP'.
 */
export const formatoMoneda = (num) => {
  // Aseguramos que el valor sea un número y usamos toLocaleString para formato local.
  return "$" + Number(num).toLocaleString("es-CL") + " CLP";
};