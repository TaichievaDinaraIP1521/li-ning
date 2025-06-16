// src/components/ProductCard.js
import React from 'react';
import NeonButton from './NeonButton';
import '../styles/product-card.css';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      toast.warn('Товар уже в корзине');
      return;
    }

    addToCart({ ...product });
    toast.success(`${product.name} добавлен в корзину`);
  };

  return (
    <div className="product-card">
      <img
        src={product.image || 'https://via.placeholder.com/200'} 
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>{product.price} ₽</p>

      <NeonButton
        text={isInCart ? 'В корзине' : 'В корзину'}
        onClick={handleAddToCart}
        disabled={isInCart}
        fullWidth
        glowColor={isInCart ? '#4caf50' : '#ff073a'}
      />
    </div>
  );
};

export default ProductCard;