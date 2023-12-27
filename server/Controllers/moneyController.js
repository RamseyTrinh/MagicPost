const distanceTable = {
  Bac: {
    Bac: 0,
    Trung: 500,
    Nam: 1200,
  },
  Trung: {
    Bac: 500,
    Trung: 0,
    Nam: 800,
  },
  Nam: {
    Bac: 1200,
    Trung: 800,
    Nam: 0,
  },
};
function calculateDistanceFactor(distance) {
  // Tùy thuộc vào yêu cầu cụ thể, bạn có thể cần điều chỉnh quy ước này
  if (distance === 0) {
    return 1.0; // Cùng miền, giả sử giá trị mặc định
  } else if (distance === 500) {
    return 1.2; // Tương đối xa
  } else if (distance === 800) {
    return 1.5; // Rất xa
  } else if (distance === 1200) {
    return 2.0; // Cực kỳ xa
  } else {
    return 1.0; // Giả định mặc định nếu không tìm thấy khoảng cách
  }
}
function calculateShippingCost(fromRegion, toRegion, weight) {
  const baseShippingCost = 10000;
  const distance =
    distanceTable[fromRegion] && distanceTable[fromRegion][toRegion]
      ? distanceTable[fromRegion][toRegion]
      : 0;

  const distanceFactor = calculateDistanceFactor(distance);
  const weightFactor = 1.2;
  const shippingCost =
    baseShippingCost * distanceFactor * weightFactor * weight;

  return shippingCost;
}

exports.calculateMoney = (req, res) => {
  const { fromProvince, toProvince, weight } = req.body;

  // Giả lập tính giá vận chuyển
  const shippingCost = calculateShippingCost(fromProvince, toProvince, weight);

  res.json({
    success: true,
    shippingCost: shippingCost,
  });
};
