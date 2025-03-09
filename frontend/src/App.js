import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
          <div className="app-container">
            <Routes>
              <Route path="/" element={<CarCostCalculator />} />
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

