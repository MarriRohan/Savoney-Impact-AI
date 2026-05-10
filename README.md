# Savoney Impact

**Savoney Impact** is a high-frequency, AI-driven resource allocation platform designed to bridge the gap between financial returns and measurable Social Return on Investment (SROI). 

Built for quant researchers and impact investors, it uses multi-objective optimization to build portfolios that satisfy both market performance and ethical missions.

---

## 🛠 Tech Stack

The application is built using a modern, full-stack TypeScript architecture:

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Modern utility-first CSS)
- **Animation**: [Motion](https://motion.dev/) (High-performance UI transitions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) (Strategic allocation and impact visualization)

### Backend & AI
- **Server**: [Express](https://expressjs.com/) (Serving API routes and optimizing logic)
- **Engine**: Custom TypeScript **Optimization Engine** implementing Markowitz Mean-Variance principles with SROI utility functions.
- **Data**: **Data Engine** with a dynamic "Impact Registry" of global sustainability projects.

### Infrastructure
- **Auth & Database**: [Firebase](https://firebase.google.com/) (Google Authentication & Cloud Firestore for portfolio persistence).
- **Environment**: Cloud-ready containerization.

---

## 📖 How to Use

Savoney Impact operates like a "Financial Terminal" for social good. Follow these steps to generate your first strategic portfolio:

### 1. Authenticate
Sign in using your **Google Account**. This allows the platform to securely save your portfolio configurations to your private dashboard.

### 2. Configure Your Parameters
Use the **Left Control Sidebar** to set your investment constraints:
- **Investment Capital**: Enter the total amount (USD) you wish to allocate across the registry.
- **Purpose Weight (α)**: Use the slider to define your priority. 
    - *0% Alpha*: Pure financial return focus.
    - *100% Impact*: Maximizes Social Return (SROI).
- **Risk Tolerance (λ)**: Select between **Conservative**, **Moderate**, or **Aggressive** to adjust the risk-aversion coefficient in the optimization matrix.

### 3. Run the Engine
Click **"Run Optimizer"**. The AI engine will solve the multi-objective problem:
`Utility = Returns + (Alpha * Impact) - (Risk * Volatility)`

### 4. Analyze the Dashboard
Review the generated results:
- **Metrics Card**: See your Expected Return vs. Portfolio Volatility.
- **Strategic Allocation**: A breakdown of exactly how much to invest in each project (e.g., Clean Energy, Healthcare).
- **Social Return Engine**: Real-world projections of "Lives Impacted" and "CO₂ Tons Offset".

### 5. Persistent Storage
If you are satisfied with the allocation, click **"Save Portfolio"**. The configuration is pushed to your encrypted Firestore database for future retrieval.

### 6. Explore the Impact Registry
Switch to the **"Impact Registry"** tab to search and filter through the 15+ global projects currently being tracked by the Savoney Data Engine.

---

## 🔬 Mathematical Foundation
The core utility function is calculated as:
`U = (Wᵀ * R) + (α * Wᵀ * S) - (λ * Wᵀ * Σ * W)`

Where weights (**W**) are optimized using a softmax distribution across the adjusted returns to ensure a diversified "Efficient Frontier" of impact.

---
Built with 💚 using Google AI Studio.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ff2b481a-8d5e-49a3-a024-f840e53faa42

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
