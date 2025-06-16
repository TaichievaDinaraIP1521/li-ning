import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import NeonButton from '../components/NeonButton';
import '../styles/OrderSuccess.css';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderSuccess() {
  const { state } = useLocation();

  // Проверяем наличие заказа
  const order = state?.order;

  if (!order) {
    return (
      <div className="order-success-container">
        <div className="order-success-card error">
          <h2>Не удалось получить данные</h2>
          <p>Пожалуйста, оформите заказ заново.</p>
          <Link to="/cart">
            <NeonButton text="Вернуться в корзину" fullWidth danger />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <h1>Заказ оформлен!</h1>
        <p><strong>Номер:</strong> #{order.id}</p>
        <p><strong>Сумма:</strong> {order.total.toLocaleString()} ₽</p>
        <p><strong>Статус:</strong> <span className="status-badge pending">Ожидает</span></p>

        <div className="order-success-actions">
          <Link to="/profile">
            <NeonButton text="Мои заказы" fullWidth danger />
          </Link>
          <Link to="/">
            <NeonButton text="Продолжить покупки" fullWidth />
          </Link>
        </div>
      </div>
    </div>
  );
}