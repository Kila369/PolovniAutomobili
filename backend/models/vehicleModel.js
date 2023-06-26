const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    default: "Car",
  },
  name: {
    type: String,
    required: [true, "Please provide vehicle name!"],
    maxlength: [
      40,
      "A vehicle name must have less or equalt than 40 characters",
    ],
    minlength: [8, "A vehicle name must have more or equalt than 8 characters"],
  },
  make: {
    type: String,
    required: [true, "Please provide vehicle make!"],
  },
  model: {
    type: String,
    required: [true, "Please provide vehicle model!"],
  },
  price: {
    type: Number,
    required: [true, "Please provide vehicle price!"],
    max: 1000000,
  },
  year: {
    type: Number,
    min: 1930,
    max: 2023,
  },
  description: {
    type: String,
    trim: true,
  },
  mileage: {
    type: Number,
    required: [true, "Please provide vehicle mileage!"],
    min: 0,
  },
  bodyType: {
    type: String,
    required: [true, "Please provide vehicle body type!"],
    enum: {
      values: [
        "Limuzina",
        "Hečbek",
        "Karavan",
        "Kupe",
        "Kabriolet",
        "Džip/SUV",
        "MiniVan",
      ],
      message: "Please select valid body type!",
    },
  },
  condition: {
    type: String,
    required: [true, "Please provide vehicle condition!"],
    enum: {
      values: ["Nov", "Polovan"],
      message: "Please select valid vehicle condition!",
    },
  },
  wheelDrive: {
    type: String,
    required: [true, "Please provide vehicle wheel drive!"],
    enum: {
      values: ["Prednja vuča", "Zadnja vuča", "4x4"],
      message: "Please select valid vehicle wheel drive!",
    },
  },
  power: {
    type: String,
    required: [true, "Please provide vehicle horse power!"],
  },
  color: {
    type: String,
    required: [true, "Please provide vehicle color!"],
  },
  fuel: {
    type: String,
    required: [true, "Please provide vehicle wheel drive!"],
    enum: {
      values: [
        "Benzin",
        "Dizel",
        "Benzin + Metan",
        "Benzin + Gas",
        "Struja",
        "Hibrid",
      ],
      message: "Please select valid vehicle fuel!",
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Vehicle must belong to user!"],
  },
  status: {
    type: String,
    enum: {
      values: ["approved", "pending"],
      message: "Please select valid vehicle status!",
    },
    default: "pending",
  },
  images: [],
  roof: {
    type: String,
    enum: {
      values: ["nista", "siber", "kabriolet", "panorama"],
      message: "Please select valid vehicle status!",
    },
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
