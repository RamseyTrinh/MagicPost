import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

import times from "../../../Assets/Fonts/times.ttf";
import timesItalic from "../../../Assets/Fonts/times-italic.ttf";
import timesBold from "../../../Assets/Fonts/times-bold.ttf";
import Button from "@mui/material/Button";
import italic from "../../../Assets/Fonts/italic.ttf";
import confirmIMG from "../../../Assets/Images/confirmIMG.png";

Font.register({
  family: "Times New Roman",
  src: times,
});

Font.register({
  family: "Times New Roman Bold",
  src: timesBold,
});

Font.register({
  family: "Times New Roman Italic",
  src: timesItalic,
});

Font.register({
  family: "Italic",
  src: italic,
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  section: { textAlign: "center" },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 2,
    fontFamily: "Times New Roman Bold",
  },
  content: {
    fontSize: 10,
    marginLeft: 5,
    marginTop: 5,
    fontFamily: "Times New Roman",
  },
  helperText: {
    fontSize: 8,
    marginLeft: 10,
    marginTop: 3,
    fontFamily: "Times New Roman Italic",
  },
  header: {
    width: 540,
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  contentColumn: {
    width: 100,
    height: 180,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  contentBottomRow: {
    width: 141,
    height: 90,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
});

const PDFrender = ({ rows }) => {
  console.log(rows);

  const Doc = () => (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <View
            style={{
              width: 180,
              height: 50,
              textAlign: "center",
            }}
          >
            <Text style={{ fontFamily: "Italic" }}>MAGICPOST</Text>
            <Text style={{ fontSize: 6, marginTop: 1 }}>Hotline: 19006868</Text>
          </View>
          <View
            style={{
              width: 180,
              textAlign: "center",
              fontFamily: "Times New Roman Bold",
            }}
          >
            <Text>PHIẾU BƯU GỬI</Text>
          </View>
          <View
            style={{
              width: 180,
              height: 50,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 12 }}>{rows.packagesId}</Text>
          </View>
        </View>

        <View style={{}}>
          <View style={{}}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={{ width: 401, height: 70, borderWidth: 1 }}>
                  <Text style={styles.label}>1. Người gửi</Text>
                  <Text style={styles.content}>
                    Họ và tên: {rows.sender.senderName}
                  </Text>
                  <Text style={styles.content}>
                    Địa chỉ: {rows.sender.senderAddr} {rows.sender.senderAdd}
                  </Text>
                  <Text style={styles.content}>
                    Số điện thoại: {rows.sender.senderPhone}
                  </Text>
                </View>
                <View
                  style={{
                    width: 401,
                    height: 70,
                    borderWidth: 1,
                    borderTopWidth: 0,
                  }}
                >
                  <Text style={styles.label}>2. Người nhận</Text>
                  <Text style={styles.content}>
                    Họ và tên: {rows.receiver.receiverName}
                  </Text>
                  <Text style={styles.content}>
                    Địa chỉ: {rows.receiver.receiverAddr}{" "}
                    {rows.receiver.receiverAdd}
                  </Text>
                  <Text style={styles.content}>
                    Số điện thoại: {rows.receiver.receiverPhone}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 140,
                  height: 140,
                  borderWidth: 1,
                  borderLeftWidth: 0,
                }}
              >
                <Text style={styles.label}>3. Hàng hóa</Text>
                <Text style={styles.content}>
                  Tên bưu gửi: {rows.package.productName}
                </Text>
                <Text style={styles.content}>
                  Loại bưu gửi:{" "}
                  {rows.package.productType === "document"
                    ? "Tài liệu"
                    : rows.package.productType === "parcel"
                    ? "Bưu kiện"
                    : ""}
                </Text>
                <Text style={styles.content}>
                  Khối lượng {"(kg)"}: {rows.package.productWeight}
                </Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>4. Cước phí</Text>
                <Text style={styles.content}>
                  Cước chính: {rows.cost.shippingCost}₫
                </Text>
                <Text style={styles.content}>
                  Phụ phí: {rows.cost.additionalFee}₫
                </Text>
                <Text style={styles.content}>VAT: {rows.cost.vat}₫</Text>
                <Text style={styles.content}>
                  Tổng thu: {rows.cost.totalCost}₫
                </Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>5. Thu người nhận</Text>
                <Text style={styles.content}>
                  Tổng thu:{" "}
                  {rows.payment === "sender" ? 0 : rows.cost.totalCost}₫
                </Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>6. Chứng nhận </Text>
                <Image
                  src={confirmIMG}
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: 10,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                ></Image>
                <Text style={styles.label}>7. Ngày giờ gửi </Text>
                <Text style={{ fontSize: 9, marginLeft: 3, marginTop: 5 }}>
                  {rows.createdDate}
                </Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>8. Ghi chú</Text>
                <Text style={styles.content}>{rows.note}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={styles.contentBottomRow}>
                  <Text style={styles.label}>9. Chữ ký người gửi</Text>
                  <Text style={styles.helperText}>{"(Ký, ghi rõ tên)"}</Text>
                </View>
                <View style={styles.contentBottomRow}>
                  <Text style={styles.label}>10. Chữ ký người nhận</Text>
                  <Text style={styles.helperText}>
                    {"(...h... .../.../20...)"}
                  </Text>
                  <Text style={styles.helperText}>{"(Ký, ghi rõ tên)"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <PDFDownloadLink document={<Doc />} fileName={`${rows.packagesId}.pdf`}>
      <Button>Đồng ý</Button>
    </PDFDownloadLink>
  );
};

export default PDFrender;
