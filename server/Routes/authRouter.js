const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

// Đăng nhập
router.route("/login").post(authController.login);

// Tạo thêm transactionAdmin
router.route("/addTransactionAdmin").post(authController.addTransactionAdmin);
router.route("/addWarehouseAdmin").post(authController.addWarehouseAdmin);

router
  .route("/addNewUserByTransactionAdmin")
  .post(authController.addNewUserByTransactionAdmin);

router
  .route("/addNewUserByWarehouseAdmin")
  .post(authController.addNewUserByWarehouseAdmin);

router.route("/allUser").get(authController.getAllUsers);
router.route("/:id").get(authController.getUserById);

router.route("/allManager/transaction").get(authController.getTransactionAdmin);
router.route("/allManager/warehouse").get(authController.getWarehouseAdmin);

router
  .route("/allTransactionStaff/:location")
  .get(authController.getTransactionStaff);

router
  .route("/allWarehouseStaff/:location")
  .get(authController.getWarehouseStaff);

router.route("/deleteuser/:userId").delete(authController.deleteUser);

router.route("/signup").post(authController.signup);
module.exports = router;
