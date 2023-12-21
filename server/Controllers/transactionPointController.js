const TransactionPoint = require("../Models/transactionPointModel");

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
exports.gettransactionPoint = async (req, res) => {
  try {
    const transactionPoint = await TransactionPoint.findById();
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
