const express = require("express");
const packagesController = require("./../Controllers/packagesController");

const router = express.Router();

// router.route("/createPackages").post(packagesController.createPackages);
router.route("/create").post(packagesController.createNewpackages);
router
  .route("/currentPoint/:currentPoint")
  .get(packagesController.getPackagesByCurrentPoint);
router.route("/getAllPackages").get(packagesController.getAllPackages);
router
  .route("/getPackageWithStatus/:status")
  .get(packagesController.getPackageWithStatus);
router.route("/updateStatus").patch(packagesController.updatePackageStatus);
router.route("/:packagesId").get(packagesController.getPackagesById);

router
  .patch("/:Id/updateRouteAndCurrentPoint")
  .patch(packagesController.updateRouteAndCurrentPoint);
module.exports = router;
