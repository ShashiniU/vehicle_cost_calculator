"use client"

import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./UserDashboard.css"

function UserDashboard({ activeTab = "profile" }) {
  const { currentUser } = useContext(AuthContext)
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [comparedCars, setComparedCars] = useState([])

  // const handleDeleteComparison = (id) => {
  //   if (window.confirm("Are you sure you want to delete this comparison?")) {
  //     deleteComparison(id)
  //   }
  // }
  const removeFromComparison = (carId) => {
    setComparedCars(currentUser.comparisons.filter((item) => item.car.id !== carId))
    if (comparedCars.length <= 1) {
      // setActiveTab("calculator")
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser.name}</h1>
        <p>Manage your account and view your saved comparisons</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${currentTab === "profile" ? "active" : ""}`}
          onClick={() => setCurrentTab("profile")}
        >
          Profile
        </button>
        <button
          className={`dashboard-tab ${currentTab === "comparisons" ? "active" : ""}`}
          onClick={() => setCurrentTab("comparisons")}
        >
          My Comparisons
        </button>
      </div>

      <div className="dashboard-content">
        {currentTab === "profile" && (
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-info">
                <h2>Account Information</h2>
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{currentUser.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{currentUser.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Saved Comparisons:</span>
                  <span className="info-value">{currentUser.comparisons ? currentUser.comparisons.length : 0}</span>
                </div>
              </div>
              <div className="profile-actions">
                <Link to="/edit-profile" className="btn btn-primary">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        {currentTab === "comparisons" && (
          <div className="comparisons-section">
            <h2>Your Saved Comparisons</h2>

            {!currentUser.comparisons || currentUser.comparisons.length === 0 ? (
              <div className="empty-state">
                <p>You haven't saved any comparisons yet.</p>
                <Link to="/" className="btn btn-primary mt-4">
                  Create a Comparison
                </Link>
              </div>
            ) : (
              <div className="comparisons-list">
                
                {currentUser.comparisons.map((comparison) => (
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
                         {comparison.cars?.map(({ car, results }) => (
                           <tr key={car.id}>
                             <td>
                               <div className="car-name">
                                 {car.make} 
                                 {car.model}
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
                  // <div key={comparison.id} className="comparison-card">
                  //   <div className="comparison-header">
                  //     <h3>Comparison #{comparison.id.slice(-4)}</h3>
                  //     <span className="comparison-date">{new Date(comparison.date).toLocaleDateString()}</span>
                  //   </div>
                  //   <div className="comparison-cars">
                  //     {comparison.cars.map((item, index) => (
                  //       <div key={index} className="comparison-car-item">
                  //         <div className="car-name">
                  //           {item.car.year} {item.car.make} {item.car.model}
                  //         </div>
                  //         <div className="car-cost">Monthly: ${item.results.monthlyCosts.total.toFixed(2)}</div>
                  //       </div>
                  //     ))}
                  //   </div>
                  //   <div className="comparison-actions">
                  //     <button className="btn btn-danger" onClick={() => handleDeleteComparison(comparison.id)}>
                  //       Delete
                  //     </button>
                  //   </div>
                  // </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard

