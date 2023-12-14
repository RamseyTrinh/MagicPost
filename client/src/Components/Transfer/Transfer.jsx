import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Gather from "./Gather.jsx";
import Shipper from "./Shipper.jsx";
import "../../Assets/Styles/Gather/Gather.css";

import React, { useState } from "react";

export default function Transfer() {
  const match = useMediaQuery("(max-width:800px)");
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
        <Stack
          spacing={2}
          sx={{ mt: -1, mb: 7, width: "70%", justifyContent: "center" }}
          direction={`${match ? "column" : "row"}`}
        >
          <Button
            variant="contained"
            id="GatherButton"
            onClick={handleClickLeft}
          >
            ĐIỂM TẬP KẾT
          </Button>
          {match ? (
            <Divider />
          ) : (
            <div style={{ border: "1px solid black" }}></div>
          )}
          <Button
            variant="contained"
            id="GatherButton"
            onClick={handleClickRight}
          >
            NGƯỜI NHẬN
          </Button>
        </Stack>
        {select === 1 ? <Gather /> : ""}
        {select === 2 ? <Shipper /> : ""}
      </div>
    </div>
  );
}
