const express = require('express');
const router = express.Router();
const {
  getSimilarCourses,
  getPersonalizedRecommendations,
  trackUserInteraction
} = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', getSimilarCourses);
router.get('/user/personalized', protect, getPersonalizedRecommendations);
router.post('/track', protect, trackUserInteraction);

module.exports = router;
