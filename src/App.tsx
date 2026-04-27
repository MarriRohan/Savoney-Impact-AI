import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, signInWithGoogle } from "./lib/firebase";
import { LogIn, Leaf, TrendingUp, Shield, Save, LayoutDashboard, Database, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, formatCurrency } from "./lib/utils";
import Sidebar from "./components/Sidebar";
import DashboardPanel from "./components/DashboardPanel";
import ProjectsRegistry from "./components/ProjectsRegistry";
import { Project, OptimizationResult } from "./types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "registry">("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [optResult, setOptResult] = useState<OptimizationResult | null>(null);
  const [optParams, setOptParams] = useState<{ alpha: number, riskLevel: string, budget: number } | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const handleOptimize = async (params: { alpha: number, riskLevel: string, budget: number }) => {
    setIsOptimizing(true);
    setOptParams(params);
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      setOptResult(data);
    } catch (error) {
      console.error("Optimization failed", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#00FF41]/20 border-t-[#00FF41] rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-4 text-white font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF41] to-emerald-500 rounded-full blur opacity-25" />
            <Leaf className="w-20 h-20 text-[#00FF41] relative" />
          </div>
          <h1 className="text-5xl font-bold tracking-tighter">Savoney Impact</h1>
          <p className="text-gray-400 text-lg">
            High-frequency AI resource allocation engine balancing Alpha and Impact.
          </p>
          <button 
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#00FF41]/5"
          >
            <LogIn className="w-5 h-5" />
            Sign in to Terminal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar Controls */}
      <Sidebar onOptimize={handleOptimize} isOptimizing={isOptimizing} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Navigation Header */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                activeTab === "dashboard" ? "text-white" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <LayoutDashboard size={18} />
              Terminal Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("registry")}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                activeTab === "registry" ? "text-white" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <Database size={18} />
              Impact Registry
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500">Authenticated as</p>
              <p className="text-sm font-mono text-[#00FF41]">{user.displayName || user.email}</p>
            </div>
            <img src={user.photoURL || ""} alt="" className="w-8 h-8 rounded-full border border-white/10" />
            <button onClick={() => auth.signOut()} className="text-xs text-red-500/80 hover:text-red-400 font-medium">Log out</button>
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <DashboardPanel result={optResult} isOptimizing={isOptimizing} params={optParams} />
              </motion.div>
            ) : (
              <motion.div
                key="registry"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full"
              >
                <ProjectsRegistry projects={projects} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
