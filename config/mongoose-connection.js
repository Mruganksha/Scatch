const mongoose = require("mongoose");
const dbgr = require("debug")("development: mongoose") //here we can write anything
const config = require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)  //set it dynamically afterwards
.then(function(){
    dbgr("connected");
})
.catch(function(err){
   console.log(err);
})

module.exports = mongoose.connection;

//when we ==>( set DEBUG=development:* ) write this command in terminal then it means that we are allowing every msg to print if only (set DEBUG= ) is written means now no msg can be loaded