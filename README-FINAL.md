# 🎮 Level Up Store - Aplicación Web + Tests

## 🚀 Comandos Principales

### 🌐 **Aplicación Web**
```bash
npm start
```
- ✅ Inicia el servidor web en `http://localhost:3000`
- ✅ Abre automáticamente el navegador
- ✅ Muestra la página principal de la tienda

### 🧪 **Tests**
```bash
npm test
```
- ✅ Ejecuta todos los tests unitarios
- ✅ Muestra resultados en consola
- ✅ 10 tests funcionando correctamente

### 🔄 **Desarrollo**
```bash
npm run test:watch
```
- ✅ Tests en modo watch (auto-reload)
- ✅ Ideal para desarrollo continuo

## 📁 Estructura del Proyecto

```
proyecto/
├── index.html              # 🏠 Página principal
├── Master_v2.html          # 🛒 Tienda principal
├── carrito.html            # 🛒 Página del carrito
├── registrarUsuario.html   # 👤 Registro de usuarios
├── products.js             # 📦 Productos
├── carrito.js              # 🛒 Lógica del carrito
├── master_script.js        # 🎯 Script principal
├── tests/                  # 🧪 Tests unitarios
│   └── test-basico.spec.js # ✅ 10 tests funcionales
├── package.json            # ⚙️ Configuración
└── karma.conf.js           # 🧪 Configuración de tests
```

## 🎯 Funcionalidades de la Aplicación

### 🛒 **Tienda Web**
- ✅ Catálogo de productos gaming
- ✅ Carrito de compras funcional
- ✅ Registro de usuarios
- ✅ Interfaz responsive
- ✅ Navegación intuitiva

### 🧪 **Tests Unitarios**
- ✅ Formateo de moneda
- ✅ Gestión del carrito
- ✅ Cálculos de totales
- ✅ Validación de datos
- ✅ Operaciones CRUD

## 🚀 Cómo Usar

### 1. **Iniciar la Aplicación**
```bash
npm start
```
Esto abrirá tu navegador en `http://localhost:3000` con la página principal.

### 2. **Navegar por la Tienda**
- **Página Principal**: `index.html` (punto de entrada)
- **Tienda**: `Master_v2.html` (catálogo de productos)
- **Carrito**: `carrito.html` (gestión de compras)
- **Registro**: `registrarUsuario.html` (nuevos usuarios)

### 3. **Ejecutar Tests**
```bash
npm test
```
Verás los resultados de los 10 tests en la consola.

## 📊 Estado del Proyecto

### ✅ **Completamente Funcional**
- 🌐 **Aplicación Web**: Funcionando en puerto 3000
- 🧪 **Tests**: 10 tests ejecutándose correctamente
- 📱 **Responsive**: Interfaz adaptable
- 🛒 **Carrito**: Gestión completa de productos

### 🎯 **Características Implementadas**
- **Frontend**: HTML, CSS, JavaScript vanilla
- **Testing**: Karma + Jasmine
- **Servidor**: HTTP Server con auto-open
- **Navegación**: Multi-página con enlaces

## 🔧 Configuración Técnica

### **Servidor Web**
- **Puerto**: 3000
- **Auto-open**: Habilitado
- **CORS**: Configurado para desarrollo

### **Tests**
- **Framework**: Jasmine
- **Runner**: Karma
- **Navegador**: Chrome
- **Cobertura**: 10 tests unitarios

## 🎉 ¡Listo para Usar!

### **Para Desarrollo Web:**
```bash
npm start
# Abre http://localhost:3000
```

### **Para Testing:**
```bash
npm test
# Ejecuta 10 tests unitarios
```

### **Para Desarrollo Continuo:**
```bash
npm run test:watch
# Tests con auto-reload
```

## 📈 Próximos Pasos

### **Mejoras Sugeridas:**
1. **Agregar más tests** para mayor cobertura
2. **Implementar React** para mejor gestión de estado
3. **Agregar base de datos** para persistencia
4. **Implementar autenticación** de usuarios
5. **Agregar pagos** con Stripe/PayPal

### **Tests Adicionales:**
- Tests de integración
- Tests de UI/UX
- Tests de rendimiento
- Tests de accesibilidad

---

**¡Tu aplicación Level Up Store está lista para usar!** 🎮✨

Ejecuta `npm start` para comenzar a explorar tu tienda de gaming.
