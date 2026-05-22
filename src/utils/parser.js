/**
 * Centralized utility to safely map, validate, and parse the FastAPI model response.
 * Prevents tight coupling and UI breakdowns due to unexpected payload mutations.
 */
export const parsePredictionResponse = (rawResponse) => {
  if (!rawResponse) {
    throw new Error('Empty response received from backend.');
  }

  // Parse risk score
  let score = 0;
  if (typeof rawResponse.risk_score === 'number') {
    score = Math.min(100, Math.max(0, rawResponse.risk_score));
  } else if (typeof rawResponse.risk_score === 'string') {
    const parsed = parseInt(rawResponse.risk_score, 10);
    if (!isNaN(parsed)) {
      score = Math.min(100, Math.max(0, parsed));
    }
  }

  // Parse risk level
  let level = 'Unknown';
  if (rawResponse.risk_level) {
    level = rawResponse.risk_level;
  } else {
    // Fallback classification logic if level is missing
    if (score <= 30) level = 'Low Risk';
    else if (score <= 60) level = 'Moderate Risk';
    else level = 'High Risk';
  }

  // Clean factors arrays
  const riskFactors = Array.isArray(rawResponse.risk_factors)
    ? rawResponse.risk_factors.filter(f => typeof f === 'string')
    : [];

  const positiveFactors = Array.isArray(rawResponse.positive_factors)
    ? rawResponse.positive_factors.filter(f => typeof f === 'string')
    : [];

  return {
    riskScore: score,
    riskLevel: level,
    riskFactors,
    positiveFactors,
    timestamp: new Date().toISOString()
  };
};

/**
 * Normalizes input form values to matches backend expectation.
 * Formats data types correctly (strings, integers, floats).
 */
export const formatPayload = (values) => {
  return {
    Age: parseInt(values.Age, 10) || 0,
    Family_Size: parseInt(values.Family_Size, 10) || 0,
    City_Tier: parseInt(values.City_Tier, 10) || 1,
    Employment_Type: String(values.Employment_Type || 'Salaried'),
    Monthly_Income_INR: parseFloat(values.Monthly_Income_INR) || 0,
    Monthly_Spending_INR: parseFloat(values.Monthly_Spending_INR) || 0,
    Savings_Balance_INR: parseFloat(values.Savings_Balance_INR) || 0,
    Outstanding_Loan_Value_INR: parseFloat(values.Outstanding_Loan_Value_INR) || 0,
    Transaction_Frequency: parseInt(values.Transaction_Frequency, 10) || 0,
    Missed_Payments: parseInt(values.Missed_Payments, 10) || 0,
    Investment_Score: parseInt(values.Investment_Score, 10) || 0,
    Emergency_Fund_Months: parseInt(values.Emergency_Fund_Months, 10) || 0
  };
};
