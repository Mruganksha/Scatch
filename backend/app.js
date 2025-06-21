require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");


// DB connection
require("./config/mongoose-connection");

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());


// CORS for React frontend
app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "https://scatch-frontend-sage.vercel.app",
    ],
    credentials: true,
  })
);

// app.js (backend)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const usersRouter = require("./routes/usersRouter");
app.use("/api/users", usersRouter);

app.use('/api/order', require('./routes/orderRoutes'));


const ownerRouter = require("./routes/ownersRouter");
app.use("/api/owners", ownerRouter);

const productRoutes = require('./routes/productsRouter');
app.use('/api/products', productRoutes);

const adminUserRoutes = require("./routes/adminUserRoutes");
app.use("/api", adminUserRoutes);