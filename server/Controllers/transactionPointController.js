const Packages = require("../Models/packagesModel");
const TransactionPoint = require("../Models/transactionPointModel");

const { findWareHouseById } = require("./warehouseController");
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
