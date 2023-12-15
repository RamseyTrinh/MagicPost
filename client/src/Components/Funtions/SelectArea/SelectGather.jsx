import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function SelectGather({ refs }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Điểm tập kết</InputLabel>
      <Select
        defaultValue=""
        id="demo-simple-select"
        label="Điểm tập kết"
        {...refs}
      >
        <MenuItem value={"TK01MB"}>Điểm tập kết - Miền Bắc</MenuItem>
        <MenuItem value={"TK02MT"}>Điểm tập kết - Miền Trung</MenuItem>
        <MenuItem value={"TK03MN"}>Điểm tập kết - Miền Nam</MenuItem>
      </Select>
    </FormControl>
  );
}
