const express = require("express");
const orderController = require("./../Controllers/orderController");

const router = express.Router();

router.route("/currentPoint/:currentPoint").get(orderController.getPackagesIdByCurrentPoint);

router
  .route("/transactionToWarehouse/:packagesId")
  .patch(orderController.transactionToWarehouse);
router
  .route("/warehouseToWarehouse/:packagesId")
  .patch(orderController.warehouseToWarehouse);
router
  .route("/warehouseToTransaction/:packagesId")
  .patch(orderController.warehouseToTransaction);
router
  .route("/orderSuccess/:packagesId")
  .patch(orderController.orderSuccess);
router
  .route("/getRoute/:packagesId")
  .get(orderController.getRouteByPackagesId);
module.exports = router;