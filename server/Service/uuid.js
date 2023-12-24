const { v4: uuidv4 } = require("uuid");

function generateOrderId() {
  // Generate a UUID
  const uuid = uuidv4();

  // Convert the UUID to a hexadecimal string
  const hexString = uuid.replace(/-/g, "");

  // Take the first 9 characters from the hexadecimal string
  const shortHexString = hexString.substring(0, 9);

  // Convert the hexadecimal string to a decimal number
  const orderID = parseInt(shortHexString, 16);

  return `MP${orderID.toString()}VN`; // Convert the number to a string
}

function generateTransferId() {
  const uuid = uuidv4();

  // Convert the UUID to a hexadecimal string
  const hexString = uuid.replace(/-/g, "");

  // Take the first 9 characters from the hexadecimal string
  const shortHexString = hexString.substring(0, 9);

  // Convert the hexadecimal string to a decimal number
  const transferID = parseInt(shortHexString, 16);

  return `MP${transferID.toString()}TS`; // Convert the number to a string
}

module.exports = {
  generateOrderId,
  generateTransferId,
};
