const express = require("express");

const userController = require("../controllers/userController");
const authContoller = require("../controllers/authController");

const router = express.Router();

router.post("/singup", authContoller.uploadUserPhoto, authContoller.singup);
router.post("/login", authContoller.login);

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(authContoller.protect, userController.getUser)
  .patch(authContoller.protect, userController.updateUser)
  .delete(authContoller.protect, userController.deleteUser);

router.route("/search").post(authContoller.protect, userController.saveSearch);

module.exports = router;
