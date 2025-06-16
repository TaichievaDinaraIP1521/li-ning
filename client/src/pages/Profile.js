
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import { FiUser, FiLogOut } from 'react-icons/fi';
import NeonButton from '../components/NeonButton';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, fetchCurrentUser, logout } = useCart();
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  // Статусы с переводом
  const statusOptions = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'processing', label: 'В обработке' },
    { value: 'shipped', label: 'Отправлен' },
    { value: 'delivered', label: 'Доставлен' },
    { value: 'cancelled', label: 'Отменен' }
  ];

  // Форматируем дату
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Неверная дата' : date.toLocaleString();
  };

  // Получаем лейбл статуса
  const getStatusLabel = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : 'Неизвестный статус';
  };

  // Загрузка данных пользователя и его заказов
 useEffect(() => {
  const loadUserAndOrders = async () => {
    try {
      // Загружаем заказы только если пользователь уже есть
      if (user && user.id) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const filteredOrders = orders.filter(order => order.userId === user.id);
        setUserOrders(filteredOrders);
      }
    } finally {
      setLoading(false);
    }
  };

  loadUserAndOrders();
}, [user?.id]);

  if (loading) {
    return <div>Загрузка профиля...</div>;
  }

  if (!user) {
    return (
      <div>
        <Header />
        <main className="profile-page">
          <h2>Вы не авторизованы</h2>
          <p>Пожалуйста, войдите, чтобы увидеть свой профиль.</p>
          <Link to="/auth">
            <NeonButton fullWidth>Перейти к авторизации</NeonButton>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="profile-page">
        <section className="profile-section">
          <h1 className="page-title">Профиль</h1>

          <div className="profile-card">
            <div className="profile-avatar">
              <FiUser size={60} />
            </div>
            <h2>{user?.name}</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>ID:</strong> {user?.id}</p>
            <p><strong>Роль:</strong> {user?.isAdmin ? 'Администратор' : 'Пользователь'}</p>

            <NeonButton 
              onClick={logout} 
              fullWidth 
              danger
            >
              <FiLogOut style={{ marginRight: '8px' }} /> Выйти
            </NeonButton>
          </div>
        </section>

        {/* История заказов */}
        <section className="orders-section">
          <h2 className="section-title">Ваши заказы</h2>

          {userOrders.length === 0 ? (
            <p>У вас пока нет заказов</p>
          ) : (
            <div className="orders-list">
              {userOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <p><strong>Номер заказа:</strong> #{order.id}</p>
                  <p><strong>Дата:</strong> {formatDate(order.date)}</p>
                  <p>
                    <strong>Статус:</strong>{' '}
                    <span className={`status-badge ${order.status || 'pending'}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </p>
                  <p><strong>Итого:</strong> {order.total.toLocaleString()} ₽</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;