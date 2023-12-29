const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);

router.route("/addnewUser").post(authController.addNewUser);
router
  .route("/addNewUserByTransactionAdmin")
  .post(authController.addNewUserByTransactionAdmin);
router
  .route("/addNewUserByWarehouseAdmin")
  .post(authController.addNewUserByWarehouseAdmin);

router.route("/allUser").get(authController.getAllUsers);
router.route("/:id").get(authController.getUserById);

router.route("/allTransactionAdmin").get(authController.getTransactionAdmin);
router.route("/allWarehouseAdmin").get(authController.getWarehouseAdmin);

router
  .route("/allTransactionStaff/:location")
  .get(authController.getTransactionStaff);

router
  .route("/allWarehouseStaff/:location")
  .get(authController.getWarehouseStaff);

module.exports = router;
