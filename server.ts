import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { projectsRegistry } from "./src/engine/data_engine";
import { optimizeAllocation } from "./src/engine/optimization_engine";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Data Engine Registry
  app.get("/api/projects", (req, res) => {
    res.json(projectsRegistry);
  });

  // Optimization Engine
  app.post("/api/optimize", (req, res) => {
    try {
      const { alpha, riskLevel, budget } = req.body;
      
      // Convert risk level to lambda
      const riskMap: Record<string, number> = { "Conservative": 8, "Moderate": 4, "Aggressive": 1.5 };
      const riskAversion = riskMap[riskLevel] || 4;

      const result = optimizeAllocation(projectsRegistry, {
        alpha: alpha / 100, // Client sends slider 0-100
        riskAversion,
        budget: Number(budget)
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Optimization failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Savoney Impact Server running on http://localhost:${PORT}`);
  });
}

startServer();
