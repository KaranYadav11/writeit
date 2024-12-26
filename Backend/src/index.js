import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoute.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
