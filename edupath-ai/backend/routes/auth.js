const express = require('express');
const router = express.Router();
const { googleAuth, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/google', googleAuth);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
