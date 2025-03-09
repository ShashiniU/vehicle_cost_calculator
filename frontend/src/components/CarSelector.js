"use client"

import { useState } from "react"
import Dropdown from "./ui/Dropdown"
import "./CarSelector.css"

function CarSelector({ cars, onSelect, selectedCar }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCars = searchTerm
    ? cars.filter((car) => `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm.toLowerCase()))
    : cars

  const handleSelect = (car) => {
    onSelect(car)
  }

  return (
    <div className="car-selector">
      <h2>Select Your Vehicle</h2>

      <div className="selector-container">
        <Dropdown
          placeholder="Select a car..."
          value={selectedCar ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}` : ""}
          onSearch={setSearchTerm}
          onSelect={handleSelect}
          options={filteredCars}
          getOptionLabel={(car) => `${car.year} ${car.make} ${car.model}`}
          getOptionValue={(car) => car.id}
        />
      </div>

      {selectedCar && (
        <div className="car-details">
          <div className="detail-row">
            <div className="detail-label">Engine:</div>
            <div className="detail-value">{selectedCar.engine}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Transmission:</div>
            <div className="detail-value">{selectedCar.transmission}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Fuel Economy:</div>
            <div className="detail-value">{selectedCar.fuelEconomy} MPG</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">MSRP:</div>
            <div className="detail-value">${selectedCar.msrp.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarSelector

