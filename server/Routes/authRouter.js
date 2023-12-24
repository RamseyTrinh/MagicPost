const express = require("express");
const authController = require("./../Controllers/authController");
const authen = require("../Controllers/Authentication/authentication");

const router = express.Router();

// router.use(authen.validateUser);
// router.use(authen.extractAuthorization);

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.get("/getallId", authController.getAllUsers);
router.get("/:id", authController.getUserById);
router.post("/addNewUser", authController.addNewUser);
router.patch("/:id/changeinfo", authController.ChangeUserProfile);

module.exports = router;
