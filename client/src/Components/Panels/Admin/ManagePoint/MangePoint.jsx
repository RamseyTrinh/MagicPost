import ListPoint from "./ListPoint.jsx";
import CreatePoint from "./CreatePoint.tsx";
import Divider from "@mui/material/Divider";
import React from "react";

export default function ManagePoint() {
  return (
    <>
      <CreatePoint />
      <Divider sx={{ mb: 6 }} variant="middle" />
      <ListPoint />
    </>
  );
}
