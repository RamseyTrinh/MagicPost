const express = require("express");
const TransactionPointController = require("../Controllers/transactionPointController");

const router = express.Router();

router
  .route("/newTransactionPoint")
  .post(TransactionPointController.createtransactionPoint);

router
  .route("/allTransactionPoint")
  .get(TransactionPointController.getAlltransactionPoint);

router
  .route("/:province")
  .get(TransactionPointController.getLocationByProvince);

module.exports = router;
