const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cloudinary = require('cloudinary').v2;
const plantRoutes = require('./routes/plants');
const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/categories');
const uploadRoutes = require('./routes/upload');

dotenv.config();
cloudinary.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/plants', plantRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categoryDescriptions', categoryRoutes);
app.use('/api/upload', uploadRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
