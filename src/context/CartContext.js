import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Загрузка данных при инициализации
  useEffect(() => {
    const loadData = async () => {
      const savedCart = localStorage.getItem('cart');
      const savedUser = localStorage.getItem('user');
      const savedOrders = localStorage.getItem('orders');
      
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.isAdmin || false);
      }
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    };
    loadData();
  }, []);

  // Авторизация
  const login = (userData) => {
    const userWithId = { ...userData, id: uuidv4() };
    setUser(userWithId);
    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin || false);
    localStorage.setItem('user', JSON.stringify(userWithId));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  // Корзина
  const addToCart = (product) => {
    const newCartItems = [...cartItems, { ...product, cartId: uuidv4() }];
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const removeFromCart = (cartId) => {
    const newCartItems = cartItems.filter(item => item.cartId !== cartId);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  // Заказы
  const createOrder = () => {
    if (!isAuthenticated || cartItems.length === 0) return null;
    
    const newOrder = {
      id: uuidv4(),
      userId: user.id,
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toISOString(),
      status: 'pending'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setCartItems([]);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    localStorage.removeItem('cart');
    
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    if (!isAdmin) return false;
    
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isAuthenticated,
        user,
        login,
        logout,
        isAdmin,
        orders: isAuthenticated ? orders.filter(o => o.userId === user.id) : [],
        allOrders: isAdmin ? orders : [],
        createOrder,
        updateOrderStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);