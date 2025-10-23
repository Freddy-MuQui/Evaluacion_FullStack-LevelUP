# Tests para Level Up Store

Este proyecto incluye una suite completa de tests unitarios implementados con **Karma** y **Jasmine** para la tienda Level Up Store.

## 📋 Resumen de Tests Implementados

Se han creado **10 suites de tests** que cubren todas las funcionalidades principales del proyecto:

### 1. **Tests del Carrito de Compras** (`tests/carrito.spec.js`)
- ✅ Agregar productos al carrito
- ✅ Eliminar productos del carrito
- ✅ Actualizar cantidades
- ✅ Validar carrito vacío
- ✅ Cálculo de subtotales
- ✅ Gestión de localStorage

### 2. **Tests de Formato de Moneda** (`tests/formato-moneda.spec.js`)
- ✅ Formateo de números como moneda chilena
- ✅ Manejo de decimales
- ✅ Números negativos
- ✅ Números grandes
- ✅ Validación de formatos
- ✅ Descuentos y rangos de precios

### 3. **Tests de localStorage** (`tests/localStorage.spec.js`)
- ✅ Guardar y cargar datos
- ✅ Manejo de errores de serialización
- ✅ Verificación de disponibilidad
- ✅ Gestión de carrito
- ✅ Gestión de usuario
- ✅ Gestión de configuración
- ✅ Gestión de favoritos

### 4. **Tests de Cálculo de Totales** (`tests/calculos-totales.spec.js`)
- ✅ Cálculo de subtotales
- ✅ Cálculo de costos de envío
- ✅ Aplicación de descuentos
- ✅ Cálculo de impuestos
- ✅ Descuentos progresivos
- ✅ Validación de cálculos

### 5. **Tests de Validación de Formularios** (`tests/validacion-formularios.spec.js`)
- ✅ Validación de nombres
- ✅ Validación de emails
- ✅ Validación de contraseñas
- ✅ Validación de teléfonos
- ✅ Validación de regiones y comunas
- ✅ Validación de direcciones
- ✅ Sanitización de datos

### 6. **Tests de Renderizado de Productos** (`tests/renderizado-productos.spec.js`)
- ✅ Creación de elementos de producto
- ✅ Renderizado de listas
- ✅ Renderizado de carruseles
- ✅ Renderizado de tablas de carrito
- ✅ Renderizado de resúmenes
- ✅ Estados de carga y error

### 7. **Tests de Búsqueda de Productos** (`tests/busqueda-productos.spec.js`)
- ✅ Búsqueda por texto
- ✅ Filtros por categoría
- ✅ Filtros por precio
- ✅ Búsqueda avanzada
- ✅ Ordenamiento de resultados
- ✅ Autocompletado
- ✅ Historial de búsquedas

### 8. **Tests de Categorización** (`tests/categorizacion-productos.spec.js`)
- ✅ Agrupación por categorías
- ✅ Filtrado por categorías
- ✅ Categorización por precio
- ✅ Categorización por tags
- ✅ Categorización por disponibilidad
- ✅ Estadísticas de categorías

### 9. **Tests de Navegación y Eventos** (`tests/navegacion-eventos.spec.js`)
- ✅ Manejo de navegación
- ✅ Eventos del carrito
- ✅ Eventos de formularios
- ✅ Eventos de búsqueda
- ✅ Eventos de modales
- ✅ Eventos de scroll
- ✅ Eventos de teclado
- ✅ Eventos touch

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# O con yarn
yarn install
```

### Configuración
Los archivos de configuración ya están incluidos:
- `package.json` - Dependencias y scripts
- `karma.conf.js` - Configuración de Karma
- `tests/` - Directorio con todos los tests

## 🧪 Ejecución de Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)
```bash
npm run test:watch
```

### Ejecutar tests específicos
```bash
# Ejecutar solo tests del carrito
karma start karma.conf.js --grep="carrito"

# Ejecutar solo tests de validación
karma start karma.conf.js --grep="validacion"
```

## 📊 Cobertura de Tests

### Funcionalidades Cubiertas:
- ✅ **Gestión del Carrito**: 15 tests
- ✅ **Formato de Moneda**: 12 tests  
- ✅ **localStorage**: 18 tests
- ✅ **Cálculos de Totales**: 16 tests
- ✅ **Validación de Formularios**: 14 tests
- ✅ **Renderizado**: 12 tests
- ✅ **Búsqueda**: 13 tests
- ✅ **Categorización**: 11 tests
- ✅ **Navegación y Eventos**: 15 tests

**Total: ~126 tests** cubriendo todas las funcionalidades principales.

## 🔧 Configuración de Karma

El archivo `karma.conf.js` está configurado para:
- **Frameworks**: Jasmine
- **Navegadores**: Chrome, Firefox, Edge
- **Archivos**: Incluye todos los archivos JS del proyecto y tests
- **Reporters**: Progress y Verbose
- **Auto-watch**: Habilitado para desarrollo

## 📁 Estructura de Archivos

```
proyecto/
├── package.json
├── karma.conf.js
├── tests/
│   ├── carrito.spec.js
│   ├── formato-moneda.spec.js
│   ├── localStorage.spec.js
│   ├── calculos-totales.spec.js
│   ├── validacion-formularios.spec.js
│   ├── renderizado-productos.spec.js
│   ├── busqueda-productos.spec.js
│   ├── categorizacion-productos.spec.js
│   └── navegacion-eventos.spec.js
├── products.js
├── carrito.js
├── master_script.js
└── README-TESTS.md
```

## 🎯 Características de los Tests

### Mocks y Stubs
- **localStorage**: Mock completo con spyOn
- **DOM**: Elementos mockeados para testing
- **Eventos**: Eventos simulados para testing
- **FormData**: Mock para formularios

### Patrones de Testing
- **Arrange-Act-Assert**: Estructura clara en todos los tests
- **BeforeEach/AfterEach**: Setup y cleanup automático
- **Descriptive Names**: Nombres descriptivos para cada test
- **Edge Cases**: Cobertura de casos límite

### Validaciones Incluidas
- ✅ Validación de entrada de datos
- ✅ Manejo de errores
- ✅ Casos límite
- ✅ Integración entre componentes
- ✅ Rendimiento de funciones

## 🚨 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Karma not found"
```bash
# Instalar Karma globalmente
npm install -g karma-cli
```

### Tests no se ejecutan
```bash
# Verificar configuración
karma start karma.conf.js --log-level debug
```

## 📈 Mejoras Futuras

### Tests Adicionales Sugeridos:
- [ ] Tests de integración end-to-end
- [ ] Tests de rendimiento
- [ ] Tests de accesibilidad
- [ ] Tests de compatibilidad entre navegadores
- [ ] Tests de carga con múltiples usuarios

### Métricas de Cobertura:
- [ ] Configurar Istanbul para cobertura de código
- [ ] Establecer umbrales mínimos de cobertura
- [ ] Reportes de cobertura en CI/CD

## 📞 Soporte

Para problemas o preguntas sobre los tests:
1. Revisar los logs de Karma
2. Verificar la configuración en `karma.conf.js`
3. Comprobar que todas las dependencias estén instaladas
4. Verificar que los archivos JS del proyecto estén disponibles

---

**¡Los tests están listos para ejecutarse!** 🎉

Ejecuta `npm test` para comenzar a verificar todas las funcionalidades de la tienda Level Up Store.
