const express = require("express");
const orderController = require("./../Controllers/orderController");

const router = express.Router();

router.route("/packagesSuccess").get(orderController.getpackagesSuccess);
router.route("/packagesFail").get(orderController.getpackagesFail);

router
  .route("/currentPoint/:currentPoint")
  .get(orderController.getPackagesIdByCurrentPoint);

// đơn hàng gửi từ giao dịch 1 sang tập kết 1
router
  .route("/packagesIdSendByTransactionPointSend/:TransactionPoint")
  .get(orderController.getPackagesIdSendByTransactionPointSend);

//đơn hàng gửi từ tập kết 1 sang tập kết 2
router
  .route("/packagesIdSendByWarehouseSend/:warehouse")
  .get(orderController.getPackagesIdSendByWarehouseSend);

//đơn hàng gửi từ tập kết 2 sang giao dịch 2
router
  .route("/packagesIdSendByWarehouseReceive/:warehouse")
  .get(orderController.getPackagesIdSendByWarehouseReceive);

//đơn hàng gửi từ giao dịch 2 đến người nhận
router
  .route("/packagesIdSendByTransactionReceive/:transactionLocation")
  .get(orderController.getPackagesIdSendByTransactionPointReceive);

//đơn hàng chờ xác nhận đến điểm tập kết 1
router
  .route("/packagesIdRequireWarehouseSend/:warehouseLocation")
  .get(orderController.getPackagesIdRequireWarehouseSend);

// đơn hàng chờ xác nhận đến điểm tập kết 2
router
  .route("/packagesIdRequireWarehouseReceive/:warehouseLocation")
  .get(orderController.getPackagesIdRequireWarehouseReceive);

// đơn hàng chờ xác nhận đến điểm giao dịch 2
router
  .route("/packagesIdRequireTransactionReceive/:transactionLocation")
  .get(orderController.getPackagesIdRequireTransactionReceive);

// đơn hàng được xác nhận đến tập kết 1
router
  .route("/transactionToWarehouse")
  .patch(orderController.transactionToWarehouse);

// đơn hàng được xác nhận đến tập kết 2
router
  .route("/warehouseToWarehouse")
  .patch(orderController.warehouseToWarehouse);

//đơn hàng được xác nhạn đến giao dịch 2
router
  .route("/warehouseToTransaction")
  .patch(orderController.warehouseToTransaction);
// đơn hàng được xác nhận đang di chuyển giữa các điểm
router
  .route("/transportingPackages")
  .patch(orderController.transportingPackages);

router.route("/orderSuccess").patch(orderController.orderSuccess);
router.route("/route/:packagesId").get(orderController.getRouteByPackagesId);

module.exports = router;
