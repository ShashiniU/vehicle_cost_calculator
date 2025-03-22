"use client"

import { createContext, useState, useEffect, useCallback  } from "react"
import { authService, comparisonService } from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userComparisons, setUserComparisons] = useState([])

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("costuser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser(user)

      // If we have a user, fetch their comparisons
      if (user) {
        fetchUserComparisons()
      }
    }
    setLoading(false)
  }, [])

  const fetchUserComparisons = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("costuser"))
      if (!storedUser || !storedUser._id) {
        console.error("No stored user or userid found")
        return false
      }
      
      const comparisons = await comparisonService.getById(storedUser._id)
    
      // Format the comparisons to match the expected structure
      const formattedComparisons = comparisons.map((comp) => ({
        id: comp._id,
        date: comp.date,
        cars: comp.cars,
      }))
    
      // Update the state with the formatted comparisons
      setUserComparisons(formattedComparisons)
    
      // Store the comparisons in localStorage
      localStorage.setItem("comparisons", JSON.stringify(formattedComparisons))
    
      return true
    } catch (err) {
      console.error("Error fetching comparisons:", err)
      return false
    }
  }, []) 
  const login = async() => {
    // In a real app, you would validate credentials with a backend
    // For this demo, we'll just store the user data
    const userData = JSON.parse(localStorage.getItem("costuser"));  

    setCurrentUser(userData)
    localStorage.setItem("costuser", JSON.stringify(userData))
         const comparisons = await comparisonService.getById(userData.userid)

      // Format the comparisons to match the expected structure
      const formattedComparisons = comparisons.map((comp) => ({
        id: comp._id,
        date: comp.date,
        cars: comp.cars,
      }))

     

      setUserComparisons(formattedComparisons)
      localStorage.setItem("comparisons", JSON.stringify(formattedComparisons))
    return true
    
  }

  // const register = (userData) => {
  //   // In a real app, you would send this data to a backend
  //   // For this demo, we'll just store the user data
  //   const newUser = {
  //     ...userData,
  //     id: Date.now().toString(),
  //     comparisons: [],
  //   }
  // const login = async (userData) => {
  //   try {
  //     setError(null)
  //     const data = await authService.login(userData)

  //     // Get the user's comparisons
  //     const comparisons = await comparisonService.getAll()

  //     // Format the comparisons to match the expected structure
  //     const formattedComparisons = comparisons.map((comp) => ({
  //       id: comp._id,
  //       date: comp.date,
  //       cars: comp.cars,
  //     }))

  //     // Create the user object with comparisons
  //     const user = {
  //       ...data.user,
  //       comparisons: formattedComparisons,
  //     }

  //     setCurrentUser(user)
  //     localStorage.setItem("costuser", JSON.stringify(user))
  //     return true
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed")
  //     return false
  //   }
  // }

  const register = async (userData) => {
    try {
      setError(null)
      const data = await authService.register(userData)

      // Create the user object with empty comparisons
      const user = {
        ...data.user,
        comparisons: [],
      }

      setCurrentUser(user)
      localStorage.setItem("costuser", JSON.stringify(user))
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
      return false
    }
  }

  const logout = () => {
  
    authService.logout()
  setCurrentUser(null)
  setUserComparisons([]) // Clear comparisons from state
  localStorage.removeItem("costuser")
  localStorage.removeItem("comparisons")
  }

  const updateUser = async (userData) => {
    try {
      // In a real app, you would send this data to a backend
      const updatedUser = { ...currentUser, ...userData }
      setCurrentUser(updatedUser)
      localStorage.setItem("costuser", JSON.stringify(updatedUser))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const saveComparison = async (comparison) => {
    if (!currentUser) return false
  
    try {
      // Save comparison to backend
      const savedComparison = await comparisonService.create({
        userid: comparison.userid,
        cars: comparison.cars,
      })
  
      // Format the saved comparison to match the expected structure
      const formattedComparison = {
        id: savedComparison._id,
        date: savedComparison.date,
        cars: savedComparison.cars,
      }
  
      // Update userComparisons by adding the new comparison to the array
      const updatedComparisons = [...userComparisons, formattedComparison];
      setUserComparisons(updatedComparisons);
      
      // Save to localStorage
      localStorage.setItem("comparisons", JSON.stringify(updatedComparisons));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save comparison");
      return false;
    }
  };

  const deleteComparison = async (comparisonId) => {
    if (!currentUser) return false

    try {
      // Delete comparison from backend
      await comparisonService.delete(comparisonId)

      // Update the user's comparisons in state
      const updatedComparisons = currentUser.comparisons.filter((comp) => comp.id !== comparisonId)

      const updatedUser = {
        ...currentUser,
        comparisons: updatedComparisons,
      }

      setCurrentUser(updatedUser)
      localStorage.setItem("costuser", JSON.stringify(updatedUser))
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete comparison")
      return false
    }
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
    error,
    refreshComparisons: fetchUserComparisons,
    userComparisons,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

