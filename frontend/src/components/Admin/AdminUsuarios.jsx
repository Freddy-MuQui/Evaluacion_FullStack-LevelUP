import React, { useState, useEffect } from 'react';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const handleEdit = (usuario) => {
    setEditId(usuario.id);
    setEditForm(usuario);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/usuarios/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        setEditId(null);
        cargarUsuarios();
      }
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este usuario?')) {
      try {
        await fetch(`http://localhost:4000/api/admin/usuarios/${id}`, {
          method: 'DELETE'
        });
        cargarUsuarios();
      } catch (error) {
        console.error('Error eliminando usuario:', error);
      }
    }
  };

  return (
    <div className="admin-usuarios">
      <h2>Gestión de Usuarios</h2>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>
                {editId === usuario.id ? (
                  <input
                    value={editForm.nombre}
                    onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                  />
                ) : (
                  usuario.nombre
                )}
              </td>
              <td>
                {editId === usuario.id ? (
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                ) : (
                  usuario.email
                )}
              </td>
              <td>
                {editId === usuario.id ? (
                  <select
                    value={editForm.rol}
                    onChange={(e) => setEditForm({ ...editForm, rol: e.target.value })}
                  >
                    <option>usuario</option>
                    <option>admin</option>
                  </select>
                ) : (
                  usuario.rol
                )}
              </td>
              <td>
                {editId === usuario.id ? (
                  <>
                    <button onClick={handleSaveEdit} className="btn-save">Guardar</button>
                    <button onClick={() => setEditId(null)} className="btn-cancel">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(usuario)} className="btn-edit">Editar</button>
                    <button onClick={() => handleDelete(usuario.id)} className="btn-delete">Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarios;
