const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const User = new User({ email, password, name });
    await User.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Вход
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await User.findOne({ email });
    if (!User) throw new Error('User not found');
    
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    const token = jwt.sign(
      { UserId: User._id, isAdmin: User.isAdmin },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );
    
    res.json({ token, User: { id: User._id, name: User.name,email: User.email, isAdmin: User.isAdmin } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
// Получение данных текущего пользователя
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: 'Неавторизованный запрос' });

    const decoded = jwt.verify(token, 'your_jwt_secret');
    const User = await User.findById(decoded.UserId).select('-password');

    if (!User) return res.status(404).json({ error: 'Пользователь не найден' });

    res.json({
      User: {
        id: User._id,
        name: User.name,
        email: User.email, 
        isAdmin: User.isAdmin
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error.message);
    res.status(401).json({ error: 'Неверный или истёкший токен' });
  }
});

module.exports = router;