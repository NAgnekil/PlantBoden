// server/routes/books.js
import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

const PlantSchema = new mongoose.Schema({
  name: String,
  category: String,
  height: String,
})

const Plant = mongoose.model('Plant', PlantSchema)

// GET alla böcker
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find()
    res.json(plants)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST en ny bok
router.post('/', async (req, res) => {
  try {
    const newPlant = new Plant(req.body)
    const savedPlant = await newPlant.save()
    res.status(201).json(savedPlant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
