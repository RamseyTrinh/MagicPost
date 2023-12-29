import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";

import "../../../../Assets/Styles/Gather/Gather.css";

export default function Gather() {
  const match = useMediaQuery("(max-width:800px)");

  const auth = useAuthUser();
  const user = auth()?.data;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `http://localhost:3005/api/v1/order/packagesIdSendByTransactionReceive/${user.location}`
      )
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(data.data.packagesWithOrders);
        });
    };
    fetchData();
  }, [user.location]);

  console.log(rows);

  type FormValues = {
    packageID: string;
  };

  const { handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
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
            NGƯỜI NHẬN
          </Typography>

          <Stack
            spacing={3}
            direction={`${match ? "column" : "row"}`}
            id="GatherMain"
          >
            <Paper id="paper" style={{ width: "45%" }} elevation={3}>
              <Stack spacing={3} direction="column">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Điểm giao dịch"
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  value={user.location}
                  required
                ></TextField>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Mã nhân viên"
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  value={user.userId}
                  required
                ></TextField>
                <Autocomplete
                  disablePortal
                  options={rows}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Mã bưu gửi" />
                  )}
                />
              </Stack>
            </Paper>
            {match ? (
              <KeyboardDoubleArrowDownIcon
                sx={{ fontSize: "120px", color: "#003e29" }}
              />
            ) : (
              <KeyboardDoubleArrowRightIcon
                sx={{ fontSize: "120px", color: "#003e29" }}
              />
            )}
            <Paper id="paper" style={{ width: "45%" }} elevation={3}>
              <Stack spacing={3} direction="column">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Người nhận"
                  variant="outlined"
                  required
                ></TextField>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                ></TextField>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Địa chỉ"
                  variant="outlined"
                ></TextField>
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
