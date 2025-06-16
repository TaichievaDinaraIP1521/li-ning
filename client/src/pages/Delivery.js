import React from 'react';
import Header from '../components/Header';
import { PageTransition } from '../components/PageTransition';
import Footer from '../components/Footer';
import '../styles/Delivery.css';

const Delivery = () => {
  return (
    <PageTransition>
    <div className="app">
      <Header />
      <main className="delivery-page">
        
            <div className="container">
            <h1 className="page-title">ДОСТАВКА И ОПЛАТА</h1>
            
            <section className="delivery-section">
                <h2>Способы доставки</h2>
                <div className="delivery-methods">
                <div className="method-card">
                    <h3>Курьерская доставка</h3>
                    <p>Доставка по Москве в течение 1-2 дней</p>
                    <p>Стоимость: 300 ₽ (бесплатно при заказе от 5000 ₽)</p>
                </div>
                
                <div className="method-card">
                    <h3>Самовывоз</h3>
                    <p>Заберите заказ из нашего магазина по адресу:</p>
                    <p>г. Москва, ул. Спортивная, 10</p>
                    <p>Бесплатно, доступно с 10:00 до 20:00</p>
                </div>
                
                <div className="method-card">
                    <h3>Почта России</h3>
                    <p>Доставка по всей России 5-14 дней</p>
                    <p>Стоимость рассчитывается индивидуально</p>
                </div>
                </div>
            </section>
            
            <section className="payment-section">
                <h2>Способы оплаты</h2>
                <ul className="payment-methods">
                  <li>Наличными курьеру</li>
                  <li>Банковской картой онлайн</li>
                  <li>Apple Pay / Google Pay</li>
                  <li>Наложенный платеж (для почтовых отправлений)</li>
                </ul>
            </section>
            </div>
        
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Delivery;