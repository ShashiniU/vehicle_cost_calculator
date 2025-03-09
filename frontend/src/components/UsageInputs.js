"use client"
import Slider from "./ui/Slider"
import "./UsageInputs.css"

function UsageInputs({ usageDetails, onChange }) {
  const handleMonthlyMileageChange = (value) => {
    onChange({ monthlyMileage: value })
  }

  const handleFuelPriceChange = (e) => {
    const value = Number.parseFloat(e.target.value) || 0
    onChange({ fuelPrice: value })
  }

  const handleYearsOfOwnershipChange = (value) => {
    onChange({ yearsOfOwnership: value })
  }

  const handleDownPaymentChange = (e) => {
    const value = Number.parseFloat(e.target.value) || 0
    onChange({
      financingDetails: {
        ...usageDetails.financingDetails,
        downPayment: value,
      },
    })
  }

  const handleLoanTermChange = (value) => {
    onChange({
      financingDetails: {
        ...usageDetails.financingDetails,
        loanTerm: value,
      },
    })
  }

  const handleInterestRateChange = (value) => {
    onChange({
      financingDetails: {
        ...usageDetails.financingDetails,
        interestRate: value,
      },
    })
  }

  return (
    <div className="usage-inputs">
      <h2>Usage Details</h2>

      <div className="input-group">
        <div className="input-header">
          <label htmlFor="monthlyMileage">Monthly Mileage</label>
          <span className="input-value">{usageDetails.monthlyMileage} miles</span>
        </div>
        <Slider
          id="monthlyMileage"
          min={100}
          max={3000}
          step={50}
          value={usageDetails.monthlyMileage}
          onChange={handleMonthlyMileageChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="fuelPrice">Fuel Price ($/gallon)</label>
        <input
          id="fuelPrice"
          type="number"
          min={1}
          max={10}
          step={0.1}
          value={usageDetails.fuelPrice}
          onChange={handleFuelPriceChange}
          className="text-input"
        />
      </div>

      <div className="input-group">
        <div className="input-header">
          <label htmlFor="yearsOfOwnership">Years of Ownership</label>
          <span className="input-value">{usageDetails.yearsOfOwnership} years</span>
        </div>
        <Slider
          id="yearsOfOwnership"
          min={1}
          max={10}
          step={1}
          value={usageDetails.yearsOfOwnership}
          onChange={handleYearsOfOwnershipChange}
        />
      </div>

      <div className="financing-section">
        <h3>Financing Details</h3>

        <div className="input-group">
          <label htmlFor="downPayment">Down Payment ($)</label>
          <input
            id="downPayment"
            type="number"
            min={0}
            step={500}
            value={usageDetails.financingDetails.downPayment}
            onChange={handleDownPaymentChange}
            className="text-input"
          />
        </div>

        <div className="input-group">
          <div className="input-header">
            <label htmlFor="loanTerm">Loan Term (months)</label>
            <span className="input-value">{usageDetails.financingDetails.loanTerm} months</span>
          </div>
          <Slider
            id="loanTerm"
            min={12}
            max={84}
            step={12}
            value={usageDetails.financingDetails.loanTerm}
            onChange={handleLoanTermChange}
          />
        </div>

        <div className="input-group">
          <div className="input-header">
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <span className="input-value">{usageDetails.financingDetails.interestRate}%</span>
          </div>
          <Slider
            id="interestRate"
            min={0}
            max={15}
            step={0.25}
            value={usageDetails.financingDetails.interestRate}
            onChange={handleInterestRateChange}
          />
        </div>
      </div>
    </div>
  )
}

export default UsageInputs

