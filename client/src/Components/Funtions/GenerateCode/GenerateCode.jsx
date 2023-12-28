const { customAlphabet } = require("nanoid");

const GenerateCode = () => {
  const numericId = customAlphabet("1234567890", 6); // Tạo mã ngẫu nhiên chỉ bao gồm các chữ số
  const fixedLengthId = `DH${numericId()}`; // Định dạng chuỗi kết quả
  return fixedLengthId;
};

export default GenerateCode;
