const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
require("dotenv").config(); // Load environment variables

const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());

//Route
app.use("/api/auth", authRouter);

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI) // Use the variable from .env
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.error("Failed to Connect Database", error));

//GLobal ERROR
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
