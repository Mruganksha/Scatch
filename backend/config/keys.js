
    //JWT_KEY: "secret"; if we wrote like this any onw will be able to read or copy it so
require("dotenv").config();

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
};
