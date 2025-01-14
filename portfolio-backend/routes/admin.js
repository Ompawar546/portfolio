const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const PortfolioData = require('../models/PortfolioData');
const Feedback = require('../models/Feedback');
const adminAuth = require('../middleware/adminAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Portfolio Data
// Update your portfolio GET route
router.get('/portfolio', adminAuth, async (req, res) => {
  try {
    const portfolioData = await PortfolioData.findOne();
    res.json(portfolioData || {
      name: '',
      title: '',
      about: '',
      skills: [],
      projects: []
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});
// Update Portfolio Data
router.put('/portfolio', adminAuth, async (req, res) => {
  try {
    let portfolioData = await PortfolioData.findOne();
    
    if (portfolioData) {
      portfolioData = await PortfolioData.findOneAndUpdate(
        {},
        req.body,
        { new: true }
      );
    } else {
      portfolioData = new PortfolioData(req.body);
      await portfolioData.save();
    }

    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating portfolio data' });
  }
});

// Get Feedbacks
router.get('/feedback', adminAuth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback data' });
  }
});

module.exports = router;