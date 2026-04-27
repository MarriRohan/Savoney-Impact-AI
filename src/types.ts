export interface Project {
  ticker: string;
  name: string;
  expectedReturn: number;
  volatility: number;
  sroiScore: number;
  category: string;
  description?: string;
}

export interface Allocation {
  ticker: string;
  weight: number;
  amount: number;
}

export interface OptimizationParams {
  alpha: number; // Purpose Weight (0 to 1)
  riskAversion: number; // Lambda (0 to 1)
  budget: number;
}

export interface OptimizationResult {
  allocations: Allocation[];
  expectedReturn: number;
  totalSroi: number;
  portfolioVolatility: number;
  utility: number;
}

export interface Portfolio {
  id?: string;
  userId: string;
  name: string;
  budget: number;
  alpha: number;
  riskLevel: string;
  allocations: Allocation[];
  totalImpact: {
    co2Saved: number;
    livesImpacted: number;
  };
  createdAt: string;
  updatedAt: string;
}
