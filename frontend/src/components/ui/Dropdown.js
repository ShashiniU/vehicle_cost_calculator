"use client"

import { useState, useRef, useEffect } from "react"
import "./Dropdown.css"

function Dropdown({ placeholder, value, options, onSelect, onSearch, getOptionLabel, getOptionValue }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const handleSelect = (option) => {
    onSelect(option)
    setIsOpen(false)
    setSearchValue("")
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={handleToggle}>
        {value || placeholder}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="dropdown-options">
            {options.length === 0 ? (
              <div className="dropdown-empty">No options found</div>
            ) : (
              options.map((option) => (
                <div key={getOptionValue(option)} className="dropdown-option" onClick={() => handleSelect(option)}>
                  {getOptionLabel(option)}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown

