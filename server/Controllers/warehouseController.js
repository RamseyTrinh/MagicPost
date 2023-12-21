const Warehouse = require("../Models/warehouseModel");

exports.getAllWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.find();
    res.status(200).json({
      status: "Success",
      length: warehouse.length,
      data: {
        warehouse,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getwarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById();
    res.status(200).json({
      status: "Success",
      length: warehouse.length,
      data: {
        warehouse,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.createwarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        warehouse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
