import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

export default function SelectTransaction({ refs }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Điểm giao dịch</InputLabel>
      <Select
        defaultValue=""
        id="demo-simple-select"
        label="Điểm giao dịch"
        {...refs}
      >
        <MenuItem value={"GD01MB"}>Điểm giao dịch - Miền Bắc</MenuItem>
        <MenuItem value={"GD02MT"}>Điểm giao dịch - Miền Trung</MenuItem>
        <MenuItem value={"GD03MN"}>Điểm giao dịch - Miền Nam</MenuItem>
      </Select>
    </FormControl>
  );
}
