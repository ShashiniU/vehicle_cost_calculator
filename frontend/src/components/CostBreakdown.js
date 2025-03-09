import ProgressBar from "./ui/ProgressBar"
import "./CostBreakdown.css"

function CostBreakdown({ results }) {
  const { monthlyCosts } = results
  const totalMonthly = monthlyCosts.total

  // Calculate percentages for the progress bars
  const fuelPercentage = (monthlyCosts.fuel / totalMonthly) * 100
  const maintenancePercentage = (monthlyCosts.maintenance / totalMonthly) * 100
  const insurancePercentage = (monthlyCosts.insurance / totalMonthly) * 100
  const depreciationPercentage = (monthlyCosts.depreciation / totalMonthly) * 100
  const financingPercentage = (monthlyCosts.financing / totalMonthly) * 100

  return (
    <div className="cost-breakdown">
      <h2>Monthly Cost Breakdown</h2>

      <div className="breakdown-items">
        <div className="breakdown-item">
          <div className="item-header">
            <div className="item-label">
              <span className="color-indicator blue"></span>
              <span>Fuel</span>
            </div>
            <span className="item-value">${monthlyCosts.fuel.toFixed(2)}</span>
          </div>
          <ProgressBar value={fuelPercentage} color="blue" />
        </div>

        <div className="breakdown-item">
          <div className="item-header">
            <div className="item-label">
              <span className="color-indicator green"></span>
              <span>Maintenance</span>
            </div>
            <span className="item-value">${monthlyCosts.maintenance.toFixed(2)}</span>
          </div>
          <ProgressBar value={maintenancePercentage} color="green" />
        </div>

        <div className="breakdown-item">
          <div className="item-header">
            <div className="item-label">
              <span className="color-indicator purple"></span>
              <span>Insurance</span>
            </div>
            <span className="item-value">${monthlyCosts.insurance.toFixed(2)}</span>
          </div>
          <ProgressBar value={insurancePercentage} color="purple" />
        </div>

        <div className="breakdown-item">
          <div className="item-header">
            <div className="item-label">
              <span className="color-indicator orange"></span>
              <span>Depreciation</span>
            </div>
            <span className="item-value">${monthlyCosts.depreciation.toFixed(2)}</span>
          </div>
          <ProgressBar value={depreciationPercentage} color="orange" />
        </div>

        <div className="breakdown-item">
          <div className="item-header">
            <div className="item-label">
              <span className="color-indicator red"></span>
              <span>Financing</span>
            </div>
            <span className="item-value">${monthlyCosts.financing.toFixed(2)}</span>
          </div>
          <ProgressBar value={financingPercentage} color="red" />
        </div>
      </div>

      <div className="total-section">
        <span className="total-label">Total Monthly Cost</span>
        <span className="total-value">${totalMonthly.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default CostBreakdown

