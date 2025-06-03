import React from 'react';
import NeonButton from './NeonButton';
import '../styles/product-card.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Можно добавить уведомление или анимацию
    alert(`${product.name} добавлен в корзину!`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.isNew && <span className="product-badge">NEW</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">{product.price.toLocaleString()} ₽</div>
        <NeonButton 
          text="В корзину" 
          className="add-to-cart" 
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductCard;