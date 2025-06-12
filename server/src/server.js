const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const plantRoutes = require('./routes/plants');
const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/categories');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/plants', plantRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categoryDescriptions', categoryRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
