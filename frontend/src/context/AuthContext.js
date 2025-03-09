"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    // In a real app, you would validate credentials with a backend
    // For this demo, we'll just store the user data
    setCurrentUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  const register = (userData) => {
    // In a real app, you would send this data to a backend
    // For this demo, we'll just store the user data
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      comparisons: [],
    }
    setCurrentUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (userData) => {
    const updatedUser = { ...currentUser, ...userData }
    setCurrentUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  const saveComparison = (comparison) => {
    if (!currentUser) return false

    const updatedComparisons = [
      ...(currentUser.comparisons || []),
      {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        cars: comparison,
      },
    ]

    const updatedUser = {
      ...currentUser,
      comparisons: updatedComparisons,
    }

    setCurrentUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  const deleteComparison = (comparisonId) => {
    if (!currentUser || !currentUser.comparisons) return false

    const updatedComparisons = currentUser.comparisons.filter((comp) => comp.id !== comparisonId)

    const updatedUser = {
      ...currentUser,
      comparisons: updatedComparisons,
    }

    setCurrentUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    saveComparison,
    deleteComparison,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

