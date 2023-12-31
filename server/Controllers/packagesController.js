const Packages = require("../Models/packagesModel");
const Order = require("../Models/orderModel");
const Apifeatures = require("../Utils/ApiFeatures");
const CustomError = require("./../Utils/CustomError");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const orderController = require("./orderController");
const { randomBytes } = require("crypto");
const { getWHfromLocation } = require("./transactionPointController");

function generatePackagesId() {
  const randomBuffer = randomBytes(3); // 4 bytes (32 bits)
  const packagesId = parseInt(randomBuffer.toString("hex"), 16);
  const fixedLengthId = `DH${String(packagesId).padStart(6, "0")}`;
  return fixedLengthId;
}

function extractLocation(address) {
  const regex = /, (Tỉnh |Thành phố )\s*([^,]+)/;
  const match = address.match(regex);
  if (match && match[2]) {
    return match[2].trim();
  }

  return null;
}

exports.getPackagesById = asyncErrorHandler(async (req, res) => {
  const packagesId = req.params.packagesId;
  try {
    const packages = await Packages.findOne({ packagesId: packagesId });
    const order = await Order.findOne({ packagesId: packagesId });
    if (!packages) {
      return res.status(404).json({
        error: "packages not found",
      });
    }

    return res.status(200).json({
      packages,
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

function calculateShippingCost(fromRegion, toRegion, weight) {
  const baseShippingCost = 10000;
  const distanceTable = {
    "Miền Bắc": {
      "Miền Bắc": 0,
      "Miền Trung": 500,
      "Miền Nam": 1200,
    },
    "Miền Trung": {
      "Miền Bắc": 500,
      "Miền Trung": 0,
      "Miền Nam": 800,
    },
    "Miền Nam": {
      "Miền Bắc": 1200,
      "Miền Trung": 800,
      "Miền Nam": 0,
    },
  };

  const distance =
    distanceTable[fromRegion] && distanceTable[fromRegion][toRegion]
      ? distanceTable[fromRegion][toRegion]
      : 0;

  const calculateDistanceFactor = (distance) => {
    if (distance < 100) {
      return 1;
    } else if (distance >= 100 && distance < 500) {
      return 2;
    } else {
      return 3;
    }
  };

  const distanceFactor = calculateDistanceFactor(distance);

  let weightFactor;
  if (weight < 5) {
    weightFactor = 1.5;
  } else if (weight >= 5 && weight < 10) {
    weightFactor = 2;
  } else {
    weightFactor = 3;
  }

  const shippingCost = Number(baseShippingCost * distanceFactor * weightFactor);
  const additionalFee = weight * 5000; // Phụ phí: 5000 VND cho mỗi kg
  const vatRate = 0.1; // VAT: 10%
  const vat = (shippingCost + additionalFee) * vatRate;

  const totalCost = shippingCost + additionalFee + vat;

  return {
    shippingCost: shippingCost,
    additionalFee: additionalFee,
    vat: vat,
    totalCost: totalCost,
  };
}

exports.createNewpackages = asyncErrorHandler(async (req, res) => {
  const packages = req.body;
  try {
    const now = new Date().toLocaleString();
    packages.startLocation = extractLocation(packages.sender.senderAdd);
    packages.endLocation = extractLocation(packages.receiver.receiverAdd);

    const toWarehouse = await getWHfromLocation(packages.endLocation);
    const fromWarehouse = await getWHfromLocation(packages.startLocation);

    const newpackages = Object.assign(packages, {
      packagesId: generatePackagesId(),
      packagesStatus: "Đang xử lý",
      startLocation: packages.startLocation,
      endLocation: packages.endLocation,
      sender: packages.sender,
      receiver: packages.receiver,
      createdDate: now,
      cost: calculateShippingCost(
        fromWarehouse,
        toWarehouse,
        packages.package.productWeight
      ),
    });

    const package = await Packages.create(newpackages);
    await orderController.createNewOrderWithPackage(package);

    return res.status(201).json({
      message: "Tạo hàng gửi thành công",
      package,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

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

exports.getPackagesByCurrentPoint = async (req, res) => {
  const { currentPoint } = req.params;

  try {
    const packages = await Order.find({
      currentPoint: currentPoint,
    });

    const packagesIds = packages.map((pkg) => pkg.packagesId);

    res.status(200).json({
      success: true,
      length: packages.length,
      message: `Các đơn hàng từ '${currentPoint}': `,
      data: packagesIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo vị trí",
      error: error.message,
    });
  }
};

exports.getPackagesByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    const packagesAtLocation = await Packages.find({
      startLocation: location,
    });

    res.status(200).json({
      status: "Success",
      length: packagesAtLocation.length,
      data: {
        packages: packagesAtLocation,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng tại vị trí",
      error: error.message,
    });
  }
};

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

    packageToUpdate.packagesStatus = newStatus;
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

exports.getPackages_SLocation = async function getPackages_SLocation(req, res) {
  const { startLocation } = req.body;

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
