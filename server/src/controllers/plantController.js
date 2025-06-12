const Plant = require('../models/Plant');

const getPlants = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }

    const plants = await Plant.find(query);
    res.json(plants);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Kunde inte hämta växter', details: err.message });
  }
};

module.exports = { getPlants };
