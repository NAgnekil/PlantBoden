const express = require('express');
const { getArticles } = require('../controllers/articleController');

const router = express.Router();

router.get('/', getArticles);

module.exports = router;
