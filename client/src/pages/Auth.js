import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Auth.css';
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && !formData.name.trim()) {
      setError('Введите имя');
      return;
    }
    if (!formData.email || !formData.password) {
      setError('Заполните все обязательные поля');
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const user = isLogin
        ? await login(formData.email, formData.password)
        : await register(formData.name, formData.email, formData.password);

      toast.success(isLogin ? 'Вход выполнен успешно!' : 'Регистрация прошла успешно!');
      
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
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
            <motion.div 
              className="auth-error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiAlertCircle className="error-icon" />
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleChange}
                  minLength="2"
                  required
                />
              </div>
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

            <div className="input-group password-input">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={isLogin ? 'Пароль' : 'Новый пароль'}
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
              {/* Кнопка переключения видимости - теперь всегда видна */}
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {!isLogin && (
              <div className="input-group password-input">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`auth-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <p className="toggle-auth" onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setFormData({
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
            });
          }}>
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