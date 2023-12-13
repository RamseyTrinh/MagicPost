const Packages = require("../Models/packagesModel");

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Packages.find();
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
      message: error.message,
    });
  }
};
exports.getPackages = async (req, res) => {
  // const packages = await Packages.find({ _id: req.params.id });
  try {
    const packages = await Packages.findById();
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
      message: error.message,
    });
  }
};
exports.createPackages = async (req, res) => {
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
};
