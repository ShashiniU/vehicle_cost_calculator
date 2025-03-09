import "./ProgressBar.css"

function ProgressBar({ value, color = "blue" }) {
  return (
    <div className="progress-container">
      <div className={`progress-bar ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  )
}

export default ProgressBar

