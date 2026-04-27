import { Project, OptimizationParams, OptimizationResult, Allocation } from "../types";

/**
 * Optimizes the resource allocation based on the user's Purpose Weight (alpha).
 * Formula: U = (W^T * R) + (alpha * W^T * S) - (lambda * W^T * Sigma * W)
 * W: Weights
 * R: Returns
 * S: SROI Scores
 * alpha: Purpose Weight
 * lambda: Risk Aversion
 * Sigma: Covariance Matrix (simplified here as diagonal of squared volatilities for MVP)
 */
export function optimizeAllocation(
  projects: Project[],
  params: OptimizationParams
): OptimizationResult {
  const { alpha, riskAversion, budget } = params;
  const n = projects.length;

  // For this MVP, we'll use a "Softmax Weighting" approach to find a good allocation.
  // We can calculate an "Impact-Adjusted Return" for each asset:
  // Adjusted_R = R + (alpha * S)
  // We then penalize by risk (lambda * volatility^2)
  
  // Scoring assets:
  const scores = projects.map(p => {
    const adjReturn = p.expectedReturn + (alpha * p.sroiScore);
    const riskPen = riskAversion * Math.pow(p.volatility, 2);
    return adjReturn - riskPen;
  });

  // Convert scores to weights using softmax for smooth allocation
  // Temperature can be adjusted to make the distribution more or less aggressive
  const temperature = 0.05; 
  const expScores = scores.map(s => Math.exp(s / temperature));
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  const weights = expScores.map(s => s / sumExp);

  // Calculate results
  const allocations: Allocation[] = projects.map((p, i) => ({
    ticker: p.ticker,
    weight: weights[i],
    amount: weights[i] * budget
  }));

  const expectedReturn = projects.reduce((sum, p, i) => sum + weights[i] * p.expectedReturn, 0);
  const totalSroi = projects.reduce((sum, p, i) => sum + weights[i] * p.sroiScore, 0);
  
  // Simplified portfolio volatility (assuming 0 correlation for MVP)
  const portfolioVariance = projects.reduce((sum, p, i) => sum + Math.pow(weights[i] * p.volatility, 2), 0);
  const portfolioVolatility = Math.sqrt(portfolioVariance);

  const utility = (expectedReturn + alpha * totalSroi) - (riskAversion * portfolioVariance);

  return {
    allocations: allocations.sort((a, b) => b.weight - a.weight),
    expectedReturn,
    totalSroi,
    portfolioVolatility,
    utility
  };
}
