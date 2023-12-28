const express = require("express");
const authController = require("../Controllers/authController");
const authen = require("../Controllers/Authentication/authentication");

const router = express.Router();

// router.use(authen.validateUser);
// router.use(authen.extractAuthorization);

router.route("/signup").post(authController.signup);
router.route("/addnewUserByManager").post(authController.addNewUserByManager);
router.route("/addNewUser").post(authController.addNewUser);
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
