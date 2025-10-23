// src/test/unit/currencyFormatter.test.js
import { formatoMoneda } from '../../utils/currencyFormatter';

/**
 * @description Suite de pruebas para la función de formato de moneda.
 * Verifica la lógica de la función de utilidad[cite: 1409].
 */
describe('formatoMoneda (Currency Formatter)', function() {
  
  // Caso 1: Prueba de un número entero estándar
  it('debería formatear un número entero correctamente a CLP', function() {
    // Definimos el valor de entrada esperado
    var resultado = formatoMoneda(29990);
    // Verificamos que el resultado sea el esperado (usamos .toBe para comparación estricta)
    expect(resultado).toBe('$29.990 CLP'); // El formato chileno usa punto como separador de miles
  });

  // Caso 2: Prueba de un número más grande
  it('debería manejar números grandes con separadores de miles', function() {
    var resultado = formatoMoneda(1299990);
    expect(resultado).toBe('$1.299.990 CLP');
  });

  // Caso 3: Prueba de valor cero (caso límite) [cite: 954]
  it('debería retornar $0 CLP para una entrada de 0', function() {
    var resultado = formatoMoneda(0);
    expect(resultado).toBe('$0 CLP');
  });
  
  // Caso 4: Prueba de una entrada que no es un número (caso límite) [cite: 954]
  it('debería manejar valores no numéricos (ej. null/undefined) retornando el formato de 0', function() {
    var resultadoNulo = formatoMoneda(null);
    var resultadoIndefinido = formatoMoneda(undefined);
    // Debido al uso de Number() en la función, null y undefined se convierten a 0 o NaN
    expect(resultadoNulo).toBe('$0 CLP'); 
    expect(resultadoIndefinido).toBe('$0 CLP'); // En JS, Number(undefined) es NaN, pero toLocaleString() puede fallar o retornar un valor inusual.
  });
});