const Article = require('../models/Article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getArticles };
