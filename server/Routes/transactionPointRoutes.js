const express = require("express");
const transactionPointController = require("../Controllers/transactionPointController");

const router = express.Router();

router
  .route("/getWarehouse/:transactionPoint")
  .get(transactionPointController.getWarehouseNameByTransactionPoint);

router
  .route("/newTransactionPoint")
  .post(transactionPointController.createtransactionPoint);

router
  .route("/allTransactionPoint")
  .get(transactionPointController.getAlltransactionPoint);

router
  .route("/:province")
  .get(transactionPointController.getLocationByProvince);

module.exports = router;
