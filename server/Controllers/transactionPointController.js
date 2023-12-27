const Packages = require("../Models/packagesModel");
const TransactionPoint = require("../Models/transactionPointModel");

const { findWareHouseById } = require("./warehouseController");
// Hàm lấy tất cả điểm giao dịch
exports.getAlltransactionPoint = async (req, res) => {
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
    try {
      // Lấy tên của điểm giao dịch từ request query parameters
      const transactionPointName = req.query.transactionPointName;

      // Kiểm tra xem tên điểm giao dịch có được cung cấp không
      if (!transactionPointName) {
        return res.status(400).json({
          error: "Vui lòng cung cấp tên điểm giao dịch",
        });
      }

      // Tìm kiếm điểm giao dịch trong cơ sở dữ liệu
      const transactionPoint = await TransactionPoint.findOne({
        name: transactionPointName,
      });

      // Lấy ID của điểm tập kết từ điểm giao dịch
      const warehouseId = transactionPoint.wareHouseId;

      // Tìm kiếm thông tin của điểm tập kết từ ID
      const warehouse = await findWareHouseById(warehouseId);

      // Kiểm tra xem điểm tập kết có tồn tại không
      if (!warehouse) {
        return res.status(404).json({
          error: "Không tìm thấy điểm tập kết thích ứng",
        });
      }

      // Lấy tên của điểm tập kết
      const warehouseName = warehouse.name;

      return res.status(200).json({
        warehouseName: warehouseName,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Có lỗi xảy ra",
      });
    }
  };

exports.getWHfromLocation = async function getWHfromLocation(location) {
  const packages = Packages.findOne(location);
  return packages.warehouseLocation;
};
