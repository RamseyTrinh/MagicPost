// import Stack from "@mui/material/Stack";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
import Gather from "./Gather.tsx";
import Shipper from "./Shipper.tsx";
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
          label1={"ĐIỂM TẬP KẾT"}
          label2={"NGƯỜI NHẬN"}
          function1={handleClickLeft}
          function2={handleClickRight}
        />
        {select === 1 ? <Gather /> : ""}
        {select === 2 ? <Shipper /> : ""}
      </div>
    </div>
  );
}
