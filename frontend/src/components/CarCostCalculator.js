"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CarDetailsInput from "./CarDetailsInput"
import UsageInputs from "./UsageInputs"
import CostBreakdown from "./CostBreakdown"
import ResultsSummary from "./ResultsSummary"
import Card from "./ui/Card"
import Tabs from "./ui/Tabs"
import { calculateCosts } from "../utils/costCalculations"
import { AuthContext } from "../context/AuthContext"
import "./CarCostCalculator.css"

function CarCostCalculator() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [usageDetails, setUsageDetails] = useState({
    monthlyMileage: 1000,
    fuelPrice: 3.5,
    yearsOfOwnership: 5,
    financingDetails: {
      downPayment: 0,
      loanTerm: 60,
      interestRate: 4.5,
    },
  })
  const [costResults, setCostResults] = useState(null)
  const [activeTab, setActiveTab] = useState("calculator")
  const [comparedCars, setComparedCars] = useState([])
  const { currentUser, saveComparison } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedCar) {
      const results = calculateCosts(selectedCar, usageDetails)
      setCostResults(results)
    } else {
      setCostResults(null)
    }
  }, [selectedCar, usageDetails])

  const handleCarSubmit = (car) => {
    setSelectedCar(car)
  }

  const handleUsageChange = (newUsage) => {
    setUsageDetails((prev) => ({ ...prev, ...newUsage }))
  }

  const addToComparison = () => {
    if (selectedCar && costResults) {
      // Check if car is already in comparison
      if (!comparedCars.some((item) => item.car.id === selectedCar.id)) {
        const updatedComparisons = [...comparedCars, { car: selectedCar, results: costResults }]
        setComparedCars(updatedComparisons)
        setActiveTab("comparison")
      }
    }
  }

  const removeFromComparison = (carId) => {
    setComparedCars(comparedCars.filter((item) => item.car.id !== carId))
    if (comparedCars.length <= 1) {
      setActiveTab("calculator")
    }
  }

  const handleSaveComparison = () => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      navigate("/login")
      return
    }

    if (comparedCars.length > 0) {
      const success = saveComparison(comparedCars)
      if (success) {
        alert("Comparison saved successfully!")
        // Optionally redirect to the comparisons page
        navigate("/comparisons")
      } else {
        alert("Failed to save comparison")
      }
    }
  }

  return (
    <div className="calculator-container">
      <div className="page-header">
        <h1>Car Ownership Cost Calculator</h1>
        <p>
          Make informed decisions by understanding the true cost of owning your next vehicle. Calculate maintenance,
          fuel, and total monthly expenses.
        </p>
      </div>

      <div className="content-card">
        <Tabs
          tabs={[
            { id: "calculator", label: "Calculator" },
            { id: "comparison", label: `Compare (${comparedCars.length})`, disabled: comparedCars.length === 0 },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "calculator" && (
          <div className="calculator-content">
            <div className="three-column-layout">
              <Card className="car-details-column">
                <CarDetailsInput onSubmit={handleCarSubmit} initialData={selectedCar} />
              </Card>

              <Card className="usage-details-column">
                <UsageInputs usageDetails={usageDetails} onChange={handleUsageChange} />
              </Card>

              <Card className="cost-breakdown-column">
                {costResults ? (
                  <CostBreakdown results={costResults} />
                ) : (
                  <div className="placeholder-message">
                    <p>Enter car details and usage information to see cost breakdown</p>
                  </div>
                )}
              </Card>
            </div>

            {selectedCar && costResults && (
              <ResultsSummary car={selectedCar} results={costResults} onAddToComparison={addToComparison} />
            )}
          </div>
        )}

        {activeTab === "comparison" && (
          <div className="comparison-content">
            {comparedCars.length > 0 && (
              <div className="comparison-container">
                <div className="comparison-header-actions">
                  <h2>Car Comparison</h2>
                  <button className="btn btn-primary" onClick={handleSaveComparison}>
                    Save Comparison
                  </button>
                </div>

                <div className="comparison-table-wrapper">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Car Model</th>
                        <th>Monthly Fuel</th>
                        <th>Monthly Maintenance</th>
                        <th>Monthly Total</th>
                        <th>5-Year Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparedCars.map(({ car, results }) => (
                        <tr key={car.id}>
                          <td>
                            <div className="car-name">
                              {car.make} {car.model}
                            </div>
                            <div className="car-year">{car.year}</div>
                          </td>
                          <td>${results.monthlyCosts.fuel.toFixed(2)}</td>
                          <td>${results.monthlyCosts.maintenance.toFixed(2)}</td>
                          <td className="total-cost">${results.monthlyCosts.total.toFixed(2)}</td>
                          <td className="total-cost">${results.totalCost.toFixed(2)}</td>
                          <td>
                            <button onClick={() => removeFromComparison(car.id)} className="remove-button">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {!currentUser && (
                  <div className="login-prompt">
                    <p>
                      Want to save this comparison?{" "}
                      <button onClick={() => navigate("/login")} className="text-button">
                        Log in
                      </button>{" "}
                      or{" "}
                      <button onClick={() => navigate("/register")} className="text-button">
                        create an account
                      </button>
                      .
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CarCostCalculator

