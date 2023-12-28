const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/addnewUser").post(authController.addNewUser);

router
  .route("/addNewUserByTransactionAdmin")
  .post(authController.addNewUserByTransactionAdmin);
router
  .route("/addNewUserByWarehouseAdmin")
  .post(authController.addNewUserByWarehouseAdmin);

router.route("/login").post(authController.login);

router.route("/allUser").get(authController.getAllUsers);
router.route("/:id", authController.getUserById);
router.route("/name/:name", authController.getUserByName);

router.route("/allTransactionAdmin").get(authController.getTransactionAdmin);
router.route("/allWarehouseAdmin").get(authController.getWarehouseAdmin);

router
  .route("/allTransactionStaff/:location")
  .get(authController.getTransactionStaff);

router
  .route("/allWarehouseStaff/:location")
  .get(authController.getWarehouseStaff);

router.route("/getUser/:email").get(authController.getUserByEmail);
router.route("/:id/changeinfo").patch(authController.ChangeUserProfile);

module.exports = router;
