const express = require("express");
const authController = require("../Controllers/authController");
const authen = require("../Controllers/Authentication/authentication");

const router = express.Router();

// router.use(authen.validateUser);
// router.use(authen.extractAuthorization);

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/allUser").get(authController.getAllUsers);
router.route("/:id", authController.getUserById);
router.route("/name/:name", authController.getUserByName);

router.route("/allTracsactionAdmin").get(authController.getTransactionAdmin);
router.route("/allWarehouse").get(authController.getWarehouseAdmin);

router.route("/getUser/:email").get(authController.getUserByEmail);
router.route("/addNewUser").post(authController.addNewUser);
router.route("/:id/changeinfo").patch(authController.ChangeUserProfile);

module.exports = router;
