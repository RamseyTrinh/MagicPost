const Order = require("../Models/orderModel");
const Packages = require("../Models/packagesModel");
const { route } = require("../app");
const { getWHfromLocation } = require("./transactionPointController");

// Tạo order khi package được tạo
async function createNewOrderWithPackage(packages) {
  const toWarehouse = await getWHfromLocation(packages.endLocation);
  const fromWarehouse = await getWHfromLocation(packages.startLocation);
  try {
    const now = new Date().toLocaleString();
    const newOrderData = {
      packagesId: packages.packagesId,
      fromtransactionPoint: packages.startLocation,
      totransactionPoint: packages.endLocation,
      toWarehouse,
      fromWarehouse,
      orderStatus: "Đang xử lý",
      currentPoint: packages.startLocation,
      route: [
        {
          pointName: packages.startLocation,
          timestamp: now,
        },
      ],
      done: false,
    };

    const order = await Order.create(newOrderData);
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Tìm packages có trong điểm hiện tại
async function getPackagesIdByCurrentPoint(req, res) {
  const { currentPoint } = req.params;

  try {
    const order = await Order.find({ currentPoint: currentPoint });
    const packagesIds = order.map((order) => order.packagesId);
    res.status(200).json({
      success: true,
      message: "Các đơn hàng từ `${currentPoint}`:",
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
}

async function getPackagesIdSendByTransactionPointSend(req, res) {
  const { TransactionPoint } = req.params;

  try {
    const order = await Order.find({
      currentPoint: TransactionPoint,
      fromtransactionPoint: TransactionPoint,
    });
    const packagesIds = order.map((order) => order.packagesId);
    console.log(packagesIds);
    res.status(200).json({
      success: true,
      message: "Các đơn hàng từ `${currentPoint}`:",
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
}

async function getPackagesIdSendByWarehouseSend(req, res) {
  const { warehouse } = req.params;

  try {
    const order = await Order.find({
      currentPoint: warehouse,
      fromWarehouse: warehouse,
    });
    const packagesIds = order.map((order) => order.packagesId);

    res.status(200).json({
      success: true,
      message: "Các đơn hàng từ:",
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
}

async function getPackagesIdSendByWarehouseReceive(req, res) {
  const { warehouse } = req.params;

  try {
    const order = await Order.find({
      currentPoint: warehouse,
      toWarehouse: warehouse,
    });
    const packagesIds = order.map((order) => order.packagesId);
    const toTransaction = order.map((order) => order.totransactionPoint);

    res.status(200).json({
      success: true,
      message: "Các đơn hàng từ `${currentPoint}`:",
      data: { packagesIds, toTransaction },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo vị trí",
      error: error.message,
    });
  }
}

// đơn hàng từ giao dịch 2 đến người nhận
async function getPackagesIdSendByTransactionPointReceive(req, res) {
  const { transactionLocation } = req.params;
  console.log(transactionLocation);
  try {
    const order = await Order.find({
      currentPoint: transactionLocation,
      totransactionPoint: transactionLocation,
    });
    const packagesIds = order.map((order) => order.packagesId);

    const packagesWithOrders = await Packages.find({
      packagesId: { $in: packagesIds },
    });

    res.status(200).json({
      packagesWithOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo vị trí",
      error: error.message,
    });
  }
}

//đơn hàng cần xác nhận đến điểm tập kết 1
async function getPackagesIdRequireWarehouseSend(req, res) {
  const { warehouseLocation } = req.params;

  try {
    const order = await Order.find({
      fromWarehouse: warehouseLocation,
      orderStatus: "Đang vận chuyển",
      $expr: {
        $eq: ["$currentPoint", "$fromtransactionPoint"],
      },
    });
    console.log(order);
    const packagesIds = order.map((order) => order.packagesId);

    res.status(200).json({
      success: true,
      message: "Các đơn hàng từ `${currentPoint}`:",
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
}

// đơn hàng cần xác nhận đến điểm tập kết 2
async function getPackagesIdRequireWarehouseReceive(req, res) {
  const { warehouseLocation } = req.params;

  try {
    const order = await Order.find({
      toWarehouse: warehouseLocation,
      orderStatus: "Đang vận chuyển",
      $expr: {
        $eq: ["$currentPoint", "$fromWarehouse"],
      },
    });
    const packagesIds = order.map((order) => order.packagesId);

    res.status(200).json({
      success: true,
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
}

// dơn hàng đang chờ xác nhận đến điểm giao dịch 2
async function getPackagesIdRequireTransactionReceive(req, res) {
  const { transactionLocation } = req.params;

  try {
    const order = await Order.find({
      totransactionPoint: transactionLocation,
      orderStatus: "Đang vận chuyển",
      $expr: {
        $eq: ["$currentPoint", "$toWarehouse"],
      },
    });
    const packagesIds = order.map((order) => order.packagesId);

    res.status(200).json({
      success: true,
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
}

// đơn hàng được xác nhận chuyển từ điểm giao dịch 1 sang điểm tập kết 1
async function transactionToWarehouse(req, res) {
  const { packagesId } = req.body;

  try {
    const order = await Order.findOne({ packagesId: packagesId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const newCurrentPoint = order.fromWarehouse;
    const now = new Date().toLocaleString();
    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          currentPoint: newCurrentPoint,
          orderStatus: "Đang vận chuyển",
        },
        $push: {
          route: {
            pointName: newCurrentPoint,
            timestamp: now,
          },
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật đơn hàng",
      error: error.message,
    });
  }
}
//đơn hàng đã được xác nhận từ điển tập kết 1 đến điển tập kết 2
async function warehouseToWarehouse(req, res) {
  const { packagesId } = req.body;

  try {
    const order = await Order.findOne({ packagesId: packagesId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const newCurrentPoint = order.toWarehouse;
    const now = new Date().toLocaleString();
    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          currentPoint: newCurrentPoint,
        },
        $push: {
          route: {
            pointName: newCurrentPoint,
            timestamp: now,
          },
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật đơn hàng",
      error: error.message,
    });
  }
}
// đơn hàng đã được xác nhận chuyển từ điểm tập kết 2 đến điểm giao dịch 1
async function warehouseToTransaction(req, res) {
  const { packagesId } = req.body;

  try {
    const order = await Order.findOne({ packagesId: packagesId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const newCurrentPoint = order.totransactionPoint;
    const now = new Date().toLocaleString();
    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          currentPoint: newCurrentPoint,
          orderStatus: "Đang xử lý",
        },
        $push: {
          route: {
            pointName: newCurrentPoint,
            timestamp: now,
          },
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật đơn hàng",
      error: error.message,
    });
  }
}

async function orderSuccess(req, res) {
  const { packagesId } = req.params;

  try {
    const order = await Order.findOne({ packagesId: packagesId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          done: true,
          orderStatus: "Đã thành công",
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật đơn hàng",
      error: error.message,
    });
  }
}

// lấy trạng thái của đơn hàng theo packagesId
async function getRouteByPackagesId(req, res) {
  const { packagesId } = req.params;

  try {
    const order = await Order.find({ packagesId: packagesId });
    const packagesIds = order.map((order) => order.route);
    console.log(packagesIds);
    if (packagesIds.length === 0) {
      res.status(404).json({
        success: false,
        message: `Không tìm thấy đơn hàng với packagesId '${packagesId}'.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Đường đi của đơn hàng",
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
}

// đơn hàng đã được xác nhận rời khỏi điểm
async function transportingPackages(req, res) {
  const { packagesId } = req.body;

  try {
    const order = await Order.findOne({ packagesId: packagesId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const now = new Date().toLocaleString();
    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          orderStatus: "Đang vận chuyển",
          //currentPoint: newCurrentPoint,
        },
        $push: {
          route: {
            pointName: "Đang vận chuyển",
            timestamp: now,
          },
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi cập nhật đơn hàng",
      error: error.message,
    });
  }
}

async function getpackagesSuccess(req, res) {
  try {
    const ordersWithDoneTrue = await Order.find({ done: true });

    const packagesIds = ordersWithDoneTrue.map((order) => order.packagesId);

    const packagesWithDoneOrders = await Packages.find({
      packagesId: { $in: packagesIds },
    });

    res.status(200).json({
      success: true,
      message: "Đường đi của đơn hàng",
      data: packagesWithDoneOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo vị trí",
      error: error.message,
    });
  }
}

async function getpackagesFail(req, res) {
  try {
    const ordersWithDoneTrue = await Order.find({ done: false });

    const packagesIds = ordersWithDoneTrue.map((order) => order.packagesId);

    const packagesWithDoneOrders = await Packages.find({
      packagesId: { $in: packagesIds },
    });

    res.status(200).json({
      success: true,
      message: "Đường đi của đơn hàng",
      data: packagesWithDoneOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi truy vấn đơn hàng theo vị trí",
      error: error.message,
    });
  }
}

module.exports = {
  createNewOrderWithPackage,
  getPackagesIdByCurrentPoint,
  getPackagesIdSendByTransactionPointSend,
  getPackagesIdSendByWarehouseSend,
  getPackagesIdSendByWarehouseReceive,
  getPackagesIdSendByTransactionPointReceive,
  getPackagesIdRequireWarehouseSend,
  getPackagesIdRequireWarehouseReceive,
  getPackagesIdRequireTransactionReceive,
  transactionToWarehouse,
  warehouseToWarehouse,
  warehouseToTransaction,
  orderSuccess,
  getRouteByPackagesId,
  getpackagesSuccess,
  getpackagesFail,
  transportingPackages,
};
