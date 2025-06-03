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
          <Link to="/about#contacts" className="footer-link">Контакты</Link>
          <Link to="/delivery" className="footer-link">Доставка</Link>
          <Link to="/policy" className="footer-link">Политика</Link>
        </div>
      </div>
    </footer>
  );
}