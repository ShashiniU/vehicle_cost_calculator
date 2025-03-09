"use client"
import "./Tabs.css"

function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""} ${tab.disabled ? "disabled" : ""}`}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs

