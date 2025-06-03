import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Auth.css';
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isLogin) {
        // Мок авторизация
        const mockUser = {
          id: Date.now(),
          name: formData.email.split('@')[0] || 'Пользователь',
          email: formData.email,
          isAdmin: formData.email.includes('@admin.'),
          avatar: `https://i.pravatar.cc/150?u=${formData.email}`
        };
        login(mockUser);
        navigate('/');
      } else {
        // Мок регистрация
        const newUser = {
          id: Date.now(),
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          isAdmin: formData.isAdmin,
          avatar: `https://i.pravatar.cc/150?u=${formData.email}`
        };
        login(newUser);
        navigate('/');
      }
    } catch (err) {
      setError(isLogin 
        ? 'Неверный email или пароль' 
        : 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="auth-page">
        <div className="auth-form">
          <h1>
            {isLogin ? (
              <>
                <FiLogIn size={24} style={{ marginRight: 10 }} />
                ВХОД
              </>
            ) : (
              <>
                <FiUserPlus size={24} style={{ marginRight: 10 }} />
                РЕГИСТРАЦИЯ
              </>
            )}
          </h1>

          {error && (
            <div className="auth-error">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    minLength="2"
                  />
                </div>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                  />
                  <span>Регистрация как администратор</span>
                </label>
              </>
            )}

            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? (
                'Загрузка...'
              ) : isLogin ? (
                'Войти'
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </form>

          <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? (
              <>Нет аккаунта? <span>Зарегистрируйтесь</span></>
            ) : (
              <>Уже есть аккаунт? <span>Войдите</span></>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;