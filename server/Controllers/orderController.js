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

async function transactionToWarehouse(req, res) {
  const { packagesId } = req.params;

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

async function warehouseToWarehouse(req, res) {
  const { packagesId } = req.params;

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

async function warehouseToTransaction(req, res) {
  const { packagesId } = req.params;

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

async function transportingPackages(req, res) {
  const { packagesId } = req.params;

  try {
    const order = await Order.findOne({ packagesId: packagesId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const newCurrentPoint = "Đang vận chuyển";
    const now = new Date().toLocaleString();
    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          orderStatus: "Đang vận chuyển",
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
  transactionToWarehouse,
  warehouseToWarehouse,
  warehouseToTransaction,
  orderSuccess,
  getRouteByPackagesId,
  getpackagesSuccess,
  getpackagesFail,
  transportingPackages,
};
