const mongoose = require("mongoose");
const dbgr = require("debug")("development: mongoose") //here we can write anything
const config = require("config");

const DB_URI = config.get("MONGODB_URI");

mongoose
  .connect(`${DB_URI}/scatch`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => dbgr("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
module.exports = mongoose.connection;

//when we ==>( set DEBUG=development:* ) write this command in terminal then it means that we are allowing every msg to print if only (set DEBUG= ) is written means now no msg can be loaded