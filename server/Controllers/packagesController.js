const Packages = require("../Models/packagesModel");
const Apifeatures = require("../Utils/ApiFeatures");
const CustomError = require("./../Utils/CustomError");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const { randomBytes } = require("crypto");
const { getTransactionPointName } = require("./transactionPointController");

function generatePackagesId() {
  const randomBuffer = randomBytes(3); // 4 bytes (32 bits)
  const packagesId = parseInt(randomBuffer.toString("hex"), 16);
  const fixedLengthId = `DH${String(packagesId).padStart(6, "0")}`;
  return fixedLengthId;
}

exports.getAllPackages = asyncErrorHandler(async (req, res) => {
  try {
    const features = new Apifeatures(Packages.find(req.params.ID), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const packages = await features.query;

    res.status(200).json({
      status: "Success",
      length: packages.length,
      data: {
        packages,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Không có bản ghi nào được tìm thấy",
    });
  }
});

// use for orderController
exports.getPackagesById = async function getPackagesById(packagesId) {
  return await Packages.findOne({ packagesId: packagesId });
};

exports.http_getPackagesById = asyncErrorHandler(async (req, res) => {
  const packagesId = req.params.id;
  try {
    const packages = await Packages.findOne({ packagesId: packagesId });

    if (!packages) {
      return res.status(404).json({
        error: "packages not found",
      });
    }

    return res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//Hàm tạo đơn hàng đơn giản
exports.createPackages = asyncErrorHandler(async (req, res) => {
  try {
    const packages = await Packages.create(req.body);
    packages.packageId = generatePackagesId();
    const id = packages.packageId;
    await packages.save();
    res.status(201).json({
      status: "Success",
      data: {
        packages,
        id,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

exports.deletePackage = asyncErrorHandler(async (req, res, next) => {
  const packages = await Packages.findByIdAndDelete(req.params.ID);
  if (!packages) {
    return next(new CustomError("Không có bản ghi nào được tìm thấy", 404));
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });

  res.status(400).json({
    status: "fail",
    message: error.message,
  });
});

exports.createNewpackages = asyncErrorHandler(async (req, res) => {
  const packages = req.body;
  console.log(packages);

  try {
    const now = new Date().toLocaleString();

    const newpackages = Object.assign(packages, {
      packagesId: generatePackagesId(),
      packagesStatus: "Đang xử lý",
      startLocation: packages.startLocation,
      endLocation: packages.endLocation,
      senderInfo: packages.senderInfo,
      receiverInfo: packages.receiverInfo,
      createdDate: now,
    });

    await Packages.create(newpackages);

    return res.status(201).json(newpackages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

// lấy theo trạng thái
exports.getPackageWithStatus = async function getPackageWithStatus(req, res) {
  const { status } = req.params;

  try {
    const packages = await Packages.find({ packageStatus: status });
    res.status(200).json({
      success: true,
      message: `Các đơn hàng có trạng thái '${status}':`,
      data: packages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo trạng thái.",
      error: error.message,
    });
  }
};

//Để thống kê
exports.getPackages_SLocation = async function getPackages_SLocation(req, res) {
  const { startLocation } = req.params;

  try {
    const packages = await Packages.find({
      startLocation: startLocation,
    });

    res.status(200).json({
      success: true,
      message: `Các đơn hàng từ ${startLocation}: `,
      data: packages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo điểm đến",
      error: error.message,
    });
  }
};
exports.getPackages_ELocation = async function getPackages_ELocation(req, res) {
  const { endLocation } = req.params;

  try {
    const packages = await Packages.find({
      endLocation: endLocation,
    });

    res.status(200).json({
      success: true,
      message: `Các đơn hàng đến ${endLocation}:`,
      data: packages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo điểm đi.",
      error: error.message,
    });
  }
};

exports.updatePackageStatus = async function updatePackageStatus(req, res) {
  const { packageId, newStatus } = req.body;

  try {
    const packageToUpdate = await Packages.findOne({ packageId: packageId });

    if (!packageToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng với ID cung cấp.",
      });
    }

    packageToUpdate.packageStatus = newStatus;
    await packageToUpdate.save();

    res.status(200).json({
      success: true,
      message: `Trạng thái của đơn hàng với ID ${packageId} đã được cập nhật thành ${newStatus}.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật trạng thái của đơn hàng.",
      error: error.message,
    });
  }
};

exports.getPackageIdByTransactionPoint =
  async function getPackageIdByTransactionPoint(req, res) {
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
      const transactionPoint = await getTransactionPointName({
        name: transactionPointName,
      });

      // Kiểm tra xem điểm giao dịch có tồn tại không
      if (!transactionPoint) {
        return res.status(404).json({
          error: "Không tìm thấy điểm giao dịch",
        });
      }

      // Lấy tất cả các đơn hàng với FromLocation trùng với location của điểm giao dịch
      const orders = await Packages.find({
        startLocation: transactionPoint.location,
      });

      // Lấy tất cả các packageId từ các đơn hàng
      const packageIds = orders.flatMap((order) => order.packageId);

      return res.status(200).json({ packageIds });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Có lỗi xảy ra",
      });
    }
  };

// async function getTransactionIdFromPackageId(packageId) {
//   try {
//     const package = await Packages.findById(packageId);

//     // Kiểm tra xem package có tồn tại không
//     if (!package) {
//       return null; // Hoặc bạn có thể throw một lỗi tùy thuộc vào logic ứng dụng của bạn
//     }

//     // Trả về transactionId của package
//     return package.startLocation;
//   } catch (error) {
//     console.error("Lỗi khi lấy transactionId từ packageId:", error);
//     throw error;
//   }
// }

// exports.updatePackage = asyncErrorHandler(async (req, res, next) => {
//   const package = await Model.findByIdAndUpdate(req.params.ID, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!package) {
//     return next(new CustomError("Không có bản ghi nào được tìm thấy", 404));
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       data: doc,
//     },
//   });
// });
