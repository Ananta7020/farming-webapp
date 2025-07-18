const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.get("/", (req, res) => res.send("Farming Web App Backend Running"));
const cropRoutes = require("./routes/crop-routes.js");
app.use("/api/crops", cropRoutes);

//Signup-Login Routes
const userRoutes = require("./routes/user-routes");
app.use("/api/user", userRoutes);

const authRoutes = require("./routes/auth.js");
app.use("/api/auth", authRoutes);

//Middleware Auth
// const middAuth = require('./middleware/auth.js');
// app.use('/api/mauth',middAuth);
//Expence
const expenseRoutes = require("./routes/expence-routes");
app.use("/api/expence", expenseRoutes);

//shop
const shopRoutes = require("./routes/shop-routes");
app.use("/api/shops", shopRoutes);

//product
const productRoutes = require("./routes/product-routes");
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
