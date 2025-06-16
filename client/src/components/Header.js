import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/header.css';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, cartItems, isAuthenticated } = useCart();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Закрытие меню при клике вне области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Закрытие меню при смене маршрута
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Подсчёт товаров в корзине
  const totalCartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container container">
        {/* Мобильное меню */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Логотип */}
        <Link to="/" className="logo" onClick={closeMenu}>
          LI-NING
        </Link>
        
        {/* Навигация */}
        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <nav className="nav-menu">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Главная
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              О нас
            </Link>
            <Link 
              to="/auth" 
              className={`nav-link ${location.pathname === '/auth' ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Вход
            </Link>
            {user?.isAdmin && (
              <Link 
                to="/admin" 
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Админ-панель
              </Link>
            )}
          </nav>

          {/* Корзина и профиль */}
          <div className="header-actions">
            <Link to="/cart" className="cart-button" onClick={closeMenu} aria-label="Корзина">
              <FiShoppingCart size={20} />
              <span className="cart-text">Корзина</span>
              {totalCartCount > 0 && (
                <span className="cart-count">{totalCartCount}</span>
              )}
            </Link>
            
                {/* Переход в профиль при клике на кнопку */}
            {isAuthenticated ? (
              <div className="profile-dropdown">
                <Link to="/auth" className="profile-button" onClick={closeMenu}>
                  <FiUser size={20} />
                </Link>
              </div>
            ) : (
              <Link 
                to="/profile" 
                className="profile-button"
                onClick={closeMenu}
                aria-label="Войти"
              >
                <FiUser size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}