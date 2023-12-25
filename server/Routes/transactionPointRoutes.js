const express = require("express");
const TransactionPointController = require("../Controllers/transactionPointController");

const router = express.Router();

router
  .route("/createNewT_Point")
  .post(TransactionPointController.createtransactionPoint);

router
  .route("/allTransactionPoint")
  .get(TransactionPointController.getAlltransactionPoint);

router
  .route("/:province")
  .get(TransactionPointController.getLocationByProvince);
module.exports = router;
