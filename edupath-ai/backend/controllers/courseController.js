const Course = require('../models/Course');
const { semanticSearch } = require('../utils/semanticSearch');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ trending_score: -1 });
    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching courses' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ id: parseInt(req.params.id) });
    if (!course) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
};

exports.getTrendingCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ trending_score: -1 }).limit(6);
    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
};

exports.searchCourses = async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;
    if (!query) return res.status(400).json({ success: false, message: 'Query required' });

    const allCourses = await Course.find();
    const results = semanticSearch(query, allCourses, parseInt(limit));

    res.status(200).json({ success: true, query, count: results.length, courses: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};
