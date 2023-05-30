const Vehicle = require("../models/vehicleModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsyncError");

const getAllVehicles = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Vehicle.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const vehicles = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: vehicles.length,
    data: { vehicles },
  });
});

const getVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id.trim());
  if (!vehicle) {
    return next(new AppError("No vehicle found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { vehicle },
  });
});

const createVehicle = catchAsync(async (req, res, next) => {
  const newVehicle = await Vehicle.create({
    vehicleType: req.body.vehicleType,
    name: req.body.name,
    make: req.body.make,
    model: req.body.model,
    price: req.body.price,
    year: req.body.year,
    mileage: req.body.mileage,
    bodyType: req.body.bodyType,
    condition: req.body.condition,
    wheelDrive: req.body.wheelDrive,
    power: req.body.power,
    color: req.body.color,
    fuel: req.body.fuel,
    description: req.body.description,
    user: req.user.id,
  });
  res.status(201).json({ status: "success", data: { vehicle: newVehicle } });
});

const updateVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id.trim()).select("user");
  if (
    !(req.user.role === "admin") &&
    !(req.user.id === vehicle.user.toString())
  ) {
    return next(
      new AppError("You do not have permission to perform this action!", 403)
    );
  }

  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    {
      vehicleType: req.body.vehicleType,
      name: req.body.name,
      make: req.body.make,
      model: req.body.model,
      price: req.body.price,
      year: req.body.year,
      mileage: req.body.mileage,
      bodyType: req.body.bodyType,
      condition: req.body.condition,
      wheelDrive: req.body.wheelDrive,
      power: req.body.power,
      color: req.body.color,
      fuel: req.body.fuel,
      description: req.body.description,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(201)
    .json({ status: "success", data: { vehicle: updatedVehicle } });
});

const deleteVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id.trim()).select("user");
  if (
    !(req.user.role === "admin") &&
    !(req.user.id === vehicle.user.toString())
  ) {
    return next(
      new AppError("You do not have permission to perform this action!", 403)
    );
  }

  const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (!deletedVehicle) {
    return next(new AppError("No vehicle found with that id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const changeVehicleStatus = catchAsync(async (req, res, next) => {
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(201)
    .json({ status: "success", data: { vehicle: updatedVehicle } });
});

const uploadImage = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  res.status(201).json({ status: "success" });
};

module.exports = {
  getAllVehicles,
  createVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  changeVehicleStatus,
};
