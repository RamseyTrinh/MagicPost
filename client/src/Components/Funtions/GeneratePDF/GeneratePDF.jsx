import React from "react";
import { useEffect, useState } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import times from "../../../Assets/Fonts/times.ttf";
import timesItalic from "../../../Assets/Fonts/times-italic.ttf";
import timesBold from "../../../Assets/Fonts/times-bold.ttf";
import Button from "@mui/material/Button";

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

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  section: { textAlign: "center" },
  label: { fontWeight: "bold", fontSize: 12, marginLeft: 2 },
  content: { fontSize: 10, marginLeft: 5, marginTop: 5 },
  helperText: { fontSize: 8, marginLeft: 10, marginTop: 3 },
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
    width: 140,
    height: 90,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
});

const PDFrender = (pkgId) => {
  const [rows, setRows] = useState([]);

  console.log(pkgId);

  const fetchData = () => {
    fetch(`http://localhost:3005/api/v1/packages/${pkgId}`)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log(data);
        setRows(data);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const Doc = () => (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <View
            style={{
              width: 150,
              height: 50,
              textAlign: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>MAGICPOST</Text>
            <Text style={{ fontSize: 6, marginTop: 1 }}>Hotline: 19006868</Text>
          </View>
          <View style={{ width: 190, textAlign: "center" }}>
            <Text>PHIẾU BƯU GỬI</Text>
          </View>
          <View style={{ width: 200, height: 50, textAlign: "center" }}>
            <Text>QR</Text>
          </View>
        </View>

        <View style={{}}>
          <View style={{}}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={{ width: 300, height: 70, borderWidth: 1 }}>
                  <Text style={styles.label}>1. Người gửi</Text>
                  <Text style={styles.content}>Họ và tên: {}</Text>
                  <Text style={styles.content}>Địa chỉ: {}</Text>
                  <Text style={styles.content}>Số điện thoại: {}</Text>
                </View>
                <View
                  style={{
                    width: 300,
                    height: 70,
                    borderWidth: 1,
                    borderTopWidth: 0,
                  }}
                >
                  <Text style={styles.label}>2. Người nhận</Text>
                  <Text style={styles.content}>Họ và tên: {}</Text>
                  <Text style={styles.content}>Địa chỉ: {}</Text>
                  <Text style={styles.content}>Số điện thoại: {}</Text>
                </View>
              </View>
              <View
                style={{
                  width: 240,
                  height: 140,
                  borderWidth: 1,
                  borderLeftWidth: 0,
                }}
              >
                <Text style={styles.label}>3. Bưu gửi</Text>
                <Text style={styles.content}>Tên bưu gửi: {}</Text>
                <Text style={styles.content}>Loại bưu gửi: {}</Text>
                <Text style={styles.content}>
                  Khối lượng {"      (kg)"}: {}
                </Text>
                <Text style={styles.content}>Tính chất: {}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>4. Cước phí</Text>
                <Text style={styles.content}>Cước chính: {}</Text>
                <Text style={styles.content}>Phụ phí: {}</Text>
                <Text style={styles.content}>VAT: {}</Text>
                <Text style={styles.content}>Tổng thu: {}</Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>5. Thu người nhận</Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>6. Chứng nhận </Text>
                <Text style={styles.label}>7. Ngày giờ gửi </Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.label}>8. Ghi chú</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={styles.contentBottomRow}>
                  <Text style={styles.label}>9. Chữ ký người gửi</Text>
                  <Text style={styles.helperText}>{"(Ký, ghi rõ họ tên)"}</Text>
                </View>
                <View style={styles.contentBottomRow}>
                  <Text style={styles.label}>10. Chữ ký người nhận</Text>
                  <Text style={styles.helperText}>
                    {"(...h... .../.../20...)"}
                  </Text>
                  <Text style={styles.helperText}>{"(Ký, ghi rõ họ tên)"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <PDFDownloadLink document={<Doc />} fileName={`${null}.pdf`}>
      <Button
        variant="contained"
        fullWidth
        style={{ fontWeight: "bold", background: "#14507a" }}
      >
        IN giấy biên nhận
      </Button>
    </PDFDownloadLink>
  );
};

export default PDFrender;
