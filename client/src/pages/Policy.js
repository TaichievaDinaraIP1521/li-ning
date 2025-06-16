import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import '../styles/Policy.css';

const Policy = () => {
  return (<PageTransition>
    <div className="app">
      <Header />
      <main className="policy-page">
        
            <div className="container">
            <h1 className="page-title">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>
            
            <section className="policy-section">
                <h2>1. Общие положения</h2>
                <p>
                Настоящая Политика конфиденциальности регулирует порядок обработки и использования 
                персональных данных пользователей сайта Li-Ning.
                </p>
            </section>
            
            <section className="policy-section">
                <h2>2. Собираемая информация</h2>
                <p>Мы можем собирать следующую информацию:</p>
                <ul>
                <li>ФИО, контактные данные</li>
                <li>Данные о заказах и покупках</li>
                <li>История посещения сайта</li>
                <li>IP-адрес и данные cookies</li>
                </ul>
            </section>
            
            <section className="policy-section">
                <h2>3. Использование информации</h2>
                <p>
                Собранная информация используется для обработки заказов, улучшения качества обслуживания 
                и персонализации пользовательского опыта.
                </p>
            </section>
            
            <section className="policy-section">
                <h2>4. Защита данных</h2>
                <p>
                Мы принимаем все необходимые меры для защиты ваших персональных данных от 
                несанкционированного доступа или раскрытия.
                </p>
            </section>
            </div>
        
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Policy;