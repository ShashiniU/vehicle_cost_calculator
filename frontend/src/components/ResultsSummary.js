"use client"
import Card from "./ui/Card"
import Button from "./ui/Button"
import "./ResultsSummary.css"

function ResultsSummary({ car, results, onAddToComparison }) {
  const { monthlyCosts, totalCost, costPerMile } = results

  return (
    <Card>
      <div className="results-summary">
        <div className="summary-header">
          <h2>
            Cost Summary: {car.year} {car.make} {car.model}
          </h2>
          <Button onClick={onAddToComparison} variant="outline">
            Add to Comparison
          </Button>
        </div>

        <div className="summary-cards">
          <div className="summary-card blue">
            <h3>Monthly Costs</h3>
            <div className="card-value">${monthlyCosts.total.toFixed(2)}</div>
            <div className="card-details">
              Fuel: ${monthlyCosts.fuel.toFixed(2)} | Maintenance: ${monthlyCosts.maintenance.toFixed(2)}
            </div>
          </div>

          <div className="summary-card green">
            <h3>5-Year Total Cost</h3>
            <div className="card-value">${totalCost.toFixed(2)}</div>
            <div className="card-details">Based on your usage and financing details</div>
          </div>

          <div className="summary-card purple">
            <h3>Cost Per Mile</h3>
            <div className="card-value">${costPerMile.toFixed(2)}</div>
            <div className="card-details">Helps compare efficiency across vehicles</div>
          </div>
        </div>

        <div className="insights-section">
          <h3>Key Insights</h3>
          <ul className="insights-list">
            <li>
              • Fuel costs make up {((monthlyCosts.fuel / monthlyCosts.total) * 100).toFixed(1)}% of your monthly
              expenses
            </li>
            <li>
              • Maintenance costs make up {((monthlyCosts.maintenance / monthlyCosts.total) * 100).toFixed(1)}% of your
              monthly expenses
            </li>
            <li>• Over 5 years, you'll spend approximately ${(monthlyCosts.fuel * 12 * 5).toFixed(2)} on fuel</li>
            <li>
              • Over 5 years, you'll spend approximately ${(monthlyCosts.maintenance * 12 * 5).toFixed(2)} on
              maintenance
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

export default ResultsSummary

