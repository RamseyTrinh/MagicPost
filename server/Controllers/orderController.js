const Order = require("../Models/orderModel");
const { getPackagesById } = require("./packagesController");
const { randomBytes } = require("crypto");
const { getWarehouseByTransactionPoint } = require("./transactionPointController");

//test
// async function transferOrderToWarehouse(orderId) {
//   try {
//     // Lấy thông tin đơn hàng, bao gồm cả thông tin về điểm đi và điểm đến
//     const order = await Order.findOne({ orderId })
//       .populate("startLocation")
//       .populate("endLocation");

//     // Kiểm tra xem đơn hàng có tồn tại không
//     if (!order) {
//       return {
//         success: false,
//         message: "Đơn hàng không tồn tại",
//       };
//     }

//     // Lấy thông tin điểm giao dịch từ điểm đi
//     const transactionPoint = order.startLocation;

//     // Kiểm tra xem điểm giao dịch có tồn tại không
//     if (!transactionPoint) {
//       return {
//         success: false,
//         message: "Điểm giao dịch không tồn tại",
//       };
//     }

//     // Lấy thông tin điểm tập kết từ điểm đến
//     const warehouse = order.endLocation;

//     // Kiểm tra xem điểm tập kết có tồn tại không
//     if (!warehouse) {
//       return {
//         success: false,
//         message: "Điểm tập kết không tồn tại",
//       };
//     }

//     // Cập nhật trạng thái đơn hàng và địa điểm mới
//     order.orderStatus = "Đang vận chuyển";
//     order.startLocation = warehouse;
//     order.endLocation = warehouse;
//     await order.save();
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: "Có lỗi xảy ra",
//     };
//   }
// }

// async function http_TransferOrder(req, res) {
//   const { orderId } = req.params;

//   try {
//     const result = await transferOrderToWarehouse(orderId);

//     if (result.success) {
//       return res.status(200).json({ message: result.message });
//     } else {
//       return res.status(404).json({ error: result.message });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Có lỗi xảy ra" });
//   }
// }

//.......................................... test

async function checkMatchedOrder(fromLoc, toLoc, orderId) {
  return await Order.findOne({
    fromLocation: fromLoc,
    toLocation: toLoc,
    orderId: orderId,
  });
}
// Tạo order khi package được tạo
async function createNewOrderWithPackage(packages) {
  const toWarehouse = getWarehouseByTransactionPoint(packages.endLocation);
  const fromWarehouse = getWarehouseByTransactionPoint(packages.startLocation);
  try {
  const newOrderData = {
   
    packagesId: packages.packagesId,
    fromtransactionPoint: packages.startLocation, // Assuming fromLocation is the transaction point
    totransactionPoint: packages.endLocation,     // Assuming toLocation is the transaction point
    // toWareHouse: {toWarehouse},    // Assuming endLocation is the warehouse
    // fromWareHouse: {fromWarehouse}, // Assuming startLocation is the warehouse
    currentPoint: packages.startLocation,
    route: [
      {
        pointId: packages.startLocation, // You need to replace this with the actual point ID
        timestamp: packages.createdDate,
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

async function createNewOrder(order) {
  const now = new Date().toLocaleString();

  const newOrder = Object.assign(order, {
    orderId: order.orderId,
    fromLocation: order.fromLocation,
    toLocation: order.toLocation,
    orderDate: now,
    done: false,
  });
  await Order.create(newOrder);
}

async function http_addNewOrder(req, res) {
  const order = req.body;
  const packages = await getPackagesById(order.orderId);

  if (!packages) {
    return res.status(400).json({
      error: "Đơn hàng không tồn tại",
    });
  }

  const matchedOrder = await checkMatchedOrder(
    order.fromLocation,
    order.toLocation,
    order.orderId
  );

  console.log(matchedOrder);
  if (matchedOrder) {
    return res.status(400).json({
      error: "Order matched",
    });
  }

  try {
    await createNewOrder(order);
    if (order.orderStatus === "Đang xử lý") {
      await changeOrderStatusById(order.orderId, "Đang vận chuyển");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
    });
  }

  return res.status(201).json(order);
}

async function httpFinishTransferById(req, res) {
  const transferId = req.params.id;

  const transfer = await getTransferById(transferId);
  if (!transfer) {
    return res.status(400).json({
      error: "Transfer not found",
    });
  }

  const requestingUser = await getUserById(req.uid);
  if (transfer.toLocation !== requestingUser.location) {
    return res.status(400).json({
      error: "Package not available at your location",
    });
  }

  const confirmedTransfer = await finishTransferById(transferId);

  return res.status(200).json(confirmedTransfer);
}

// Sử dụng hàm để chuyển đơn hàng đến điểm tập kết tiếp theo
async function moveOrderToNextPoint(orderId, nextTransactionPointId) {
  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      console.log("Không tìm thấy đơn hàng với ID:", orderId);
    } else {
      order.route.push({
        transactionPointId: nextTransactionPointId,
      });

      await order.save();
      console.log("Đã chuyển đơn hàng đến điểm tập kết tiếp theo!");
    }
  } catch (error) {
    console.error("Lỗi khi chuyển đơn hàng:", error.message);
  }
}

module.exports = {
  createNewOrderWithPackage,
  // transferOrderToWarehouse,
};
