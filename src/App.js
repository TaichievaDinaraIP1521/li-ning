import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Auth from './pages/Auth';
import Cart from './pages/Cart'; 
import AdminPanel from './pages/AdminPanel.js';
import './styles/main.css';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider> {/* Обертываем всё приложение в CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} /> {/* Добавляем маршрут для корзины */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;