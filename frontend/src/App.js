import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CarListingPage from "./components/CarListingPage"
import CarCostCalculator from "./components/CarCostCalculator"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import UserDashboard from "./components/user/UserDashboard"
import EditProfile from "./components/user/EditProfile"
import Navbar from "./components/layout/Navbar"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
{/* hfh */}
          <div className="app-container">
          <div className="calculator-container">
      <div className="page-header">
        <h1>Car Ownership Cost Calculator</h1>
        <p>
          Make informed decisions by understanding the true cost of owning your next vehicle. Calculate maintenance,
          fuel, and total monthly expenses.
        </p>
      </div>
</div>
            <Routes>
              <Route path="/" element={<CarListingPage />} />
              <Route path="/calculator" element={<CarCostCalculator />} />
              <Route path="/calculator/:carId" element={<CarCostCalculator />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/comparisons"
                element={
                  <ProtectedRoute>
                    <UserDashboard activeTab="comparisons" />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

