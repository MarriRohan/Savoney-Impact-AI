import { useState } from "react";
import { OptimizationResult } from "../types";
import { TrendingUp, Leaf, BarChart3, PieChart as PieChartIcon, Zap, Save } from "lucide-react";
import { cn, formatCurrency, formatPercent } from "../lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { motion } from "motion/react";

import { db, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface DashboardPanelProps {
  result: OptimizationResult | null;
  isOptimizing: boolean;
  params: { alpha: number, riskLevel: string, budget: number } | null;
}

const COLORS = ["#00FF41", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#064e3b", "#065f46", "#047857", "#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5", "#ecfdf5"];

export default function DashboardPanel({ result, isOptimizing, params }: DashboardPanelProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSavePortfolio = async () => {
    if (!result || !auth.currentUser || !params) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, "portfolios"), {
        userId: auth.currentUser.uid,
        name: `Portfolio ${new Date().toLocaleDateString()}`,
        budget: params.budget,
        alpha: params.alpha,
        riskLevel: params.riskLevel,
        allocations: result.allocations,
        totalImpact: {
          livesImpacted: Math.round(result.totalSroi * 1450),
          co2Saved: Math.round(result.totalSroi * 210)
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving portfolio", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!result && !isOptimizing) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
          <Zap size={40} className="text-gray-700" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Optimization Engine Ready</h3>
          <p className="text-gray-500 max-w-sm">
            Set your investment parameters in the side panel and trigger the resource allocation engine.
          </p>
        </div>
      </div>
    );
  }

  if (isOptimizing) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-24 h-24 bg-[#00FF41]/10 rounded-full flex items-center justify-center border border-[#00FF41]/20"
        >
          <Zap size={40} className="text-[#00FF41]" />
        </motion.div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold animate-pulse text-[#00FF41]">Solving Multi-Objective Matrix...</h3>
          <p className="text-gray-500 font-mono text-sm tracking-tighter">
            Calculating Efficient Frontier | Minimizing λW^TΣW
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const chartData = result.allocations.slice(0, 8).map(a => ({
    name: a.ticker,
    value: a.amount,
  }));

  const impactMetrics = [
    { label: "Expected Annual Return", value: formatPercent(result.expectedReturn), icon: TrendingUp, color: "text-[#00FF41]" },
    { label: "Aggregate SROI Score", value: (result.totalSroi * 10).toFixed(1), icon: Leaf, color: "text-emerald-400" },
    { label: "Portfolio Volatility", value: formatPercent(result.portfolioVolatility), icon: BarChart3, color: "text-gray-400" },
    { label: "Total Utility (U)", value: result.utility.toFixed(3), icon: Zap, color: "text-yellow-400" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={m.label} 
            className="bg-[#0d0d0f] border border-white/5 p-6 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <m.icon className={cn("w-5 h-5", m.color)} />
              <div className="w-1.5 h-1.5 rounded-full bg-white/5 animate-pulse" />
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{m.label}</p>
            <p className="text-3xl font-bold tracking-tight mt-1">{m.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Allocation Pie Chart */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-7 bg-[#0d0d0f] border border-white/5 p-8 rounded-3xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <PieChartIcon size={20} className="text-[#00FF41]" />
              Strategic Allocation
            </h4>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs font-mono transition-colors">Export CSV</button>
              <button 
                onClick={handleSavePortfolio}
                disabled={isSaving || saveSuccess}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1",
                  saveSuccess ? "bg-emerald-500 text-black" : "bg-[#00FF41]/10 text-[#00FF41] hover:bg-[#00FF41]/20"
                )}
              >
                {saveSuccess ? (
                  <>Success</>
                ) : (
                  <>
                    <Save size={12} />
                    {isSaving ? "Saving..." : "Save Portfolio"}
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={result.allocations.filter(a => a.weight > 0.01)}
                  innerRadius={110}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="weight"
                >
                  {result.allocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0a0a0c", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}
                  itemStyle={{ color: "#fff" }}
                  formatter={(value: number) => formatPercent(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Assets List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-5 bg-[#0d0d0f] border border-white/5 p-8 rounded-3xl overflow-hidden flex flex-col"
        >
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-emerald-500" />
            Impact Concentration
          </h4>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {result.allocations.slice(0, 10).map((a, i) => (
              <div key={a.ticker} className="flex items-center gap-4 group">
                <div className="w-8 text-xs font-mono text-gray-700">0{i+1}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-bold tracking-tight">{a.ticker}</span>
                    <span className="font-mono text-[#00FF41]">{formatCurrency(a.amount)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${a.weight * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-[#00FF41]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Projected Impact */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#00FF41]/5 border border-[#00FF41]/10 p-8 rounded-3xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold flex items-center gap-3">
              <Leaf className="text-[#00FF41]" />
              Social Return Engine (SROI)
            </h4>
            <p className="text-gray-400 max-w-xl">
              Based on your specific allocation, we project the following secondary impacts over a 12-month trailing horizon.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Lives Impacted</p>
              <p className="text-4xl font-mono font-bold text-white tracking-tighter">
                ~{(result.totalSroi * 1450).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">CO₂ Offset (Tons)</p>
              <p className="text-4xl font-mono font-bold text-white tracking-tighter">
                ~{(result.totalSroi * 210).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
