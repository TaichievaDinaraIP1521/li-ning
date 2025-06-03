import React from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AdminPanel.css';
import { FiPackage, FiUsers, FiSettings } from 'react-icons/fi';

const AdminPanel = () => {
  const { allOrders, updateOrderStatus, isAdmin, user } = useCart();

  if (!isAdmin) {
    return (
      <div className="app">
        <Header />
        <main className="admin-panel">
          <div className="admin-denied">
            <h1>Доступ запрещен</h1>
            <p>Требуются права администратора</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusOptions = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'processing', label: 'В обработке' },
    { value: 'shipped', label: 'Отправлен' },
    { value: 'delivered', label: 'Доставлен' },
    { value: 'cancelled', label: 'Отменен' }
  ];

  return (
    <div className="app">
      <Header />
      <main className="admin-panel">
        <div className="admin-header">
          <h1>
            <FiSettings size={28} />
            Панель администратора
          </h1>
          <div className="admin-info">
            <p>Вы вошли как: <strong>{user?.name}</strong></p>
            <p>Email: <strong>{user?.email}</strong></p>
          </div>
        </div>

        <div className="admin-sections">
          <section className="orders-section">
            <h2><FiPackage /> Управление заказами</h2>
            <div className="orders-grid">
              {allOrders.length === 0 ? (
                <p>Нет заказов</p>
              ) : (
                allOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>Заказ #{order.id.slice(0, 8)}</h3>
                      <span className={`status-badge ${order.status}`}>
                        {statusOptions.find(s => s.value === order.status)?.label}
                      </span>
                    </div>
                    
                    <div className="order-details">
                      <p><strong>Дата:</strong> {new Date(order.date).toLocaleString()}</p>
                      <p><strong>Сумма:</strong> {order.total.toLocaleString()} ₽</p>
                      <p><strong>Товаров:</strong> {order.items.length}</p>
                    </div>

                    <div className="order-controls">
                      <select
                        value={order.status}
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

                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item.cartId} className="order-item">
                          <img src={item.image} alt={item.name} width="40" />
                          <span>{item.name}</span>
                          <span>{item.price.toLocaleString()} ₽</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;