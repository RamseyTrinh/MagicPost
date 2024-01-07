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
import { useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";

import axios from "axios";

import "../../../../Assets/Styles/Gather/Gather.css";

import React from "react";

export default function Gather() {
  const auth = useAuthUser();
  const user = auth()?.data;

  const [rows, setRows] = useState([]);
  const [warehouse, setWarehouse] = useState("");
  const [pkgId, setPkgId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `http://localhost:3005/api/v1/order/packagesIdSendByTransactionPointSend/${user.location}`
      )
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(data.data);
        });
    };
    fetchData();
  }, [user.location]);

  useEffect(() => {
    const fetchWarehouse = () => {
      fetch(
        `http://localhost:3005/api/v1/TransactionPoint/getWarehouse/${user.location}`
      )
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setWarehouse(data.data);
        });
    };
    fetchWarehouse();
  }, [user.location]);

  const match = useMediaQuery("(max-width:800px)");

  type FormValues = {
    packageId: string;
  };

  const { handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const result = await axios.patch(
        "http://localhost:3005/api/v1/order/transportingPackages",
        { packagesId: pkgId }
      );
      console.log(result);
      window.alert("Đã chuyển thành công!");
      reset();
    } catch (error) {
      console.log(error);
    }
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
            ĐIỂM TẬP KẾT
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
                  InputProps={{ readOnly: true }}
                  id="outlined-basic"
                  label="Điểm giao dịch"
                  variant="outlined"
                  value={user.location}
                  required
                ></TextField>
                <TextField
                  fullWidth
                  InputProps={{ readOnly: true }}
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
              <Stack spacing={2} direction="column">
                <TextField
                  fullWidth
                  InputProps={{ readOnly: true }}
                  id="outlined-basic"
                  label="Điểm tập kết"
                  variant="outlined"
                  value={warehouse}
                  required
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
