"use client"
import "./Button.css"

function Button({ children, onClick, variant = "primary", size = "medium", className = "" }) {
  const buttonClass = `button ${variant} ${size} ${className}`

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

