import React, { useState, useEffect } from 'react';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editId
        ? `http://localhost:4000/api/admin/productos/${editId}`
        : 'http://localhost:4000/api/admin/productos';

      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setForm({ nombre: '', precio: '', descripcion: '', imagen: '' });
        setEditId(null);
        cargarProductos();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
    setEditId(producto.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await fetch(`http://localhost:4000/api/admin/productos/${id}`, {
          method: 'DELETE'
        });
        cargarProductos();
      } catch (error) {
        console.error('Error eliminando:', error);
      }
    }
  };

  return (
    <div className="admin-productos">
      <h2>Gestión de Productos</h2>

      <form onSubmit={handleSubmit} className="producto-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          step="0.01"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de imagen"
          value={form.imagen}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {editId ? 'Actualizar' : 'Crear'} Producto
        </button>
        {editId && (
          <button type="button" onClick={() => {
            setEditId(null);
            setForm({ nombre: '', precio: '', descripcion: '', imagen: '' });
          }}>
            Cancelar
          </button>
        )}
      </form>

      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.descripcion}</td>
              <td>
                {producto.imagen && (
                  <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '50px' }} />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(producto)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(producto.id)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
