import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
// Build MongoDB URI from .env components
//const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const mongoURI =
  "mongodb+srv://admin:admin@cluster0.cv2f8ak.mongodb.net/garageDB?retryWrites=true&w=majority&appName=Cluster0";
// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
import bookingRoutes from "./routes/bookingRoutes.js";
app.use("/api/bookings", bookingRoutes);

import serviceRoutes from "./routes/serviceRoutes.js";
app.use("/api/services", serviceRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Garage API is working!");
});

// Connect to MongoDB and start server
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    //const PORT = process.env.PORT || 3001;
    //app.listen(PORT, () => {
      //console.log(`🚀 Server is running on port ${PORT}`);
    //});
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
  