import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AdminPanel.css';
import { FiPackage, FiSettings, FiLogOut, FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const { user, logout, isAdmin } = useCart();
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  // Статусы для заказов
  const statusOptions = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'processing', label: 'В обработке' },
    { value: 'shipped', label: 'Отправлен' },
    { value: 'delivered', label: 'Доставлен' },
    { value: 'cancelled', label: 'Отменен' }
  ];

  // Загрузка заказов из localStorage
  useEffect(() => {
    const loadOrders = () => {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      setAllOrders(orders);
    };

    loadOrders();
  }, []);

  // Проверка прав администратора
  if (!isAdmin) {
    return (
      <div className="admin-layout">
        <Header />
        <main className="admin-panel">
          <div className="admin-denied">
            <FiAlertTriangle size={48} className="denied-icon" />
            <h1>Доступ запрещен</h1>
            <p>Требуются права администратора</p>
            <button onClick={() => navigate('/')} className="return-btn">
              Вернуться на главную
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Обновление статуса заказа
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = allOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setAllOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    toast.success(`Статус изменён на "${statusOptions.find(s => s.value === newStatus)?.label}"`);
  };

  return (
    <div className="admin-layout">
      <Header />
      <main className="admin-panel">
        <div className="admin-header">
          <h1>
            <FiSettings size={28} />
            Панель администратора
          </h1>
          <div className="admin-info">
            <p>Вы вошли как: <strong>{user.name}</strong></p>
            <p>Email: <strong>{user.email}</strong></p>
          </div>
          <button onClick={logout} className="admin-logout-btn">
            <FiLogOut size={18} /> Выйти
          </button>
        </div>

        {/* Управление заказами */}
        <div className="admin-sections">
          <section className="orders-section">
            <h2><FiPackage /> Управление заказами</h2>

            {allOrders.length === 0 ? (
              <div className="no-orders">
                <p>Нет активных заказов</p>
              </div>
            ) : (
              <div className="orders-grid">
                {allOrders.map((order) => {
                  const statusLabel = statusOptions.find(s => s.value === order.status)?.label || 'Неизвестно';
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <h3>Заказ #{order.id}</h3>
                        <span className={`status-badge ${order.status}`}>
                          {statusLabel}
                        </span>
                      </div>

                      <div className="order-details">
                        <p><strong>Пользователь ID:</strong> {order.userId}</p>
                        <p><strong>Дата:</strong> {new Date(order.date).toLocaleString()}</p>
                        <p><strong>Итого:</strong> {order.total.toLocaleString()} ₽</p>
                      </div>

                      <div className="order-controls">
                        <select
                          value={order.status || 'pending'}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;