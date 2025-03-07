import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import passport from "passport";
import https from "https";
import fs from "fs";
import morgan from "morgan";

import "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import bikeRoutes from "./routes/bikeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["https://dcent.in", "https://www.dcent.in"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(passport.initialize());
app.disable("x-powered-by");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });

// Load SSL Certificates
const sslOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/dcent.in/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/dcent.in/fullchain.pem"),
  };
  
const PORT = process.env.PORT || 5000;
// Hello world

https.createServer(sslOptions, app).listen(5000, "0.0.0.0", () => {
    console.log(`Secure server running on https://dcent.in:${PORT}`);
    });