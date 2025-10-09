const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());
const Port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send(`This is Home Route`);
});

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

connectToDb();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(Port, () => {
  console.log(`server is running on Port http://localhost:${Port}`);
});
