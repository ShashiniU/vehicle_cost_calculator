"use client"

import { useState } from "react"
import "./CarDetailsInput.css"

function CarDetailsInput({ onSubmit, initialData = null }) {
  const [carDetails, setCarDetails] = useState(
    initialData || {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      engine: "",
      transmission: "",
      fuelEconomy: 25,
      msrp: 25000,
      maintenanceCost: 5000,
      insuranceEstimate: 1200,
      depreciationRate: 10,
    },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    const numericFields = ["year", "fuelEconomy", "msrp", "maintenanceCost", "insuranceEstimate", "depreciationRate"]

    setCarDetails({
      ...carDetails,
      [name]: numericFields.includes(name) ? Number(value) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Generate a unique ID for the car
    const carWithId = {
      ...carDetails,
      id: Date.now().toString(),
    }

    onSubmit(carWithId)
  }

  return (
    <div className="car-details-input">
      <h2>Enter Car Details</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="make">Make</label>
            <input
              type="text"
              id="make"
              name="make"
              className="form-control"
              placeholder="e.g. Toyota"
              value={carDetails.make}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="form-control"
              placeholder="e.g. Camry"
              value={carDetails.model}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              className="form-control"
              min="1990"
              max={new Date().getFullYear() + 1}
              value={carDetails.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="engine">Engine</label>
            <input
              type="text"
              id="engine"
              name="engine"
              className="form-control"
              placeholder="e.g. 2.5L 4-Cylinder"
              value={carDetails.engine}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="transmission">Transmission</label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              className="form-control"
              placeholder="e.g. Automatic"
              value={carDetails.transmission}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fuelEconomy">Fuel Economy (MPG)</label>
            <input
              type="number"
              id="fuelEconomy"
              name="fuelEconomy"
              className="form-control"
              min="1"
              max="200"
              value={carDetails.fuelEconomy}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="msrp">MSRP ($)</label>
            <input
              type="number"
              id="msrp"
              name="msrp"
              className="form-control"
              min="1000"
              step="100"
              value={carDetails.msrp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maintenanceCost">Annual Maintenance ($)</label>
            <input
              type="number"
              id="maintenanceCost"
              name="maintenanceCost"
              className="form-control"
              min="0"
              step="100"
              value={carDetails.maintenanceCost}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="insuranceEstimate">Annual Insurance ($)</label>
            <input
              type="number"
              id="insuranceEstimate"
              name="insuranceEstimate"
              className="form-control"
              min="0"
              step="100"
              value={carDetails.insuranceEstimate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="depreciationRate">Depreciation Rate (%/year)</label>
            <input
              type="number"
              id="depreciationRate"
              name="depreciationRate"
              className="form-control"
              min="0"
              max="50"
              step="0.1"
              value={carDetails.depreciationRate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Calculate Costs
          </button>
        </div>
      </form>
    </div>
  )
}

export default CarDetailsInput

