import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { allProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Products.css';
import '../styles/product-card.css';

const Products = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    setActiveCategory(category || null);
    setActiveSubcategory(null);
  }, [location]);

  // Нормализация названия категории
  const normalizeCategoryName = (name) => {
    if (!name) return null;
    return name.toLowerCase().trim();
  };

  const renderContent = () => {
    // Главная страница товаров (коллекции)
    if (!activeCategory) {
      return Object.entries(allProducts.collections).map(([name, items]) => (
        <section key={name} className="collection-section">
          <h2 className="collection-title">{name.toUpperCase()}</h2>
          <div className="products-grid">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ));
    }

    const normalizedCategory = normalizeCategoryName(activeCategory);
    const categoryData = allProducts.categories[normalizedCategory];

    // Если категория не найдена
    if (!categoryData) {
      return (
        <div className="not-found">
          <h2>Категория "{activeCategory}" не найдена</h2>
          <Link to="/products" className="back-link">
            Вернуться к каталогу
          </Link>
        </div>
      );
    }

    // Страница категории (подкатегории)
    if (!activeSubcategory) {
      return (
        <>
          <h1 className="page-title">{activeCategory.toUpperCase()}</h1>
          {Object.entries(categoryData).map(([name, items]) => (
            <div key={name} className="subcategory-section">
              <h2 
                className="subcategory-title"
                onClick={() => setActiveSubcategory(name)}
              >
                {name.toUpperCase()}
              </h2>
              <div className="products-grid">
                {items.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </>
      );
    }

    // Страница подкатегории (все товары)
    return (
      <>
        <button 
          onClick={() => setActiveSubcategory(null)}
          className="back-button neon-button"
        >
          ← Назад к {activeCategory}
        </button>
        <h2 className="page-title">{activeSubcategory.toUpperCase()}</h2>
        <div className="products-grid">
          {categoryData[activeSubcategory]?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <Header />
      <main className="products-page">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default Products;