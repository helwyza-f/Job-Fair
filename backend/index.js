import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Pengaturan CORS manual
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://helwyza-jobfair.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Izinkan cookies
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE"); // Metode yang diizinkan
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Header yang diizinkan
  next();
});

// const corsOptions = {
//   origin: "https://helwyza-jobfair.netlify.app",
//   credentials: true,
// };
// app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
