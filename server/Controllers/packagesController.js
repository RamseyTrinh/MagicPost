const Packages = require("../Models/packagesModel");
const Apifeatures = require("../Utils/ApiFeatures");
const AppError = require("./../Utils/appError");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");

exports.getAllPackages = asyncErrorHandler(async (req, res, next) => {
  try {
    //const packages = await Packages.find();
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
exports.getPackages = asyncErrorHandler(async (req, res, next) => {
  //const packages = await Packages.find({ _id: req.params.id });
  try {
    console.log(req.params.ID);
    const packages = await Packages.findById(req.params.ID);

    res.status(200).json({
      status: "Success",
      length: packages.length,
      data: {
        data: packages,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Không có bản ghi nào được tìm thấy",
    });
  }
});
exports.createPackages = asyncErrorHandler(async (req, res, next) => {
  try {
    const packages = await Packages.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        packages,
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
  const package = await Packages.findByIdAndDelete(req.params.ID);
  if (!package) {
    return next(new AppError("Không có bản ghi nào được tìm thấy", 404));
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

exports.updatePackage = asyncErrorHandler(async (req, res, next) => {
  const package = await Model.findByIdAndUpdate(req.params.ID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!package) {
    return next(new AppError("Không có bản ghi nào được tìm thấy", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
