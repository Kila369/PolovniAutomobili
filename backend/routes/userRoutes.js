const express = require("express");

const userController = require("../controllers/userController");
const authContoller = require("../controllers/authController");

const router = express.Router();

router.post("/singup", authContoller.singup);
router.post("/login", authContoller.login);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id/search").post(userController.saveSearch);

module.exports = router;
