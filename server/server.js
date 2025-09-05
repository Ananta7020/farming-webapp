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

//auth
const authRoutes = require("./routes/auth.js");
app.use("/api/auth", authRoutes);

//Expence
const expenseRoutes = require("./routes/expence-routes");
app.use("/api/expence", expenseRoutes);

//shop
const shopRoutes = require("./routes/shop-routes");
app.use("/api/shops", shopRoutes);

//product
const productRoutes = require("./routes/product-routes");
app.use("/api/products", productRoutes);

//order by user
// const orderRoutes = require("./routes/order-routes");
// app.use("/api/orders", orderRoutes);

//cart
const cartRoutes = require("./routes/cart-routes.js");
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
