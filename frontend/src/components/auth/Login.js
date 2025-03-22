"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Auth.css"

function Login() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Simple validation
    if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error("Invalid credentials or server error");
        }

        else{const data = await response.json();

          // Save user data to localStorage
          localStorage.setItem("costuser", JSON.stringify(data.user));
  
          setMessage("Login successful!");
          handleLogin();}
    } catch (error) {
        setError(error.message || "Login failed!");
    }
};

  function handleLogin() {
    const userData = JSON.parse(localStorage.getItem("costuser"));  
    setUser(userData);  
    const success = login({
     
    })

    if (success) {
      navigate("/dashboard")
    } else {
      setError("Invalid credentials")
    }
}
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        <p className="auth-subtitle">Welcome back! Please enter your details.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

