const express = require("express");
const money = require("../Controllers/moneyController");

const router = express.Router();

router.route("/").post(money.calculateMoney);

module.exports = router;
