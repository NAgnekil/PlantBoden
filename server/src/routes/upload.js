// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Plant = require('../models/Plant');

const categoryMap = {
  Aster: 'Flowers',
  Celosia: 'Flowers',
  Dahlia: 'Flowers',
  Lejongap: 'Flowers',
  Luktärt: 'Flowers',
  Phlox: 'Flowers',
  Ranunkel: 'Flowers',
  Risp: 'Flowers',
  Solros: 'Flowers',
  Övrigt: 'Flowers',
  Kryddor: 'Vegetables',
  Grönsaker: 'Vegetables',
  Buketter: 'InspoImg',
  Inspirationsbilder: 'InspoImg'
};

// Dynamisk storage beroende på kategori
const getStorage = (category) => {
  const parentFolder = categoryMap[category] || 'Uncategorized';
  const fullPath = `${parentFolder}/${category}`;

  return new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: fullPath,
      public_id: file.originalname.split('.')[0],
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [
        { width: 800, quality: 'auto:good', crop: 'limit' },
        { fetch_format: 'webp' }
      ]
    })
  });
};

router.post('/image', (req, res) => {
  const upload = multer({ storage: getStorage(category) }).single('image');

  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: 'Fel vid uppladdning' });

    const category = req.body.category;
    const plantName = req.body.name;

    if (!category || !plantName) {
      return res.status(400).json({ error: 'Kategori och växtnamn krävs' });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Ingen bild bifogad' });
    }

    try {
      const plant = await Plant.findOne({
        name: new RegExp(`^${plantName}$`, 'i'),
        category
      });
      if (!plant)
        return res.status(404).json({ error: 'Växten hittades inte' });

      plant.additionalImages.push(req.file.path);
      await plant.save();

      res.json({
        message: 'Uppladdad och sparad!',
        imageUrl: req.file.path,
        plantId: plant._id
      });
    } catch (err) {
      console.error('Databasfel:', err);
      res.status(500).json({ error: 'Databasfel', details: err.message });
    }
  });
});

module.exports = router;
