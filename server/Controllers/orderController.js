const Order = require("../Models/orderModel");
const { route } = require("../app");
const { getWHfromLocation } = require("./transactionPointController");

// Tạo order khi package được tạo
async function createNewOrderWithPackage(packages) {
  
  console.log(packages.endLocation);
  const toWarehouse = await getWHfromLocation(packages.endLocation);
  const fromWarehouse = await getWHfromLocation(packages.startLocation);
  console.log(toWarehouse, fromWarehouse);
  try {
    const now = new Date().toLocaleString();
    const newOrderData = {
      packagesId: packages.packagesId,
      fromtransactionPoint: packages.startLocation,
      totransactionPoint: packages.endLocation,
      toWarehouse,
      fromWarehouse,
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
};

// // Sử dụng hàm để chuyển đơn hàng đến điểm tập kết tiếp theo
// async function moveOrderToNextPoint(orderId, nextTransactionPointId) {
//   try {
//     const order = await Order.findOne({ orderId });

//     if (!order) {
//       console.log("Không tìm thấy đơn hàng với ID:", orderId);
//     } else {
//       order.route.push({
//         transactionPointId: nextTransactionPointId,
//       });

//       await order.save();
//       console.log("Đã chuyển đơn hàng đến điểm tập kết tiếp theo!");
//     }
//   } catch (error) {
//     console.error("Lỗi khi chuyển đơn hàng:", error.message);
//   }
// }

// Tìm packages có trong điểm hiện tại
async function getPackagesIdByCurrentPoint(req, res) {
  const { currentPoint } = req.params;
  
  try {
    const order = await Order.find({ currentPoint: currentPoint });
    const packagesIds = order.map(order => order.packagesId);
    console.log(packagesIds);
    res.status(200).json({
      success: true,
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

//chuyển từ điểm giao dịch bên gửi sang điểm tập kết bên gửi sau khi ấn xác nhận

async function  transactionToWarehouse (req, res) {
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

// Chuyển từ điển tập kết bên nhận sang điểm tập kết bên gửi sau khi ấn xác nhận

async function  warehouseToWarehouse (req, res) {
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

//chuyển packages từ điểm tập kết bên nhận về điểm giao dịch bên nhận

async function warehouseToTransaction (req, res) {
  const { packagesId } = req.params;
  

  try {
    const order = await Order.findOne({ packagesId: packagesId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const newCurrentPoint = order.fromtransactionPoint;
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

// xác nhận đơn hàng thành công 

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

    const newstatus = true;
    

    const updatedOrder = await Order.findOneAndUpdate(
      { packagesId: packagesId },
      {
        $set: {
          
          done: newstatus,
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
    const packagesIds = order.map(order => order.route);
    console.log(packagesIds);
    res.status(200).json({
      success: true,
      message: `Các đơn hàng từ '${route}': `,
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


module.exports = {
  createNewOrderWithPackage,
  getPackagesIdByCurrentPoint,
  transactionToWarehouse,
  warehouseToWarehouse,
  warehouseToTransaction,
  orderSuccess,
  getRouteByPackagesId,
};