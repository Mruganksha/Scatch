const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// DB connection
require("./config/mongoose-connection");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// View engine for EJS (temporary)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routers
const indexRouter = require("./routes/index"); // EJS routes
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

// Routes
app.use("/", indexRouter); // EJS views
app.use("/api/owners", ownersRouter); // APIs
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

// Default fallback
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
