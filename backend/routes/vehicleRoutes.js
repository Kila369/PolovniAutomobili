const express = require("express");
const multer = require("multer");

const vehicleController = require("../controllers/vehicleController");
const authContoller = require("../controllers/authController");

const upload = multer({ dest: "public/img" });

const router = express.Router();

router
  .route("/")
  .get(vehicleController.getAllVehicles)
  .post(authContoller.protect, vehicleController.createVehicle);

router.post("/upload", upload.single("photo"));
router
  .route("/:id")
  .get(vehicleController.getVehicle)
  .patch(authContoller.protect, vehicleController.updateVehicle)
  .delete(authContoller.protect, vehicleController.deleteVehicle);

router.patch(
  "/:id/status",
  authContoller.protect,
  authContoller.restrictTo("admin"),
  vehicleController.changeVehicleStatus
);
module.exports = router;
