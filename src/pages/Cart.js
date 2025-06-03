import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    isAuthenticated,
    createOrder,
    user
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Для оформления заказа войдите в систему');
      navigate('/auth?return=cart');
      return;
    }
    
    const order = createOrder();
    if (order) {
      alert(`Заказ #${order.id.slice(0, 8)} успешно оформлен!`);
      navigate('/profile');
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="cart-page">
        <h1>Корзина</h1>
        
        {!isAuthenticated && (
          <div className="auth-warning">
            <p>Войдите в систему для оформления заказа</p>
            <button onClick={() => navigate('/auth?return=cart')}>
              Войти
            </button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.cartId} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.price.toLocaleString()} ₽</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Итого: {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ₽</h2>
              <button 
                onClick={handleCheckout}
                className="checkout-btn"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;