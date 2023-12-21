//IMPORT PACKAGE
const express = require("express");
const morgan = require("morgan");
const moviesRouter = require("./Routes/moviesRoutes");
const authRouter = require("./Routes/authRouter");
const warehouseRouter = require("./Routes/warehouseRoutes");
const transactionPointRouter = require("./Routes/transactionPointRoutes");
const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/errorController");
const cors = require("cors");

let app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

//USING ROUTES

app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/users", authRouter);
app.use("/api/v1/warehouse", warehouseRouter);
app.use("/api/v1/transactionPoint", transactionPointRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  //   next(err);
});

app.use(globalErrorHandler);

module.exports = app;
