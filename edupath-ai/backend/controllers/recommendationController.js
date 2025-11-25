const Course = require('../models/Course');
const { calculateSimilarity } = require('../utils/semanticSearch');

exports.getSimilarCourses = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const targetCourse = await Course.findOne({ id: courseId });

    if (!targetCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const allCourses = await Course.find({ id: { $ne: courseId } });

    const similarities = allCourses.map(course => ({
      course,
      similarity: calculateSimilarity(targetCourse, course)
    }));

    const recommendations = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(item => ({
        ...item.course.toObject(),
        similarity: Math.round(item.similarity * 100)
      }));

    res.status(200).json({ success: true, count: recommendations.length, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error getting recommendations' });
  }
};

exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.viewedCourses.length) {
      const trending = await Course.find().sort({ trending_score: -1 }).limit(10);
      return res.status(200).json({ success: true, recommendations: trending });
    }

    const recentViewedIds = user.viewedCourses
      .sort((a, b) => b.viewedAt - a.viewedAt)
      .slice(0, 5)
      .map(item => item.courseId);

    const viewedCourses = await Course.find({ id: { $in: recentViewedIds } });
    const otherCourses = await Course.find({ id: { $nin: recentViewedIds } });

    const recommendations = otherCourses
      .slice(0, 10)
      .map(course => ({
        ...course.toObject(),
        similarity: Math.round(Math.random() * 100)
      }));

    res.status(200).json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
};

exports.trackUserInteraction = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);

    user.viewedCourses.push({
      courseId,
      viewedAt: new Date()
    });

    await user.save();
    res.status(200).json({ success: true, message: 'Tracked' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
};
