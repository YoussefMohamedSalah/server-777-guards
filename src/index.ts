import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import * as http from "http";

import { AuthRouter } from "./routes/Auth/Auth";
import { NotificationRouter } from "./routes/notification";
import { DashboardRouter } from "./routes/dashboard";
import { connectToDataBase } from "./config/dbConnection";
import { handleAddAdmins } from "./config/script";
import { JobRouter } from "./routes/job";
import { CandidateRouter } from "./routes/candidate";
import { WebsiteRouter } from "./routes/website";
import { ContactRouter } from "./routes/contact";
import { PartnersRouter } from "./routes/partners";

require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express app

const corsOriginList = ["http://localhost:3000", "http://localhost:3001", "https://777-guards.com", "https://www.777-guards.com", "https://admin.777-guards.com", "https://www.admin.777-guards.com"];

app.use(
  cors({
    origin: corsOriginList,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// limit the number of requests for one ip
const limiter = rateLimit({
  limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  message: "too many requests, please try again after an hour",
});

app.use(limiter);

// data sanitizer protection from data query injection
app.use(mongoSanitize());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

connectToDataBase();

handleAddAdmins();

// ROUTES
app.get("/api/download/file/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads/file/", filename);
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.sendFile(filePath);
});

// ************************************************
app.use("/api/auth", AuthRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/notifications", NotificationRouter);
app.use("/api/candidates", CandidateRouter);
app.use("/api/jobs", JobRouter);
app.use("/api/website", WebsiteRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/partners", PartnersRouter);

// ************************************************
// Serve static files
app.use(express.static("uploads"));
app.use("/api/uploads", express.static("uploads"));

// Handle all routes by serving index.html
app.get("*", (req, res) => {
  app.use(express.static("build"));
  const indexPath = path.join(__dirname, "build", "index.html");
  res.sendFile(indexPath);
});

export default app;
