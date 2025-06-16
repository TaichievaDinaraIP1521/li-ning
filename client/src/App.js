import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Страницы
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import Delivery from './pages/Delivery';
import Policy from './pages/Policy';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess'; 
import { useCart } from './context/CartContext';
import './styles/main.css';
import { CartProvider } from './context/CartContext';
import { PageTransition } from './components/PageTransition';

function App() {
  return (
    <Router basename="/">
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const { user, isAdmin } = useCart();

  // Защищённый маршрут
  const PrivateRoute = ({ children, requiredRole = null }) => {
    if (!user) {
      return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    if (requiredRole === 'admin' && !isAdmin) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <Routes location={location} key={location.pathname}>
      {/* Главная */}
      <Route path="/" element={
        <PageTransition>
          <Home />
        </PageTransition>
      } />

      {/* Защищённый маршрут для админки */}
      <Route path="/admin" element={
        <PrivateRoute requiredRole="admin">
          <PageTransition>
            <AdminPanel />
          </PageTransition>
        </PrivateRoute>
      } />

      {/* Авторизация */}
      <Route path="/auth" element={
        <PageTransition>
          <Auth />
        </PageTransition>
      } />

      {/* Продукты */}
      <Route path="/products" element={
        <PageTransition>
          <Products />
        </PageTransition>
      } />

      {/* О нас */}
      <Route path="/about" element={
        <PageTransition>
          <About />
        </PageTransition>
      } />

      {/* Корзина */}
      <Route path="/cart" element={
        <PageTransition>
          <Cart />
        </PageTransition>
      } />

      {/* Доставка */}
      <Route path="/delivery" element={
        <PageTransition>
          <Delivery />
        </PageTransition>
      } />

      {/* Политика */}
      <Route path="/policy" element={
        <PageTransition>
          <Policy />
        </PageTransition>
      } />

      {/* Профиль */}
      <Route path="/profile" element={
        <PageTransition>
          <Profile />
        </PageTransition>
      } />

      {/* Успешный заказ */}
      <Route path="/order-success" element={
        <PageTransition>
          <OrderSuccess />
        </PageTransition>
      } />

      {/* Редирект для несуществующих путей */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;