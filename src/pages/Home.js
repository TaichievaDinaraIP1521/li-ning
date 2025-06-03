import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NeonButton from '../components/NeonButton';
import { 
  FaRunning, 
  FaBasketballBall,
  FaYinYang,
  FaStreetView,
  FaAtom,
  FaRobot,
  FaSpaceShuttle,
  FaTrophy,
  FaSkating,
} from 'react-icons/fa';
import '../styles/main.css';
import '../styles/slider.css';
import '../styles/categories.css';

// Изображения коллекций 
import trendBg from '../assets/trend.jpg';
import pantoneBg from '../assets/pantone.avif';
import badfiveBg from '../assets/badfive.jpg';
import wadeRussellBg from '../assets/wade&russel.jpeg';
import skatingBg from '../assets/skate.avif';

// Изображения категорий
import runningBg from '../assets/running.jpg';
import basketballBg from '../assets/basketball.webp';
import yogaBg from '../assets/yoga.jpg';
import tenniswearBg from '../assets/tennis.avif';

const collections = [
  { 
    id: 1, 
    name: 'TREND', 
    description: 'Новейшие модели сезона',
    bgImage: trendBg,
    icon: <FaAtom className="collection-icon" />
  },
  { 
    id: 2, 
    name: 'PANTONE', 
    description: 'Эксклюзивные цветовые решения',
    bgImage: pantoneBg,
    icon: <FaRobot className="collection-icon" />
  },
  { 
    id: 3, 
    name: 'BADFIVE', 
    description: 'Уличный баскетбол',
    bgImage: badfiveBg,
    icon: <FaSpaceShuttle className="collection-icon" />
  },
  { 
    id: 4, 
    name: 'WADE & RUSSEL', 
    description: 'Коллаборация с легендами NBA',
    bgImage: wadeRussellBg,
    icon: <FaTrophy className="collection-icon" /> 
  },
  { 
    id: 5, 
    name: 'SKATING', 
    description: 'Для экстремального скейтбординга',
    bgImage: skatingBg,
    icon: <FaSkating className="collection-icon" /> 
  }
];

const categories = [
  { 
    id: 1, 
    name: "Бег", 
    icon: <FaRunning className="category-icon" />,
    image: runningBg
  },
  { 
    id: 2, 
    name: "Баскетбол", 
    icon: <FaBasketballBall className="category-icon" />,
    image: basketballBg
  },
  { 
    id: 3, 
    name: "Йога", 
    icon: <FaYinYang className="category-icon" />,
    image: yogaBg
  },
  { 
    id: 4, 
    name: "Теннис", 
    icon: <FaStreetView className="category-icon" />,
    image: tenniswearBg
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % collections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Функция для преобразования названия категории в URL-формат
  const getCategoryUrl = (categoryName) => {
    const mapping = {
      'Теннис': 'tennis'
    };
    return mapping[categoryName] || categoryName.toLowerCase();
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* Слайдер коллекций */}
        <section className="collections-slider">
          {collections.map((collection, index) => (
            <div 
              key={collection.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.7)), url(${collection.bgImage})` 
              }}
            >
              <div className="slide-content">
                <div className="collection-icon-wrapper">
                  {collection.icon}
                </div>
                <h2 className="collection-name">{collection.name}</h2>
                <p className="collection-desc">{collection.description}</p>
                <Link to="/products">
                  <NeonButton text="Смотреть коллекции" />
                </Link>
              </div>
            </div>
          ))}
          
          <div className="slider-dots">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Сетка категорий */}
        <section className="categories-section">
          <h2 className="section-title cyber-font">КАТЕГОРИИ</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                to={`/products?category=${getCategoryUrl(category.name)}`}
                key={category.id}
                className="category-link"
              >
                <div className="category-card">
                  <div 
                    className="category-image"
                    style={{ backgroundImage: `url(${category.image})` }}
                    aria-label={category.name}
                  >
                    <div className="category-icon-wrapper">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="category-name cyber-font">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}