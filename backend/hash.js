// hash.js
const bcrypt = require("bcryptjs");

bcrypt.hash("admin123", 10).then((hash) => {
  console.log("Paste this hash in MongoDB:", hash);
});
