const express = require("express");
const orderController = require("./../Controllers/orderController");

const router = express.Router();

router.route("/packagesSuccess").get(orderController.getpackagesSuccess);
router.route("/packagesFail").get(orderController.getpackagesFail);

router
  .route("/currentPoint/:currentPoint")
  .get(orderController.getPackagesIdByCurrentPoint);
router
  .route("/transactionToWarehouse/:packagesId")
  .patch(orderController.transactionToWarehouse);

router
  .route("/transportingPackages/:packagesId")
  .patch(orderController.transportingPackages);
router
  .route("/warehouseToWarehouse/:packagesId")
  .patch(orderController.warehouseToWarehouse);
router
  .route("/warehouseToTransaction/:packagesId")
  .patch(orderController.warehouseToTransaction);
router.route("/orderSuccess/:packagesId").patch(orderController.orderSuccess);
router.route("/order/:packagesId").get(orderController.getRouteByPackagesId);

module.exports = router;
