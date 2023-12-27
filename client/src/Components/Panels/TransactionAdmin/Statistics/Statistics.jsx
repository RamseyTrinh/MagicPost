import PackageStatistics from "./PackageStatistics.jsx";
import StaffStatistics from "./StaffStatistics.jsx";
import Navigator from "../../../Funtions/Navigator/Navigator.jsx";
import "../../../../Assets/Styles/Gather/Gather.css";

import React, { useState } from "react";

export default function Transfer() {
  const [select, setSelect] = useState(0);

  function handleClickLeft() {
    setSelect(1);
  }
  function handleClickRight() {
    setSelect(2);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Navigator
          type={2}
          label1={"HÀNG HÓA"}
          label2={"NHÂN VIÊN"}
          function1={handleClickLeft}
          function2={handleClickRight}
          sx={{}}
        />
        {select === 1 ? <PackageStatistics /> : ""}
        {select === 2 ? <StaffStatistics /> : ""}
      </div>
    </div>
  );
}
