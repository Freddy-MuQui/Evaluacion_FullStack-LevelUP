// src/test/unit/cartMock.test.js
// Ejemplo de Mock de localStorage para pruebas unitarias de gestión del carrito.

/**
 * @description Configuración de un mock para localStorage para simular su comportamiento
 * en un entorno de prueba donde no está disponible o queremos controlar su estado[cite: 351].
 */
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jasmine.createSpy('getItem').and.callFake(function(key) {
      return store[key] || null;
    }),
    setItem: jasmine.createSpy('setItem').and.callFake(function(key, value) {
      store[key] = value.toString();
    }),
    clear: jasmine.createSpy('clear').and.callFake(function() {
      store = {};
    }),
    removeItem: jasmine.createSpy('removeItem').and.callFake(function(key) {
      delete store[key];
    })
  };
})();

// Reemplazamos el localStorage global con nuestro mock antes de la ejecución
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// NOTA: Para probar el hook useCart.js directamente se necesita la React Testing Library 
// junto con Jasmine/Karma, lo cual es más complejo. Este ejemplo ilustra el concepto de mockeo 
// de dependencias externas (localStorage) para la lógica simple del carrito[cite: 358].

describe('Mocks y Dependencias (localStorage)', function() {
  
  // Ejecutado antes de cada prueba
  beforeEach(function() {
    localStorageMock.clear(); // Limpiamos el mock para asegurar un estado inicial limpio
  });

  // Caso 1: Verificar que se pueda guardar un valor
  it('debería llamar a setItem y guardar el valor en el mock store', function() {
    const testKey = 'testUser';
    const testValue = JSON.stringify({ name: 'Estudiante', id: 101 });
    
    // Acción: Guardamos el valor
    window.localStorage.setItem(testKey, testValue);

    // Verificación 1: Comprobamos que la función espía se haya llamado con los argumentos correctos [cite: 394]
    expect(localStorageMock.setItem).toHaveBeenCalledWith(testKey, testValue);

    // Verificación 2: Comprobamos que el valor se pueda recuperar del mock
    expect(JSON.parse(window.localStorage.getItem(testKey))).toEqual(JSON.parse(testValue));
  });

  // Caso 2: Verificar que se pueda eliminar un valor
  it('debería eliminar un elemento del mock store al llamar removeItem', function() {
    const testKey = 'producto';
    window.localStorage.setItem(testKey, 'data');
    
    // Pre-condición: El elemento existe
    expect(window.localStorage.getItem(testKey)).not.toBeNull();

    // Acción: Eliminamos el elemento
    window.localStorage.removeItem(testKey);

    // Post-condición: El elemento ya no existe
    expect(window.localStorage.getItem(testKey)).toBeNull();
    // Verificación: Comprobamos que el espía fue llamado
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(testKey);
  });
});