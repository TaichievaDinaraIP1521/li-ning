// client/src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Тестовые пользователи
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    },
    {
      id: 2,
      name: 'User',
      email: 'user@example.com',
      password: 'user123',
      isAdmin: false
    }
  ]);

  // Загрузка пользователя из localStorage при старте
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.isAdmin || false);
      } catch (e) {
        console.error('Ошибка парсинга user из localStorage', e);
      }
    }
  }, []);

  // Сохранение корзины в localStorage
  useEffect(() => {
    localStorage.setItem('tempCart', JSON.stringify(cart));
  }, [cart]);

  // Вход пользователя
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(
          u => u.email.trim() === email.trim() && u.password.trim() === password.trim()
        );

        if (foundUser) {
          setUser(foundUser);
          setIsAdmin(foundUser.isAdmin);
          localStorage.setItem('user', JSON.stringify(foundUser));
          toast.success('Вы вошли!');
          resolve(foundUser);
        } else {
          toast.error('Неверный email или пароль');
          reject(new Error('Неверный email или пароль'));
        }
      }, 500);
    });
  };

  // Регистрация
  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some(u => u.email.trim() === email.trim())) {
          toast.warn('Пользователь с таким email уже существует');
          reject(new Error('Пользователь с таким email уже существует'));
          return;
        }

        if (password.length < 6) {
          toast.warn('Пароль должен быть минимум 6 символов');
          reject(new Error('Пароль должен быть минимум 6 символов'));
          return;
        }

        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          isAdmin: false
        };

        setUsers(prev => [...prev, newUser]);
        setUser(newUser);
        setIsAdmin(false);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Регистрация успешна!');
        resolve(newUser);
      }, 500);
    });
  };

  // Выход
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    toast.info('Вы вышли из системы');
  };

  // Получить текущего пользователя
  const fetchCurrentUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.isAdmin || false);
        return parsedUser;
      } catch (e) {
        console.error('Ошибка парсинга пользователя', e);
        return null;
      }
    }
    return null;
  };

  // Добавление товара
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.name} добавлен в корзину`);
  };

  // Уменьшение количества
  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    toast.info('Один товар убран из корзины');
  };

  // Увеличение количества
  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Полное удаление товара
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
    toast.info('Товар полностью удален из корзины');
  };

  // Очистка корзины
  const clearCart = () => {
    setCart([]);
    toast.success('Корзина очищена');
  };

  // Подсчёт товаров
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Общая сумма
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Создание заказа
  const placeOrder = () => {
    if (!user || cart.length === 0) {
      toast.error('Невозможно оформить заказ: корзина пуста или пользователь не авторизован');
      return null;
    }

    const order = {
      id: Date.now().toString(),
      userId: user.id,
      items: [...cart],
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'pending'
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart();

    toast.success('Заказ оформлен!');
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        isAdmin,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        login,
        register,
        fetchCurrentUser,
        logout,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);