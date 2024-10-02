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
const corsOptions = {
  origin: "https://helwyza-jobfair.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`${process.env.SECRET_KEY}`);
});

app.get("/token", (req, res) => {
  const user = { _id: "123456" }; // Replace with actual user data
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    maxAge: 3600000, // Cookie will expire in 1 hour
  });
  res.status(200).json({
    success: true,
    message: "Token generated successfully",
    user: user, // Return user data if needed
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
