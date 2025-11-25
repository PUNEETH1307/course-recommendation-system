const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  getTrendingCourses,
  searchCourses
} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.get('/trending', getTrendingCourses);
router.get('/search', searchCourses);
router.get('/:id', getCourseById);

module.exports = router;
