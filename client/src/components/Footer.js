import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <p className="copyright">Li-Ning © 2025</p>
        <div className="footer-links">
          <Link 
            to="/about" 
            className="footer-link"
            onClick={(e) => {
              // Плавный скролл к контактам после перехода
              setTimeout(() => {
                const contacts = document.getElementById('contacts');
                if (contacts) {
                  contacts.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          >
            Контакты
          </Link>
          <Link to="/delivery" className="footer-link">Доставка</Link>
          <Link to="/policy" className="footer-link">Политика</Link>
        </div>
      </div>
    </footer>
  );
}