import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SelectAdd from "../../../Funtions/SelectAdd/SelectAdd.jsx";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";

import "../../../../Assets/Styles/CreateAcc/CreateAcc.css";

export default function ManagePoint() {
  type FormValues = {
    name: string;
    location: string;
    address: string;
    area: string;
    pointType: string;
    pointID: string;
  };

  const { register, handleSubmit, setError, formState, reset } =
    useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const result = await axios.post(
        "http://localhost:3005/api/v1/transactionPoint/newPoint",
        data
      );
      window.alert("Đã tạo thành công!");
      reset();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // const errors = error.response.data.errors;

        // if (errors.name) {
        setError("name", {
          type: "manual",
          message: "Tên điểm đã tồn tại",
        });
        // }
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
          height: "650px",
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
          TẠO ĐIỂM
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column">
            <Paper sx={{ height: "510px", padding: 3, background: "#fdfdfd" }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                  id="outlined-basic"
                  label="Tên điểm"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!formState.errors.name}
                  helperText={formState.errors.name?.message}
                  {...register("name")}
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
                {...register("location")}
              />
              <FormControl sx={{ width: "100%", mb: 3 }}>
                <InputLabel>Miền</InputLabel>
                <Select defaultValue="" label="Miền" {...register("area")}>
                  <MenuItem value={"Miền Bắc"}>Miền Bắc</MenuItem>
                  <MenuItem value={"Miền Trung"}>Miền Trung</MenuItem>
                  <MenuItem value={"Miền Nam"}>Miền Nam</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <FormControl sx={{ width: "250px" }}>
                  <InputLabel>Loại điểm</InputLabel>
                  <Select
                    defaultValue=""
                    label="Loại điểm"
                    {...register("pointType")}
                  >
                    <MenuItem value={"transactionPoint"}>
                      Điểm giao dịch
                    </MenuItem>
                    <MenuItem value={"warehouse"}>Điểm tập kết</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="Mã điểm"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                  {...register("pointID")}
                />
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
              sx={{ mt: 2, ml: "auto", mr: "auto" }}
            >
              TẠO
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
