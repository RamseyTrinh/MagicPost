import React, { memo } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import "../../../Assets/Styles/SelectAddress/SelectAddress.css";

const SelectAddress = ({
  label,
  options,
  value,
  setValue,
  type,
  reset,
  name,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={`${label}`}
        defaultValue=""
        value={reset ? "" : value}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }
      >
        {options?.map((e) => {
          return (
            <MenuItem
              key={
                type === "province"
                  ? e?.province_id
                  : type === "district"
                  ? e?.district_id
                  : type === "ward"
                  ? e?.ward_id
                  : e?.code
              }
              value={
                type === "province"
                  ? e?.province_id
                  : type === "district"
                  ? e?.district_id
                  : type === "ward"
                  ? e?.ward_id
                  : e?.code
              }
            >
              {type === "province"
                ? e?.province_name
                : type === "district"
                ? e?.district_name
                : type === "ward"
                ? e?.ward_name
                : e?.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default memo(SelectAddress);
