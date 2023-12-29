import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import SelectAdd from "../../../Funtions/SelectAdd/SelectAdd";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import "../../../../Assets/Styles/CreateAcc/CreateAcc.css";

export default function CreatePointAdmin() {
  type FormValues = {
    pointAdminName: string;
    phoneNumber: string;
    address: string;
    specificAdd: string;
    email: string;
    pointAssigned: string;
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

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
      <Paper
        sx={{
          height: "700px",
          width: "800px",
          padding: 2,
          backgroundColor: "#faf6ed",
        }}
        id="CreateAccMain"
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#003e29",
            mb: 1,
          }}
        >
          TẠO TÀI KHOẢN TRƯỞNG ĐIỂM
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column">
            <Paper sx={{ height: "520px", padding: 3, background: "#fdfdfd" }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                  id="outlined-basic"
                  label="Họ và tên"
                  variant="outlined"
                  fullWidth
                  required
                  {...register("pointAdminName")}
                />
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  required
                  {...register("phoneNumber")}
                />
              </Stack>
              <SelectAdd refs={{ ...register("address") }} />
              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 3 }}
                {...register("specificAdd")}
              />
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                  {...register("email")}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Tại điểm</InputLabel>
                  <Select
                    defaultValue=""
                    label="Tại điểm"
                    //   {...register("pointType")}
                  >
                    {/* <MenuItem value={"GD"}>Điểm giao dịch</MenuItem>
                    <MenuItem value={"TK"}>Điểm tập kết</MenuItem> */}
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
            <Button
              variant="contained"
              type="submit"
              style={{
                fontWeight: "bold",
                background: "#003e29",
                width: "150px",
              }}
              sx={{ mt: 4, ml: "auto", mr: "auto" }}
            >
              TẠO
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
