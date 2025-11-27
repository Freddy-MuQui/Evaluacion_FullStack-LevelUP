import React, { useState, useEffect } from 'react';
import AdminProductos from './AdminProductos';
import AdminUsuarios from './AdminUsuarios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [tab, setTab] = useState('productos');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </header>

      <nav className="admin-tabs">
        <button
          className={tab === 'productos' ? 'active' : ''}
          onClick={() => setTab('productos')}
        >
          Productos
        </button>
        <button
          className={tab === 'usuarios' ? 'active' : ''}
          onClick={() => setTab('usuarios')}
        >
          Usuarios
        </button>
      </nav>

      <div className="admin-content">
        {tab === 'productos' && <AdminProductos />}
        {tab === 'usuarios' && <AdminUsuarios />}
      </div>
    </div>
  );
};

export default AdminPanel;
