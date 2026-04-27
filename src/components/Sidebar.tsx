import { useState } from "react";
import { Sliders, TrendingUp, Shield, Zap, Info } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  onOptimize: (params: { alpha: number, riskLevel: string, budget: number }) => void;
  isOptimizing: boolean;
}

export default function Sidebar({ onOptimize, isOptimizing }: SidebarProps) {
  const [alpha, setAlpha] = useState(50);
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [budget, setBudget] = useState(100000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOptimize({ alpha, riskLevel, budget });
  };

  return (
    <aside className="w-full md:w-80 bg-[#0d0d0f] border-r border-white/5 flex flex-col p-6 space-y-8 h-screen shrink-0 relative overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#00FF41]/10 rounded-lg">
          <Zap className="w-6 h-6 text-[#00FF41]" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Savoney Eng</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 flex-1">
        {/* Budget Input */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            Investment Capital
            <Info size={12} className="text-gray-700 hover:text-gray-400 cursor-help" />
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-mono">$</span>
            <input 
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white font-mono focus:border-[#00FF41]/50 outline-none transition-colors"
              placeholder="100,000"
            />
          </div>
        </div>

        {/* Purpose Slider (Alpha) */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Purpose Weight (α)</label>
            <span className="text-sm font-mono text-[#00FF41]">{alpha}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#00FF41]"
          />
          <div className="flex justify-between text-[10px] text-gray-600 font-medium uppercase tracking-tighter">
            <span>Alpha Returns</span>
            <span>Impact Utility</span>
          </div>
        </div>

        {/* Risk Level */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Risk Tolerance (λ)</label>
          <div className="grid grid-cols-1 gap-2">
            {["Conservative", "Moderate", "Aggressive"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setRiskLevel(level)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border text-sm font-medium transition-all",
                  riskLevel === level 
                    ? "bg-[#00FF41]/5 border-[#00FF41]/30 text-[#00FF41]" 
                    : "bg-surface border-white/5 text-gray-400 hover:border-white/10"
                )}
              >
                {level}
                {level === "Conservative" && <Shield size={16} />}
                {level === "Moderate" && <Sliders size={16} />}
                {level === "Aggressive" && <TrendingUp size={16} />}
              </button>
            ))}
          </div>
        </div>

        <button 
          disabled={isOptimizing}
          className="w-full bg-[#00FF41] text-black py-4 rounded-xl font-bold hover:bg-[#00e03a] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOptimizing ? (
            <Zap className="animate-pulse" size={18} />
          ) : (
            <>
              Run Optimizer
              <TrendingUp size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="pt-6 border-t border-white/5">
        <p className="text-[10px] text-gray-600 leading-relaxed font-mono uppercase tracking-tight">
          Optimization algorithm uses Markowitz Mean-Variance modification for SROI objective functions. Weights are non-negative and satisfy sum constraint W^T*1 = 1.
        </p>
      </div>
    </aside>
  );
}
