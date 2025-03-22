const mongoose = require("mongoose")

const CarSchema = new mongoose.Schema({
  id: String,
  make: String,
  model: String,
  year: Number,
  msrp: Number,
  engine: String,
  transmission: String,
  fuelEconomy: Number,
  maintenanceCost: Number,
  insuranceEstimate: Number,
  depreciationRate: Number,
})

const ResultsSchema = new mongoose.Schema({
  monthlyCosts: {
    fuel: Number,
    maintenance: Number,
    insurance: Number,
    depreciation: Number,
    financing: Number,
    total: Number,
  },
  totalCost: Number,
  costPerMile: Number,
})

const ComparisonItemSchema = new mongoose.Schema({
  car: CarSchema,
  results: ResultsSchema,
})

const ComparisonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   
    date: {
      type: Date,
      default: Date.now,
    },
    cars: [ComparisonItemSchema],
  },
  { timestamps: true },
)

module.exports = mongoose.model("Comparison", ComparisonSchema)

