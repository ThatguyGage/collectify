import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import itemsRoute from "./routes/items.js";
import cors from "cors";

const allowed = [
  "http://localhost:5173",
  process.env.CLIENT_ORIGIN,   // <- we'll set this on Render
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: false
}));

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/items", itemsRoute);
app.get("/api/health", (_, res) => res.json({ ok: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));
app.get(/.*/, (_, res) => res.sendFile(path.join(publicDir, "index.html")));

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));

  export default app;
