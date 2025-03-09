"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./EditProfile.css"

function EditProfile() {
  const { currentUser, updateUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
  })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Simple validation
    if (!formData.name || !formData.email) {
      setError("Please fill in all fields")
      return
    }

    // In a real app, you would send this data to a backend
    // For this demo, we'll simulate a successful update
    const success = updateUser({
      name: formData.name,
      email: formData.email,
    })

    if (success) {
      setSuccess("Profile updated successfully")
      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    } else {
      setError("Failed to update profile")
    }
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2>Edit Your Profile</h2>
        <p className="edit-profile-subtitle">Update your account information</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile

