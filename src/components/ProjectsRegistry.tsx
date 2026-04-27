import { Project } from "../types";
import { Search, Filter, ArrowUpRight, TrendingUp, Leaf, BarChart3, Info } from "lucide-react";
import { formatPercent, cn } from "../lib/utils";
import { useState } from "react";

interface ProjectsRegistryProps {
  projects: Project[];
}

export default function ProjectsRegistry({ projects }: ProjectsRegistryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Impact Registry</h2>
          <p className="text-gray-500">Real-time dynamic feed of global high-impact initiatives.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ticker, or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0d0d0f] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-[#00FF41]/30 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((p, i) => (
          <div key={p.ticker} className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6 hover:border-[#00FF41]/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-[#00FF41]" size={20} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-xs text-[#00FF41] group-hover:bg-[#00FF41]/10 transition-colors">
                {p.ticker.substring(0, 3)}
              </div>
              <div>
                <h4 className="font-bold tracking-tight">{p.name}</h4>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] bg-white/5 text-gray-500 px-2 py-0.5 rounded uppercase font-bold tracking-widest">{p.category}</span>
                   <span className="text-[10px] font-mono text-gray-700">{p.ticker}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-8 line-clamp-2 min-h-[40px]">
              {p.description || "Building sustainable futures through innovation and data-driven resource optimization."}
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest flex items-center gap-1">
                  Return
                  <TrendingUp size={10} />
                </p>
                <p className="font-mono text-sm">{formatPercent(p.expectedReturn)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-widest flex items-center gap-1">
                  SROI
                  <Leaf size={10} />
                </p>
                <p className="font-mono text-sm text-[#00FF41]">{(p.sroiScore * 10).toFixed(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest flex items-center gap-1">
                  Risk
                  <BarChart3 size={10} />
                </p>
                <p className="font-mono text-sm">{formatPercent(p.volatility)}</p>
              </div>
            </div>
            
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                 <Info size={14} />
                 View Detailed Analytics
               </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-600">No projects found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
