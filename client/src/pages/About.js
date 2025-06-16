import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

const liningFounder = `${process.env.PUBLIC_URL}/assets/li-ning-founder.jpg`;
const founder2 = `${process.env.PUBLIC_URL}/assets/founder2.gif`;
const founder3 = `${process.env.PUBLIC_URL}/assets/founder3.jpg`;

const linin = `${process.env.PUBLIC_URL}/assets/linin.jpg`;
const linin2 = `${process.env.PUBLIC_URL}/assets/linin2.jpg`;
const linin3 = `${process.env.PUBLIC_URL}/assets/linin3.jpg`;

// Коллаборации
const buttlerImg = `${process.env.PUBLIC_URL}/assets/collab-buttler.webp`;
const wadeImg = `${process.env.PUBLIC_URL}/assets/collab-wade.jpg`;
const skateImg = `${process.env.PUBLIC_URL}/assets/collab-skate.avif`;

// Показы
const fashionShow1 = `${process.env.PUBLIC_URL}/assets/fashion-show1.jpg`;
const fashionShow2 = `${process.env.PUBLIC_URL}/assets/fashion-show2.jpg`;
const fashionShow3 = `${process.env.PUBLIC_URL}/assets/fashion-show3.jpg`;
const fashionShow4 = `${process.env.PUBLIC_URL}/assets/fashion-show4.webp`;

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
    description: "Эрик Эллингтон сотрудничал с Li-Ning в 2017–2020 гг., продвигая линейку All City. Он также стал одним из амбассадоров WOW — линейки обуви для Дуэйна Уэйда."
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
        {/* Основная информация */}
        <section className="about-section">
          <h1 className="about-title">ИСТОРИЯ LI-NING</h1>
          <div className="about-content">
            <div className="history">
              <div className="about-text">
                <h2>От олимпийского подиума к мировому бренду</h2>
                <p>История Li-Ning – китайского бренда спортивной одежды и обуви – началась в 1990 году, когда гимнаст Ли Нин, трехкратный олимпийский чемпион, решил создать компанию, которая бы помогала китайским спортсменам. Бренд быстро завоевал популярность благодаря качеству 
                  своей продукции и инновационным технологиям.</p>
                  <p>Компания Ли-Нинг стала первым официальным спонсором китайской сборной на Азиатских и Олимпийских играх.</p>
                  
              </div>

              <div className="about-image">
                <img src={liningFounder} alt="Ли Нин - основатель компании" />
                <img src={founder2} alt="Ли Нин - основатель компании" />
                <img src={founder3} alt="Ли Нин - основатель компании" />
              </div>
            </div>

            <div className="filosofy">
              <div className="about-text">
                <h2>Философия бренда</h2>
                <p>Ли Нинг понимал суть спортивного мастерства и соревнований. Он также был свидетелем положительного влияния легкой атлетики на жизнь людей. Поэтому гимнаст решил, что лозунгом компании будет фраза: «Пусть спорт осветит вашу страсть». Ведя постоянные исследования и разработки, Ли смог предложить самые передовые продукты и услуги в основных 
                  категориях: бег, баскетбол, бадминтон и тренировки. Бренд стал спонсором таких звезд, как игроки НБА Дуэйн Уэйд, Шакил О’Нил и Китайская баскетбольная лига.</p>
                <p>"Everything is Possible" — это не просто слоган, а отражение нашей философии."</p>
              </div>
              <div className="about-image">
                <img src={linin} alt="Ли Нин - основатель компании" />
                <img src={linin2} alt="Ли Нин - основатель компании" />
                <img src={linin3} alt="Ли Нин - основатель компании" />
              </div>
            </div>
          </div>
        </section>

        {/* Коллаборации */}
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
                  style={{ backgroundImage: `url(${collab.image})` }}
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

        {/* Показы */}
        <section className="fashion-section">
          <h2 className="section-title">LI-NING НА НЕДЕЛЕ МОДЫ В НЬЮ-ЙОРКЕ</h2>
          <div className="fashion-content">
            <p>В 2018 году компания дебютировала на Неделе моды в Нью-Йорке, создав премиальную линию одежды, которая включала в себя свитшоты и футболки в традиционных красных и белых цветах, оформленные китайскими иероглифами.</p>
            <div className="fashion-images">  
              <img src={fashionShow1} alt="Показ Li-Ning" />
              <img src={fashionShow2} alt="Коллекция на подиуме" />
            </div>
          </div>

          <div className="fashion-content" style={{marginTop:"50px"}}>
            <h2 className="section-title">LI-NING НА НЕДЕЛЕ МОДЫ В ПАРИЖЕ</h2>
            <p>В 2020 году Li-Ning принял участие в Неделе моды в Париже. Так компания отметила свой 30-летний юбилей. Коллекция FW20 включала в себя капсулу, созданную в сотрудничестве с известным китайским актером Джеки Чаном. Конечно, главной темой коллаборации было направление кунг-фу, в которой преобладали черный и бежевый цвета.</p>
            <div className="fashion-images">  
              <img src={fashionShow3} alt="Показ Li-Ning" />
              <img src={fashionShow4} alt="Коллекция на подиуме" />
            </div>
          </div>
        </section>

        {/* Контакты */}
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