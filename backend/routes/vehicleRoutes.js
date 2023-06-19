const express = require("express");

const vehicleController = require("../controllers/vehicleController");
const authContoller = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(vehicleController.getAllVehicles)
  .post(
    authContoller.protect,
    vehicleController.uploadVehiclePhoto,
    vehicleController.createVehicle
  );

router
  .route("/:id")
  .get(vehicleController.getVehicle)
  .patch(
    authContoller.protect,
    vehicleController.uploadVehiclePhoto,
    vehicleController.updateVehicle
  )
  .delete(authContoller.protect, vehicleController.deleteVehicle);

router.patch(
  "/:id/status",
  authContoller.protect,
  authContoller.restrictTo("admin"),
  vehicleController.changeVehicleStatus
);
module.exports = router;
