// src/components/Admin/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

/**
 * @function DashboardPage
 * @description Componente del panel administrativo (Dashboard), basado en la Figura 9.
 * Muestra un resumen de métricas clave y enlaces de navegación.
 */
const DashboardPage = () => {
    // Estado para las métricas del Dashboard (simulado).
    // Inicializamos con los valores de la Figura 9, pero con Compras dinámicas.
    const [metrics, setMetrics] = useState({
        compras: 1234, // Valor inicial (Figura 9)
        productos: 400,
        usuarios: 890,
    });

    // Hook para leer las compras realizadas del almacenamiento local
    useEffect(() => {
        // Obtenemos el número de compras almacenado.
        // Usamos JSON.parse para convertir el string a un número o 0 si no existe.
        const storedPurchases = JSON.parse(localStorage.getItem('adminTotalPurchases')) || 0;
        
        // Actualizamos el estado para reflejar las compras reales (simuladas)
        setMetrics(prev => ({ 
            ...prev, 
            compras: storedPurchases // Usamos el número de compras registrado
        }));
    }, []);

    // Definición de las tarjetas de navegación del Dashboard (basado en Figura 9)
    const navCards = [
        {
            title: "Dashboard",
            description: "Vista general de todas las métricas y estadísticas clave del sistema.",
            icon: "fas fa-chart-line",
            link: "/admin/dashboard",
        },
        {
            title: "Órdenes",
            description: "Gestión y seguimiento de todas las órdenes de compra realizadas.",
            icon: "fas fa-box-open",
            link: "/admin/orders", // Ruta a crear
        },
        {
            title: "Productos",
            description: "Administración e inventario de los productos disponibles.",
            icon: "fas fa-box",
            link: "/admin/products", // Ruta a crear
        },
        {
            title: "Categorías",
            description: "Organizar productos en categorías para facilitar su navegación.",
            icon: "fas fa-tags",
            link: "/admin/categories", // Ruta a crear
        },
        {
            title: "Usuarios",
            description: "Gestión de cuentas de usuario y sus roles dentro del sistema.",
            icon: "fas fa-users",
            link: "/admin/users", // Ruta a crear
        },
        {
            title: "Reportes",
            description: "Generación de informes detallados sobre las operaciones del sistema.",
            icon: "fas fa-file-alt",
            link: "/admin/reports", // Ruta a crear
        },
        {
            title: "Perfil",
            description: "Administración de la información personal y configuración de cuenta.",
            icon: "fas fa-user-cog",
            link: "/admin/profile", // Ruta a crear
        },
        {
            title: "Tienda (Frontend)",
            description: "Visualiza la tienda en tiempo real. Volver al e-commerce.",
            icon: "fas fa-store",
            link: "/", // Volver al home
        },
    ];

    // Función simple de "cerrar sesión" para el admin
    const handleLogout = () => {
        localStorage.removeItem('userRole'); // Limpiamos el rol
        alert("Sesión de administrador cerrada.");
        window.location.href = '/login'; // Redirigir al login
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Sidebar de Navegación del Administrador */}
            <nav className="d-flex flex-column p-3 text-white bg-dark" style={{ width: '250px' }}>
                <Link to="/admin/dashboard" className="text-white text-decoration-none mb-4">
                    <span className="fs-5 fw-bold">ADMIN PANEL</span>
                </Link>
                <ul className="nav nav-pills flex-column mb-auto">
                    {navCards.map((card) => (
                        <li key={card.title} className="nav-item mb-1">
                            {/* Usamos el color de la Figura 9 para los elementos seleccionados */}
                            <Link 
                                to={card.link} 
                                className={`nav-link text-white ${card.title === 'Dashboard' ? 'active' : ''}`}
                                style={{ backgroundColor: card.title === 'Dashboard' ? '#2AF598' : '' }} 
                                aria-current={card.title === 'Dashboard' ? 'page' : null}
                            >
                                <i className={`${card.icon} me-2`}></i>
                                {card.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto">
                    <button className="btn btn-danger w-100" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
                    </button>
                </div>
            </nav>

            {/* Contenido Principal del Dashboard */}
            <div className="flex-grow-1 p-4">
                <h1 className="mb-4">Dashboard <small className="text-muted fs-6">(Resumen de las actividades diarias)</small></h1>
                
                {/* Tarjetas de Resumen de Métricas (Figura 9) */}
                <div className="row g-4 mb-5">
                    {/* Tarjeta de Compras */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card text-white p-3" style={{ backgroundColor: '#007bff' }}>
                            <div className="d-flex align-items-center">
                                <i className="fas fa-shopping-cart fa-3x me-3"></i>
                                <div>
                                    <p className="mb-0 text-uppercase fw-bold">Compras</p>
                                    <h2 className="mb-0">{metrics.compras.toLocaleString()}</h2>
                                    <small>Probabilidad de devolución: 20%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tarjeta de Productos */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card text-white p-3" style={{ backgroundColor: '#28a745' }}>
                            <div className="d-flex align-items-center">
                                <i className="fas fa-box fa-3x me-3"></i>
                                <div>
                                    <p className="mb-0 text-uppercase fw-bold">Productos</p>
                                    <h2 className="mb-0">{metrics.productos.toLocaleString()}</h2>
                                    <small>Inventario actual: 500</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tarjeta de Usuarios */}
                    <div className="col-lg-4 col-md-12">
                        <div className="card text-white p-3" style={{ backgroundColor: '#ffc107' }}>
                            <div className="d-flex align-items-center">
                                <i className="fas fa-users fa-3x me-3"></i>
                                <div>
                                    <p className="mb-0 text-uppercase fw-bold">Usuarios</p>
                                    <h2 className="mb-0">{metrics.usuarios.toLocaleString()}</h2>
                                    <small>Usuarios activos: 85%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de Navegación Rápida */}
                <div className="row g-4">
                    {navCards.map((card, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <Link to={card.link} className="card h-100 text-decoration-none text-dark shadow-sm hover-shadow">
                                <div className="card-body text-center p-4">
                                    <i className={`${card.icon} fa-3x mb-3`} style={{ color: '#08AEEA' }}></i>
                                    <h5 className="card-title fw-bold">{card.title}</h5>
                                    <p className="card-text small text-muted">{card.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default DashboardPage;