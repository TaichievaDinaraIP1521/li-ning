import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';
import liningFounder from '../assets/li-ning-founder.jpg';
import linin from '../assets/linin.jpg';

// Импортируем изображения для коллаба
import buttlerImg from '../assets/collab-buttler.webp';
import wadeImg from '../assets/collab-wade.jpg';
import skateImg from '../assets/collab-skate.avif';

import fashionShow1 from '../assets/fashion-show1.jpg';
import fashionShow2 from '../assets/fashion-show2.jpg';
import fashionShow3 from '../assets/fashion-show3.jpg';
import fashionShow4 from '../assets/fashion-show4.webp';


const collaborations = [
  {
    id: 1,
    image: buttlerImg,
    title: "Джимми Батлер",
    description: "16 ноября 2020 года Li-Ning объявил о партнёрстве с Батлером, который покинул Jordan Brand (Nike) после 5 лет сотрудничества."
  },
  {
    id: 2,
    image: wadeImg,
    title: "Дуэйн Уэйд",
    description: "В 2012 году Ли Нинг подписал с Уэйдом контракт, и тот стал лицом бренда Way of Wade."
  },
  {
    id: 3,
    image: skateImg,
    title: "Skate",
    description: "Эрик Эллингтон сотрудничал с Li-Ning в 2017–2020 гг., продвигая линейку All City.Эллингтон стал одним из амбассадоров линейки Way of Wade (WOW), созданной для Дуэйна Уэйда."
  }
];
const About = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === collaborations.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? collaborations.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) nextSlide();
    if (touchStart - touchEnd < -100) prevSlide();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);


  return (
    <div className="app">
      <Header />
      <main className="about-page">
        {/* Основная информация о компании */}
        <section className="about-section">
          <h1 className="about-title">ИСТОРИЯ LI-NING</h1>
          
          <div className="about-content">
            <div className="about-text">
              <h2>От олимпийского подиума к мировому бренду</h2>
              <p>
              Бренд Li-Ning был 
              основан в 1990 году гимнастом Ли Нином 
              с целью создания качественной и 
              доступной спортивной одежды и 
              обуви для китайских спортсменов. 
              Название бренда, как не трудно догадаться, 
              было выбрано в честь своего основателя — 
              «Принца гимнастики», трёхкратного олимпийского чемпиона.
              </p>
              <p>
              Сегодня бренд продолжает 
              совершенствоваться и улучшать свои 
              технологии производства, чтобы 
              предоставить своим покупателям 
              качественную и удобную спортивную 
              обувь. Li-Ning активно сотрудничает 
              с профессиональными спортсменами и 
              спонсирует 
              большое количество турниров.</p>
              <h2>Философия бренда</h2>
              <p>
                "Everything is Possible" - это не просто слоган, а отражение нашей 
                философии. Мы верим, что спорт и мода могут менять жизни.
              </p>
              
            </div>
            <div>
              <div className="about-image">
                <img 
                  src={liningFounder}
                  alt="Ли Нин - основатель компании" 
                />
              </div>
              <div className="about-image">
                <img 
                  src={linin}
                  alt="Ли Нин - основатель компании" 
                />
              </div>
            </div>
            
          </div>
        </section>

        {/* Раздел коллабораций */}
        <section className="collabs-section">
          <h2 className="section-title">КОЛЛАБОРАЦИИ</h2>
          <div className="collab-slider-container">
            <button className="slider-arrow left" onClick={prevSlide}>
              <FiChevronLeft size={32} />
            </button>
            
            <div 
              className="collab-slider"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {collaborations.map((collab, index) => (
                <div 
                  key={collab.id}
                  className={`collab-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${collab.image})` }}
                >
                  <div className="slide-content2">
                    <h3>{collab.title}</h3>
                    <p>{collab.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="slider-arrow right" onClick={nextSlide}>
              <FiChevronRight size={32} />
            </button>
          </div>
        </section>
        {/* Раздел моды */}
        <section className="fashion-section">
          <h2 className="section-title">LI-NING НА НЕДЕЛЕ МОДЫ В НЬЮ-ЙОРКЕ</h2>
          <div className="fashion-content">
            <p>
              В 2018 году компания дебютировала на Неделе 
              моды в Нью-Йорке, создав премиальную линию 
              одежды, которая включала в себя свитшоты и 
              футболки в традиционных красных и белых цветах, 
              оформленные китайскими иероглифами. 
            </p>
            <div className="fashion-images">  
              <img src={fashionShow1} alt="Показ Li-Ning" />
              <img src={fashionShow2} alt="Коллекция на подиуме" />
            </div>
          </div>

          <div className="fashion-content" style={{marginTop:"50px"}}>
            <h2 className="section-title">LI-NING НА НЕДЕЛЕ МОДЫ В ПАРИЖЕ</h2>
            <p>
              В 2020 году Li-Ning принял участие в Неделе 
              моды в Париже. Так компания отметила свой 30-
              летний юбилей. Коллекция FW20 включала в себя 
              капсулу, созданную в сотрудничестве с известным 
              китайским актером Джеки Чаном. Конечно, главной 
              темой коллаборации было направление кунг-фу, 
              в которой преобладали черный и бежевый цвета.  
            </p>
            <div className="fashion-images">  
              <img src={fashionShow3} alt="Показ Li-Ning" />
              <img src={fashionShow4} alt="Коллекция на подиуме" />
            </div>
          </div>
        </section>

        {/* Контакты (якорный раздел) */}
        <section id="contacts" className="contacts-section">
          <h2 className="contacts-title">КОНТАКТЫ</h2>
          <div className="contacts-grid">
            <div className="contact-item">
              <h3>Адрес</h3>
              <p>г. Москва, ул. Спортивная, 10</p>
              <p>Бизнес центр "Олимпийский", 5 этаж</p>
            </div>
            
            <div className="contact-item">
              <h3>Телефоны</h3>
              <p>+7 (495) 123-45-67</p>
              <p>+7 (800) 100-20-30</p>
            </div>
            
            <div className="contact-item">
              <h3>Email</h3>
              <p>info@lining-russia.ru</p>
            </div>
            
            <div className="contact-item">
              <h3>Режим работы</h3>
              <p>Пн-Пт: 9:00 - 20:00</p>
              <p>Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;