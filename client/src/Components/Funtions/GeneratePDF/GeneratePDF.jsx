import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "tomato",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  section: { textAlign: "center", margin: 20 },
});

const MyDocument = () => (
  <Document>
    <Page size="A5" orientation="landscape" style={styles.page}>
      <View style={{ marginTop: 30 }}>
        <View style={{ width: 540, height: 320, borderWidth: 1 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ width: 200, height: 70, borderWidth: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  1. Người gửi
                </Text>
                <Text style={{}}>Họ và tên: {}</Text>
                <Text style={{ marginTop: 3, fontSize: 10 }}>Địa chỉ: {}</Text>
                <Text style={{ marginTop: 7, fontSize: 10 }}>
                  Số điện thoại: {}
                </Text>
              </View>
              <View style={{ width: 200, height: 70, borderWidth: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  2. Người nhận
                </Text>
                <Text style={{}}>Họ và tên: {}</Text>
                <Text style={{ marginTop: 3, fontSize: 10 }}>Địa chỉ: {}</Text>
                <Text style={{ marginTop: 7, fontSize: 10 }}>
                  Số điện thoại: {}
                </Text>
              </View>
            </View>
            <View style={{ width: 340, height: 140, borderWidth: 1 }}></View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: 100, height: 140, borderWidth: 1 }}></View>
            <View style={{ width: 100, height: 140, borderWidth: 1 }}></View>
            <View style={{ width: 100, height: 140, borderWidth: 1 }}></View>
            <View style={{ width: 100, height: 140, borderWidth: 1 }}></View>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ width: 140, height: 70, borderWidth: 1 }}></View>
              <View style={{ width: 140, height: 70, borderWidth: 1 }}></View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
