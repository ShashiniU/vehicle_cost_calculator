"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { carData } from "../data/carData"
import "./CarListingPage.css"

function CarListingPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCars = carData.filter((car) =>
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCarSelect = (car) => {
    // Navigate to calculator with selected car ID
    navigate(`/calculator/${car.id}`)
  }

  return (
    <div className="car-listing-container">
      

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by make, model, or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="car-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card" onClick={() => handleCarSelect(car)}>
            <div className="car-image-container">
              <img
                src={car.imageUrl || "/placeholder.svg"}
                alt={`${car.year} ${car.make} ${car.model}`}
                onError={(e) => {
                      e.target.onerror = null
                  e.target.src = "../car-images/default-car.jpg"
                }}
                className="car-image"
              />
            </div>
            <div className="car-info">
              <h3>
                {car.year} {car.make} {car.model}
              </h3>
              <div className="car-specs">
                <span>{car.engine}</span>
                <span>•</span>
                <span>{car.fuelEconomy} MPG</span>
              </div>
              <div className="car-price">${car.msrp.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="no-results">
          <p>No vehicles found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export default CarListingPage

