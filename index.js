const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute")
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
require("dotenv").config();


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

// not Found
app.use(notFound);
app.use(errorHandler);

// Server runing
require("./config/dbConnect");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
