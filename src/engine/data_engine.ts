import { Project } from "../types";

export const projectsRegistry: Project[] = [
  { ticker: "RENEW-SOLAR", name: "GreenPower Solar Farm", expectedReturn: 0.08, volatility: 0.12, sroiScore: 0.85, category: "Clean Energy", description: "Utiltiy-scale solar arrays providing clean energy to 50,000 households." },
  { ticker: "WATER-GRID", name: "Banda Water Purification", expectedReturn: 0.06, volatility: 0.08, sroiScore: 0.92, category: "Infrastructure", description: "Providing safe drinking water to rural communities using gravity-fed filtration." },
  { ticker: "EDU-MOBILE", name: "EduConnect Mobile Schools", expectedReturn: 0.04, volatility: 0.05, sroiScore: 0.95, category: "Education", description: "Solar-powered buses equipped with satellite internet for remote education." },
  { ticker: "HEALTH-AI", name: "Afrimedi Diagnostics", expectedReturn: 0.12, volatility: 0.18, sroiScore: 0.88, category: "Healthcare", description: "AI-driven diagnostic tools for early detection of treatable diseases in low-resource settings." },
  { ticker: "AGRI-SEC", name: "SmartIrrigate Farms", expectedReturn: 0.09, volatility: 0.14, sroiScore: 0.82, category: "Agriculture", description: "IoT-based irrigation systems helping farmers increase yield while saving 40% water." },
  { ticker: "RECYCLE-UP", name: "OceanBound Plastic Tech", expectedReturn: 0.07, volatility: 0.11, sroiScore: 0.90, category: "Environment", description: "Upcycling community plastic waste into durable construction materials." },
  { ticker: "MICRO-LEND", name: "FinReach Microfinance", expectedReturn: 0.05, volatility: 0.06, sroiScore: 0.94, category: "Financial Inclusion", description: "Providing zero-interest micro-loans to female-led small businesses." },
  { ticker: "HOUSING-FIX", name: "AffordHome PreFab", expectedReturn: 0.08, volatility: 0.10, sroiScore: 0.86, category: "Housing", description: "Modular, eco-friendly housing units that can be assembled in 48 hours." },
  { ticker: "TELE-DOC", name: "RemoteCare Clinics", expectedReturn: 0.10, volatility: 0.15, sroiScore: 0.89, category: "Healthcare", description: "Telemedicine booths connected to top-tier specialists for rural patients." },
  { ticker: "WASTE-TO-WATT", name: "BioPower Energy", expectedReturn: 0.11, volatility: 0.16, sroiScore: 0.84, category: "Clean Energy", description: "Converting agricultural waste into clean biogas for cooking and heating." },
  { ticker: "FOREST-BOND", name: "Amazon Reforest VCG", expectedReturn: 0.03, volatility: 0.04, sroiScore: 0.98, category: "Environment", description: "Verified carbon credit projects protecting 10,000 hectares of rainforest." },
  { ticker: "CLEAN-TRANSIT", name: "CityLink Electric Buses", expectedReturn: 0.07, volatility: 0.09, sroiScore: 0.91, category: "Infrastructure", description: "Zero-emission public transport for rapidly growing urban centers." },
  { ticker: "SME-BOOST", name: "VentureCap SME Fund", expectedReturn: 0.13, volatility: 0.22, sroiScore: 0.78, category: "Economic Growth", description: "Equity investments in high-growth technology startups in emerging markets." },
  { ticker: "OFFSHORE-WIND", name: "DeepBlue Wind Arrays", expectedReturn: 0.09, volatility: 0.13, sroiScore: 0.87, category: "Clean Energy", description: "Harnessing deep-sea winds for sustainable power generation." },
  { ticker: "PICO-GRID", name: "VillageNano Utility", expectedReturn: 0.05, volatility: 0.07, sroiScore: 0.93, category: "Infrastructure", description: "Decentralized nano-grids for homes that have never had electricity access." }
];

export const getProjectDashboardData = () => {
  return projectsRegistry;
};
