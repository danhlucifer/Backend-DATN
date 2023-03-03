const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/user", authRouter);


// not Found
app.use(notFound);
app.use(errorHandler);

// Server runing
require("./config/dbConnect");
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
