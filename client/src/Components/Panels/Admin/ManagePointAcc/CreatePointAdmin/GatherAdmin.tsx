import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import SelectAdd from "../../../../Funtions/SelectAdd/SelectAdd";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../../../../../Assets/Styles/CreateAcc/CreateAcc.css";

export default function GatherAdmin() {
  type FormValues = {
    pointAdminName: string;
    phoneNumber: string;
    address: string;
    specificAdd: string;
    email: string;
    password: string;
    location: string;
  };

  const area = ["Miền Bắc", "Miền Trung", "Miền Nam"];

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { register, handleSubmit, setError, formState, reset } =
    useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const result = await axios.post(
        "http://localhost:3005/api/v1/users/addWarehouseAdmin",
        data
      );
      window.alert("Đã tạo thành công!");
      reset();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError("email", {
          type: "manual",
          message: "Email này không hợp lệ hoặc đã trùng với email khác",
        });
      } else {
        console.error(error);
      }
      console.log(error);
    }
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
          TẠO TÀI KHOẢN TRƯỞNG ĐIỂM TẬP KẾT
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
                  error={!!formState.errors.email}
                  helperText={formState.errors.email?.message}
                  sx={{ mb: 3 }}
                  {...register("email")}
                />
                <TextField
                  id="outlined-basic"
                  label="Mật khẩu"
                  variant="outlined"
                  fullWidth
                  required
                  type={showPassword ? "text" : "password"}
                  sx={{ mb: 3 }}
                  {...register("password")}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>
              <Stack>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Tại điểm tập kết</InputLabel>
                  <Select
                    label="location"
                    displayEmpty
                    sx={{ background: "#fdfdfd" }}
                    {...register("location")}
                  >
                    {area.map((area, index) => (
                      <MenuItem key={index} value={area}>
                        {area}
                      </MenuItem>
                    ))}
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
