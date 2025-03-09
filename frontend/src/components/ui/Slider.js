"use client"

import { useState } from "react"
import "./Slider.css"

function Slider({ id, min, max, step, value, onChange }) {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e) => {
    const newValue = Number.parseFloat(e.target.value)
    setLocalValue(newValue)
    onChange(newValue)
  }

  const percentage = ((localValue - min) / (max - min)) * 100

  return (
    <div className="slider-container">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onChange={handleChange}
        className="slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
        }}
      />
    </div>
  )
}

export default Slider

