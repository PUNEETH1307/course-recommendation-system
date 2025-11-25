// const natural = require('natural');

// function preprocessText(text) {
//   if (!text) return '';
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9\s]/g, ' ')
//     .replace(/\s+/g, ' ')
//     .trim();
// }
const natural = require('natural');
const stemmer = natural.PorterStemmer;

function preprocessText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map(word => stemmer.stem(word))
    .join(' ');
}


function createFeatureText(course) {
  const parts = [
    course.title,
    course.description,
    course.category,
    course.tags.join(' ')
  ];
  return preprocessText(parts.join(' '));
}

function cosineSimilarity(vec1, vec2) {
  const keys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  keys.forEach(key => {
    const val1 = vec1[key] || 0;
    const val2 = vec2[key] || 0;
    dotProduct += val1 * val2;
    mag1 += val1 * val1;
    mag2 += val2 * val2;
  });

  mag1 = Math.sqrt(mag1);
  mag2 = Math.sqrt(mag2);

  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (mag1 * mag2);
}

function getTfidfVector(text, tfidf, docIndex) {
  const vector = {};
  tfidf.listTerms(docIndex).forEach(item => {
    vector[item.term] = item.tfidf;
  });
  return vector;
}

exports.calculateSimilarity = (course1, course2) => {
  const text1 = createFeatureText(course1);
  const text2 = createFeatureText(course2);

  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  tfidf.addDocument(text1);
  tfidf.addDocument(text2);

  const vec1 = getTfidfVector(text1, tfidf, 0);
  const vec2 = getTfidfVector(text2, tfidf, 1);

  return cosineSimilarity(vec1, vec2);
};

exports.semanticSearch = (query, courses, limit = 10) => {
  if (!query || !courses || courses.length === 0) return [];

  const queryText = preprocessText(query);
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();

  tfidf.addDocument(queryText);

  const courseTexts = courses.map(course => createFeatureText(course));
  courseTexts.forEach(text => tfidf.addDocument(text));

  const queryVector = getTfidfVector(queryText, tfidf, 0);

  const results = courses.map((course, index) => {
    const courseVector = getTfidfVector(courseTexts[index], tfidf, index + 1);
    const similarity = cosineSimilarity(queryVector, courseVector);

    return {
      ...course.toObject(),
      similarity: Math.round(similarity * 100)
    };
  });

  return results
    .filter(result => result.similarity > 10)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
};
