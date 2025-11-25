const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: String,
  difficulty: String,
  duration: String,
  tags: [String],
  youtube_link: String,
  udemy_link: String,
  coursera_link: String,
  geeksforgeeks_link: String,
  trending_score: Number
}, { timestamps: true });

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
