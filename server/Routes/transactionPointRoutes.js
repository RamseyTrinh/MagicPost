const express = require("express");
const TransactionPointController = require("../Controllers/transactionPointController");

const router = express.Router();

router
  .route("/createNewTransactionPoint")
  .post(TransactionPointController.createtransactionPoint);
router
  .route("/getAllTransactionPoint")
  .get(TransactionPointController.getAlltransactionPoint);

module.exports = router;
