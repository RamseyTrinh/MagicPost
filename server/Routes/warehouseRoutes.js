const express = require("express");
const warehouseController = require("../Controllers/warehouseController");

const router = express.Router();

router.route("/createNewWarehouse").post(warehouseController.createwarehouse);
router.route("/getAllWarehouse").get(warehouseController.getAllWarehouse);

module.exports = router;
