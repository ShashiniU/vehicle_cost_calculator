const express = require("express")
const router = express.Router()
const Comparison = require("../models/Comparison")

// Get all comparisons for a user
router.get("/", async (req, res) => {
  try {
    const comparisons = await Comparison.find({ userId: req.user.id })
    res.json(comparisons)
  } catch (error) {
    console.error("Error fetching comparisons:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a specific comparison by ID
router.get("/:id", async (req, res) => {
  try {
    const comparison = await Comparison.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!comparison) {
      return res.status(404).json({ message: "Comparison not found" })
    }

    res.json(comparison)
  } catch (error) {
    console.error("Error fetching comparison:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new comparison
router.post("/", async (req, res) => {
  try {
    const { name, cars } = req.body

    const newComparison = new Comparison({
      userId: req.user.id,
      name: name || "My Comparison",
      cars,
    })

    const savedComparison = await newComparison.save()
    res.status(201).json(savedComparison)
  } catch (error) {
    console.error("Error creating comparison:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a comparison
router.put("/:id", async (req, res) => {
  try {
    const { name, cars } = req.body

    const comparison = await Comparison.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!comparison) {
      return res.status(404).json({ message: "Comparison not found" })
    }

    comparison.name = name || comparison.name
    comparison.cars = cars || comparison.cars

    const updatedComparison = await comparison.save()
    res.json(updatedComparison)
  } catch (error) {
    console.error("Error updating comparison:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a comparison
router.delete("/:id", async (req, res) => {
  try {
    const comparison = await Comparison.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!comparison) {
      return res.status(404).json({ message: "Comparison not found" })
    }

    res.json({ message: "Comparison deleted successfully" })
  } catch (error) {
    console.error("Error deleting comparison:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

