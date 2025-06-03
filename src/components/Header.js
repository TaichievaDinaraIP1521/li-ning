import React, { useState } from 'react';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom'; 
import '../styles/main.css';
import '../styles/header.css';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, user } = useCart(); // Получаем количество товаров в корзине и данные пользователя

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container container">
        {/* Мобильное меню */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Логотип */}
        <Link to="/" className="logo" onClick={closeMenu}>
          LI-NING
        </Link>
        
        {/* Основное меню и поиск */}
        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <nav className="nav-menu">
            <Link to="/products" className="nav-link" onClick={closeMenu}>Товары</Link>
            <Link to="/about" className="nav-link" onClick={closeMenu}>О нас</Link>
            <Link to="/auth" className="nav-link" onClick={closeMenu}>Вход</Link>
            
            {/* Ссылка на админ-панель (только для админов) */}
            {user?.isAdmin && (
              <Link to="/admin" className="nav-link admin-link" onClick={closeMenu}>
                <FiSettings size={20} style={{ marginRight: 5 }} />
                Админ-панель
              </Link>
            )}
          </nav>

          <div className="search-cart-wrapper">
            {/* Поиск */}
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Поиск..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Корзина с отображением количества товаров */}
            <Link to="/cart" className="cart-button" onClick={closeMenu}>
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}