const Plant = require('../models/Plant');

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    console.error('❌ Fel vid hämtning av växter:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPlants };
