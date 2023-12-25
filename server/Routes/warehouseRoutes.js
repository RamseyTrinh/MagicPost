const express = require("express");
const warehouseController = require("../Controllers/warehouseController");

const router = express.Router();

router.route("/newWarehouse").post(warehouseController.createwarehouse);
router.route("/allWarehouse").get(warehouseController.getAllWarehouse);

module.exports = router;
