const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Bir şehre göre otelleri getiren route
router.get('/:city', async (req, res) => {
  try {
    const hotels = await Hotel.find({ location: req.params.city });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, location, rooms } = req.body;
  try {
    const newHotel = new Hotel({ name, location, rooms });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
