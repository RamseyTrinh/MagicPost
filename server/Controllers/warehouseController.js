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

exports.getLocationByProvince = async function getLocationByProvince(req, res) {
  try {
    const province = decodeURI(req.params.province);
    const location = await Warehouse.findOne({
      province,
    });

    if (!location) {
      return res.status(404).json({ error: "Không tìm thấy điểm tập kết này" });
    }

    return res.status(200).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getwarehouseById = async (req, res) => {
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

exports.findWareHouseById = async function findWareHouseById(wareHouseId) {
  return await Warehouse.findById(wareHouseId);
};
