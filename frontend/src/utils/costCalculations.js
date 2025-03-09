/**
 * Calculate the costs of owning a car based on the car details and usage information
 * @param {Object} car - The car object with details
 * @param {Object} usageDetails - The usage details object
 * @returns {Object} The calculated cost results
 */
export function calculateCosts(car, usageDetails) {
  const { monthlyMileage, fuelPrice, yearsOfOwnership, financingDetails } = usageDetails
  const { fuelEconomy, maintenanceCost, insuranceEstimate, msrp, depreciationRate } = car

  // Calculate monthly fuel cost
  const gallonsPerMonth = monthlyMileage / fuelEconomy
  const fuelCost = gallonsPerMonth * fuelPrice

  // Calculate monthly maintenance cost
  const maintenanceCostPerMonth = maintenanceCost / 12

  // Calculate monthly insurance cost
  const insuranceCostPerMonth = insuranceEstimate / 12

  // Calculate monthly depreciation
  const totalDepreciation = msrp * (depreciationRate / 100) * yearsOfOwnership
  const depreciationPerMonth = totalDepreciation / (yearsOfOwnership * 12)

  // Calculate monthly financing cost
  const loanAmount = msrp - financingDetails.downPayment
  const monthlyInterestRate = financingDetails.interestRate / 100 / 12
  const monthlyPayment =
    loanAmount > 0
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, financingDetails.loanTerm)) /
        (Math.pow(1 + monthlyInterestRate, financingDetails.loanTerm) - 1)
      : 0

  // Calculate total monthly cost
  const monthlyCosts = {
    fuel: fuelCost,
    maintenance: maintenanceCostPerMonth,
    insurance: insuranceCostPerMonth,
    depreciation: depreciationPerMonth,
    financing: monthlyPayment,
    total: fuelCost + maintenanceCostPerMonth + insuranceCostPerMonth + depreciationPerMonth + monthlyPayment,
  }

  // Calculate total cost over ownership period
  const totalCost = monthlyCosts.total * 12 * yearsOfOwnership

  // Calculate cost per mile
  const totalMiles = monthlyMileage * 12 * yearsOfOwnership
  const costPerMile = totalCost / totalMiles

  return {
    monthlyCosts,
    totalCost,
    costPerMile,
  }
}

