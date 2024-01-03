import Navigator from "../../../Funtions/Navigator/Navigator.jsx";
import TransactionAdmin from "./CreatePointAdmin/TransactionAdmin.tsx";
import GatherAdmin from "./CreatePointAdmin/GatherAdmin.tsx";
import React, { useState } from "react";

export default function CreatePointAdmin() {
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
          label1={"Trưởng điểm giao dịch"}
          label2={"Trưởng điểm tập kết"}
          function1={handleClickLeft}
          function2={handleClickRight}
        />
        {select === 1 ? <TransactionAdmin /> : ""}
        {select === 2 ? <GatherAdmin /> : ""}
      </div>
    </div>
  );
}
