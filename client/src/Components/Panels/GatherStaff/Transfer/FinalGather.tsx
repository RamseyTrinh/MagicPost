import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

import "../../../../Assets/Styles/Gather/Gather.css";

import React from "react";

export default function Gather() {
  const auth = useAuthUser();
  const user = auth()?.data;

  const [rows, setRows] = useState([]);
  const [pkgId, setPkgId] = useState("");

  const match = useMediaQuery("(max-width:800px)");

  const fetchData = () => {
    fetch(
      `http://localhost:3005/api/v1/order/packagesIdSendByWarehouseSend/${user.location}`
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log(data.data);
        setRows(data.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [user.location]);

  console.log(rows[0]);

  type FormValues = {
    packageID: string;
  };

  const { handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const result = await axios.patch(
        "http://localhost:3005/api/v1/order/transportingPackages",
        { packagesId: pkgId }
      );
      window.alert("Đã chuyển thành công");
      fetchData();
      reset();
      console.log(result);
    } catch (error) {}
  };

  return (
    <form className="background" onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          p: 3,
          backgroundColor: "#faf6ed",
          width: "100%",
          minHeight: "30vh",
        }}
      >
        <Stack>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "45px",
              fontWeight: "bold",
              mb: 5,
              color: "#003e29",
            }}
          >
            CHUYỂN HÀNG ĐẾN ĐIỂM TẬP KẾT ĐÍCH
          </Typography>

          <Stack
            spacing={3}
            direction={`${match ? "column" : "row"}`}
            id="GatherMain"
            sx={{ justifyContent: "center" }}
          >
            <Paper id="paper" style={{ width: "45%" }} elevation={3}>
              <Stack spacing={3} direction="column">
                <TextField
                  fullWidth
                  inputProps={{ readOnly: true }}
                  id="outlined-basic"
                  label="Điểm tập kết"
                  variant="outlined"
                  value={user.location}
                  required
                ></TextField>
                <TextField
                  fullWidth
                  inputProps={{ readOnly: true }}
                  id="outlined-basic"
                  label="Mã nhân viên"
                  variant="outlined"
                  value={user.userId}
                  required
                ></TextField>
                <Autocomplete
                  disablePortal
                  options={rows}
                  fullWidth
                  inputValue={pkgId}
                  onInputChange={(event, newInputValue) => {
                    setPkgId(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Mã bưu gửi" />
                  )}
                />
              </Stack>
            </Paper>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            id="GatherSubmit"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              mt: 7,
              width: "20%",
            }}
            style={{ fontWeight: "bold", background: "#003e29" }}
          >
            XÁC NHẬN
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
