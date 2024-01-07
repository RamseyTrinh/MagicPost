import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SelectAdd from "../../Funtions/SelectAdd/SelectAdd.jsx";
import FormHelperText from "@mui/material/FormHelperText";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../../../Assets/Styles/CreateAcc/CreateAcc.css";

export default function CreateAccount() {
  const auth = useAuthUser();
  const user = auth()?.data;

  type FormValues = {
    name: string;
    phoneNumber: string;
    address: string;
    specificAdd: string;
    email: string;
    password: string;
    location: string;
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
    setError,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const result = await axios.post(
        `http://localhost:3005/api/v1/users/addNewUserBy${
          user.role.at(0).toUpperCase() + user.role.slice(1)
        }`,
        data
      );
      console.log(result);
      window.alert("Đã tạo thành công");
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
          height: "750px",
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
          TẠO TÀI KHOẢN
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column">
            <Paper sx={{ height: "590px", padding: 3, background: "#fdfdfd" }}>
              <FormHelperText sx={{ textAlign: "right", color: "red" }}>
                {errors?.phoneNumber && errors.phoneNumber.message}
              </FormHelperText>

              <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
                <TextField
                  id="outlined-basic"
                  label="Họ và tên"
                  variant="outlined"
                  fullWidth
                  required
                  {...register("name")}
                />
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  required
                  {...register("phoneNumber", {
                    minLength: {
                      value: 10,
                      message: "Số điện thoại phải có 10 chữ số",
                    },
                    maxLength: {
                      value: 10,
                      message: "Số điện thoại phải có 10 chữ số",
                    },
                  })}
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
              <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
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
              <TextField
                fullWidth
                id="outlined-basic"
                label="Điểm giao dịch"
                InputProps={{ readOnly: true }}
                variant="outlined"
                value={user.location}
                required
                {...register("location")}
              ></TextField>
            </Paper>
            <Button
              variant="contained"
              type="submit"
              style={{
                fontWeight: "bold",
                background: "#003e29",
                width: "150px",
              }}
              sx={{ mt: 3, ml: "auto", mr: "auto" }}
            >
              TẠO
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
