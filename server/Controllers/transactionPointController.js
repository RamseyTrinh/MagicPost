const TransactionPoint = require("../Models/transactionPointModel");
const Warehouse = require("../Models/warehouseModel.js");

// Hàm lấy tất cả điểm giao dịch

exports.getAlltransactionPoint = async (_, res) => {
  try {
    const transactionPoint = await TransactionPoint.find();
    res.status(200).json({
      status: "Success",
      length: transactionPoint.length,
      data: {
        transactionPoint,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Hàm lấy điểm giao dịch theo tỉnh
exports.getLocationByProvince = async function getLocationByProvince(req, res) {
  try {
    const province = decodeURI(req.params.province);
    const location = await TransactionPoint.findOne({
      province,
    });

    if (!location) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy điểm giao dịch tỉnh này" });
    }

    return res.status(200).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createtransactionPoint = async (req, res) => {
  try {
    const transactionPoint = await TransactionPoint.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        transactionPoint,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// get name của điểm tập kết của điểm giao dịch này
exports.getWarehouseNameByTransactionPoint =
  async function getWarehouseNameByTransactionPoint(req, res) {
    const transactionLocation = decodeURI(req.params.transactionPoint);
    console.log(transactionLocation);
    try {
      const transactionPoint = await TransactionPoint.findOne({
        location: transactionLocation,
      });
      console.log(transactionPoint);

      const warehouse = transactionPoint.warehouseLocation;
      console.log(warehouse);

      if (!warehouse) {
        return res.status(404).json({
          error: "Không tìm thấy điểm tập kết thích ứng",
        });
      }

      res.status(200).json({
        data: warehouse,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Có lỗi xảy ra",
      });
    }
  };

exports.getWHfromLocation = async function getWHfromLocation(location) {
  const tran = await TransactionPoint.findOne({ location });
  return tran.warehouseLocation;
};
async function getWHLocation(location) {
  const tran = await TransactionPoint.findOne({ location });
  return tran.warehouseLocation;
}

exports.createLocation = async (req, res) => {
  const type = req.body;
  try {
    if (type === "Điểm tập kết") {
      const warehouse = await Warehouse.create(req.body);
      res.status(201).json({
        status: "Success",
        data: {
          warehouse,
        },
      });
    }
    if (type === "Điểm giao dịch") {
      const warehouse = await TransactionPoint.create(req.body);
      res.status(201).json({
        status: "Success",
        data: {
          warehouse,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getTransactionPointsWithoutManager = async (req, res) => {
  try {
    // Truy vấn tất cả điểm giao dịch chưa có quản lý
    const transactionPointsWithoutManager = await TransactionPoint.find({
      "manager.name": { $exists: false },
    });

    res.status(200).json({
      status: "Success",
      length: transactionPointsWithoutManager.length,
      data: {
        transactionPoints: transactionPointsWithoutManager,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Đã xảy ra lỗi khi truy vấn điểm giao dịch chưa có quản lý",
      error: error.message,
    });
  }
};

function extractLocation(address) {
  const regex = /, (Tỉnh |Thành phố )\s*([^,]+)/;
  const match = address.match(regex);
  if (match && match[2]) {
    return match[2].trim();
  }

  return null;
}
exports.createPoint = async (req, res) => {
  try {
    let createdPoint;
    const newPoint = req.body;

    if (newPoint.pointType === "transactionPoint") {
      const newTP = Object.assign(newPoint, {
        name: newPoint.name,
        location: extractLocation(newPoint.address),
        address: newPoint.location,
        warehouseLocation: newPoint.area,
        transactionPointId: newPoint.pointID,
      });
      createdPoint = await TransactionPoint.create(newTP);
    } else if (newPoint.pointType === "warehouse") {
      const newTP = Object.assign(newPoint, {
        name: newPoint.name,
        location: newPoint.area,
        address: newPoint.location,
        warehouseId: newPoint.pointID,
      });
      createdPoint = await Warehouse.create(newTP);
    } else {
      throw new Error("Loại điểm không hợp lệ");
    }

    res.status(201).json({
      status: "Success",
      data: {
        createdPoint,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
