import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Auth services
export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("costuser")
  },

  getCurrentUser: async () => {
    return await api.get("/auth/me")
  },
}

// Comparison services
export const comparisonService = {
  getAll: async () => {
    const response = await api.get("/comparisons")
    return response.data
  },

  getById: async (id) => {
    try{
      const response = await api.get(`/comparisons/${id}`)
      return response.data
    }catch{
      return []
    }
   
  },

  create: async (comparisonData) => {
    const response = await api.post("/comparisons", comparisonData)
    return response.data
  },

  update: async (id, comparisonData) => {
    const response = await api.put(`/comparisons/${id}`, comparisonData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/comparisons/${id}`)
    return response.data
  },
}

export default api

