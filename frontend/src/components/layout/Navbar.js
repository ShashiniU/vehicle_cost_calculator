"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Navbar.css"

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Car Cost Calculator
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          {currentUser ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/comparisons" className="navbar-link" onClick={() => setMenuOpen(false)}>
                  My Comparisons
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-button" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

