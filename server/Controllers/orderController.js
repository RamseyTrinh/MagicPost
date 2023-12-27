const Order = require("../Models/orderModel");
const { getWHfromLocation } = require("./transactionPointController");

// Tạo order khi package được tạo
exports.createNewOrderWithPackage = async function createNewOrderWithPackage(
  packages
) {
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
          pointId: packages.startLocation,
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
