import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import NeonButton from '../components/NeonButton';
import '../styles/Cart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart, FiArrowRight, FiTrash2 } from 'react-icons/fi';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    decreaseQuantity, 
    placeOrder, 
    cartTotal, 
    user,
    increaseQuantity, 
    clearCart,
    createOrder 
  } = useCart();

   const navigate = useNavigate();
  const validCart = Array.isArray(cart) ? cart : [];

  const handleCheckout = async () => {
    // Проверка авторизации
    if (!user) {
      toast.info('Для оформления заказа войдите в систему');
      navigate('/auth?return=/cart');
      return;
    }

    // Проверка пустой корзины
    if (validCart.length === 0) {
      toast.warning('Ваша корзина пуста');
      return;
    }

    try {
      // Создаем и сохраняем заказ
      const order = await createOrder({
        userId: user.id,
        items: validCart,
        total: cartTotal,
        status: 'processing',
        createdAt: new Date().toISOString()
      });

      // Очищаем корзину
      clearCart();
      
      // Перенаправляем с полными данными заказа
      navigate('/order-success', { 
        state: { 
          orderId: order.id,
          orderTotal: cartTotal,
          orderItems: validCart,
          orderDate: new Date().toISOString()
        } 
      });
      
    } catch (error) {
      toast.error(`Ошибка при оформлении заказа: ${error.message}`);
    }
  };


  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    toast.success(`${item.name} удален из корзины`, {
      position: "top-right",
      autoClose: 2000
    });
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>
          <FiShoppingCart />
          Корзина {user && <span>({user.name})</span>}
        </h1>
      </div>

      {!user && (
        <div className="auth-notice">
          <p>Войдите в систему для сохранения корзины и оформления заказа</p>
          <Link to="/auth" className="auth-link">
            Войти или зарегистрироваться <FiArrowRight />
          </Link>
        </div>
      )}

      {validCart.length === 0 ? (
        <div className="empty-cart">
          <FiShoppingCart size={64} className="empty-cart-icon" />
          <h2>Ваша корзина пуста</h2>
          <p>Найдите что-нибудь интересное в нашем каталоге</p>
          <Link to="/products" className="browse-products-btn">
            Перейти к товарам
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {validCart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image || '/li-ning/assets/images/placeholder-product.jpg'} 
                  alt={item.name} 
                  className="item-image"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <div className="item-info">
                  <h3 onClick={() => navigate(`/product/${item.id}`)}>
                    {item.name}
                  </h3>
                  <div className="item-price">{(item.price * item.quantity).toLocaleString()} ₽</div>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn minus"
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item.id)} // Используем функцию из контекста
                      className="quantity-btn plus"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => handleRemoveItem(item)} 
                    className="remove-button"
                    aria-label="Удалить товар"
                  >
                    <FiTrash2 size={20} color="#e74c3c" />
                  </button>
                </div>
                
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Сумма заказа</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Товары ({validCart.length})</span>
                <span>{cartTotal.toLocaleString()} ₽</span>
              </div>
              <div className="summary-row">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="summary-total">
                <span>Итого к оплате</span>
                <span>{cartTotal.toLocaleString()} ₽</span>
              </div>
            </div>

          <NeonButton 
            onClick={() => {
              const order = placeOrder(); // создаёт заказ и возвращает его
              if (order) {
                navigate('/order-success', { state: { order } }); // передаем в state
              } else {
                toast.warning('Корзина пуста или вы не вошли');
              }
            }}
            disabled={!user || validCart.length === 0}
            fullWidth
          >
            Оформить заказ
          </NeonButton>
                      
            {!user && (
              <p className="checkout-note">
                Для оформления заказа требуется войти в систему
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;