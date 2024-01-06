const express = require("express");
const packagesController = require("./../Controllers/packagesController");

const router = express.Router();

router.route("/create").post(packagesController.createNewpackages);
router
  .route("/currentPoint/:currentPoint")
  .get(packagesController.getPackagesByCurrentPoint);
router
  .route("allpackageinlocation/:location")
  .get(packagesController.getPackagesByLocation);

router.route("/getAllPackages").get(packagesController.getAllPackages);
router
  .route("/getPackageWithStatus/:status")
  .get(packagesController.getPackageWithStatus);
router.route("/updateStatus").patch(packagesController.updatePackageStatus);
router.route("/:packagesId").get(packagesController.getPackagesById);

router.route("/thongkehanggui").get(packagesController.getPackages_SLocation);
router.route("/thongkehangnhan").get(packagesController.getPackages_ELocation);

module.exports = router;
