const express = require("express");
const packagesController = require("./../Controllers/packagesController");

const router = express.Router();

router.route("/createPackages").post(packagesController.createPackages);
router.route("/create").post(packagesController.createNewpackages);

router.route("/getAllPackages").get(packagesController.getAllPackages);
// router
//   .route("/:ID")
//   .get(packagesController.getPackagesById)
//   .patch(packagesController.updatePackage)
//   .delete(packagesController.deletePackage);

module.exports = router;
