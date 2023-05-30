const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const AppError = require("./utils/appError");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/users", userRouter);

app.all("/*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
