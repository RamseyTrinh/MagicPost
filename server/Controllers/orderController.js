const Order = require("../Models/orderModel");

const { generateOrderId } = require("../Service/uuid");

async function getAllOrders(startLoc, endLoc, type, status, searchTerm) {
  const startRegex = new RegExp(startLoc, "i");
  const endRegex = new RegExp(endLoc, "i");
  const termRegex = new RegExp(searchTerm, "i");
  const typeRegex = new RegExp(type, "i");
  const statusRegex = new RegExp(status, "i");
  return await Order.find({
    startLocation: startRegex,
    endLocation: endRegex,
    goodsType: typeRegex,
    orderStatus: statusRegex,
    orderId: termRegex,
  }).select(
    "orderId -_id orderStatus startLocation endLocation goodsType createdDate"
  );
}

async function getOrderById(orderId) {
  return await Order.findOne({ orderId: orderId });
}

async function getOrderCountWithStatus(statuses, location, start) {
  const locRegex = new RegExp(location, "i");
  if (start) {
    return await Order.countDocuments({
      startLocation: locRegex,
      orderStatus: { $in: statuses },
    });
  } else {
    return await Order.countDocuments({
      endLocation: locRegex,
      orderStatus: { $in: statuses },
    });
  }
}

async function getOrderCountWithType(type, location) {
  const locRegex = new RegExp(location, "i");
  return await Order.countDocuments({
    startLocation: locRegex,
    goodsType: type,
  });
}

async function getLatestOrders(location) {
  const locRegex = new RegExp(location, "i");
  return await Order.find({ startLocation: locRegex })
    .sort({ createdDate: -1 })
    .limit(6);
}

async function getOrderCountByMonths(location) {
  const locRegex = new RegExp(location, "i");
  return await Order.aggregate([
    {
      $match: {
        startLocation: locRegex,
      },
    },
    {
      $group: {
        _id: { $month: { $toDate: "$createdDate" } },
        count: { $sum: 1 },
      },
    },
  ]);
}

async function changeOrderStatusById(orderId, newStatus) {
  const order = await getOrderById(orderId);
  if (!order) {
    return null;
  }
  order.orderStatus = newStatus;
  order.save();
  return order;
}

async function saveOrder(order) {
  await Order.create(order);
}

async function createNewOrder(order) {
  const now = new Date().toLocaleString();

  const newOrder = Object.assign(order, {
    orderId: generateOrderId(),
    orderStatus: "processing",
    startLocation: order.startLocation,
    endLocation: order.endLocation,
    senderInfo: order.senderInfo,
    recipientInfo: order.recipientInfo,
    cost: order.costInfo,
    weight: order.weightInfo,
    createdDate: now,
  });
  await saveOrder(newOrder);

  return newOrder;
}

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderCountWithStatus,
  getOrderCountWithType,
  getOrderCountByMonths,
  getLatestOrders,
  changeOrderStatusById,
  createNewOrder,
};
