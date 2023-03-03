const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MonDB_Url, () => {
  console.log("Connected to Mongodb");
});